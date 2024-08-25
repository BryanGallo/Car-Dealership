import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createdAt: new Date().getTime(),
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const newBrand: Brand = {
      id: uuid(),
      ...createBrandDto,
      createdAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
    return {
      msg: 'Brand creado con exito',
      newCar: newBrand,
    };
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id '${id}' not found`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id);
    if (updateBrandDto.id && updateBrandDto.id !== id)
      throw new NotFoundException(`Brand id is not valid inside body`);

    this.brands = this.brands.map((brand) => {
      if (brand.id === id) {
        brandDb = {
          ...brandDb,
          ...updateBrandDto,
          id,
        };
        return brandDb;
      }
      return brand;
    });

    return brandDb;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
