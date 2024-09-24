import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { Person } from '../person/person.entity';

@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Animal[]> {
    return this.animalRepository.find({ relations: ['owner'] });
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

  async create(animalData: Omit<Partial<Animal>, 'owner'>, ownerId: number): Promise<Animal> {
    const owner = await this.personRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
      throw new Error('Owner not found');
    }
    const newAnimal = this.animalRepository.create({ ...animalData, owner });
    return this.animalRepository.save(newAnimal);
  }

  async update(id: number, animalData: Partial<Animal>): Promise<Animal> {
    await this.animalRepository.update(id, animalData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.animalRepository.delete(id);
  }
}