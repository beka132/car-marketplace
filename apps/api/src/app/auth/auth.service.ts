import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  type: 'access' | 'refresh' | 'reset';
}

@Injectable()
export class AuthService {
  private readonly accessSecret  = process.env['JWT_SECRET']         || 'changeme-access';
  private readonly refreshSecret = process.env['JWT_REFRESH_SECRET'] || 'changeme-refresh';
  private readonly resetSecret   = process.env['JWT_RESET_SECRET']   || 'changeme-reset';

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
      if (existing) throw new ConflictException('Email already in use');

      const hashed = await bcrypt.hash(dto.password, 10);
      const user = await this.prisma.user.create({
        data: { email: dto.email, name: dto.name, password: hashed, phone: dto.phone },
      });

      return this.buildTokenResponse(user.id, user.email, user.role);
    } catch (err) {
      if (err instanceof ConflictException) throw err;
      throw new InternalServerErrorException('Registration failed. Please try again.');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.buildTokenResponse(user.id, user.email, user.role);
  }

  async refresh(refreshToken: string) {
    let payload: JwtPayload;
    try {
      payload = this.jwt.verify<JwtPayload>(refreshToken, { secret: this.refreshSecret });
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    if (payload.type !== 'refresh') throw new UnauthorizedException('Invalid token type');

    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) throw new UnauthorizedException('User no longer exists');

    return {
      access_token: this.signAccess(user.id, user.email, user.role),
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('No account found with that email');

    // Sign reset token with user's current password hash so it self-invalidates after use
    const resetToken = this.jwt.sign(
      { sub: user.id, email: user.email, type: 'reset' },
      { secret: this.resetSecret + user.password, expiresIn: '1h' },
    );

    // In production: send resetToken via email. Here we return it directly.
    return { reset_token: resetToken, message: 'Use reset_token to set a new password via POST /auth/reset-password' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    let payload: JwtPayload;

    // First decode without verification to get the user id
    const decoded = this.jwt.decode(dto.reset_token) as JwtPayload | null;
    if (!decoded?.sub) throw new UnauthorizedException('Invalid reset token');

    const user = await this.prisma.user.findUnique({ where: { id: decoded.sub } });
    if (!user) throw new UnauthorizedException('Invalid reset token');

    try {
      payload = this.jwt.verify<JwtPayload>(dto.reset_token, {
        secret: this.resetSecret + user.password,
      });
    } catch {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    if (payload.type !== 'reset') throw new UnauthorizedException('Invalid token type');

    const hashed = await bcrypt.hash(dto.new_password, 10);
    await this.prisma.user.update({ where: { id: user.id }, data: { password: hashed } });

    return { message: 'Password updated successfully. Please log in again.' };
  }

  private buildTokenResponse(userId: number, email: string, role: string) {
    return {
      access_token:  this.signAccess(userId, email, role),
      refresh_token: this.signRefresh(userId, email, role),
      user: { id: userId, email, role },
    };
  }

  private signAccess(userId: number, email: string, role: string): string {
    return this.jwt.sign(
      { sub: userId, email, role, type: 'access' },
      { secret: this.accessSecret, expiresIn: '15m' },
    );
  }

  private signRefresh(userId: number, email: string, role: string): string {
    return this.jwt.sign(
      { sub: userId, email, role, type: 'refresh' },
      { secret: this.refreshSecret, expiresIn: '7d' },
    );
  }
}

