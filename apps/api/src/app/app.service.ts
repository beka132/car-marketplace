import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string; version: string } {
    return { 
      message: 'Car Marketplace API - Running',
      version: '1.0.0'
    };
  }

  getListings() {
    // TODO: Replace with database query
    return [
      {
        id: 1,
        title: '2022 Honda Civic',
        price: 18000,
        year: 2022,
        make: 'Honda',
        model: 'Civic',
        mileage: 25000,
        condition: 'excellent',
      },
      {
        id: 2,
        title: '2020 Toyota Camry',
        price: 22000,
        year: 2020,
        make: 'Toyota',
        model: 'Camry',
        mileage: 35000,
        condition: 'good',
      },
    ];
  }

  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
