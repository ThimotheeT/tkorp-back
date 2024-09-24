import { Controller, Get, Param } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { Animal } from './animal.entity';

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  findAll(): Promise<Animal[]> {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Animal> {
    return this.animalService.findOne(+id);
  }

  @Get('person/:personId')
  findByPerson(@Param('personId') personId: string): Promise<Animal[]> {
    return this.animalService.findByPerson(+personId);
  }
  
}