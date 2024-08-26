import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Camry',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Chery',
      model: 'Tiggo 4 pro',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    console.log(id);
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    // this.cars= [...this.cars, newCar]; // podemos usar la inmutabilidad o funciones de los arreglos
    this.cars.push(newCar);
    return {
      msg: 'Car creado con exito',
      newCar: newCar,
    };
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id) {
      throw new NotFoundException(`Car id is not valid inside body`);
    }

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = { ...carDb, ...updateCarDto, id };
        return carDb;
      }
      return car;
    });
    return carDb;
  }

  deleteCar(id: string) {
    const car = this.findOneById(id);
    if (!car) {
      return new NotFoundException(`Car with id '${id}' not found`);
    }
    this.cars = this.cars.filter((car) => car.id !== id);
    return this.cars;
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
    return this.cars;
  }
}
