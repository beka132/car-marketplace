import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  type: 'access' | 'refresh' | 'reset';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'] || 'changeme-access',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload?.sub) throw new UnauthorizedException();
    // Only allow access tokens through Passport guard
    if (payload.type !== 'access') throw new UnauthorizedException('Invalid token type');
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
