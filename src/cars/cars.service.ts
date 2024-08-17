import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 3,
      brand: 'Chery',
      model: 'Tiggo 4 pro',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: number) {
    console.log(id);
    return this.cars.find((car) => car.id === id);
  }
}
