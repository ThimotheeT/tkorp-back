import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  findAll(): Promise<Animal[]> {
    return this.animalRepository.find();
  }

  findOne(id: number): Promise<Animal> {
    return this.animalRepository.findOne({ 
      where: { id },
      relations: ['owner']
    });
  }

  findByPerson(personId: number): Promise<Animal[]> {
    return this.animalRepository.find({
      where: { owner: { id: personId } },
      relations: ['owner'],
    });
  }
}