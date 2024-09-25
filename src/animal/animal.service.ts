import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './animal.entity';
import { Person } from '../person/person.entity';
import { SpeciesCount } from './species-count.dto';

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

  async findOldestAnimal(): Promise<Animal> {
    return this.animalRepository.createQueryBuilder('animal')
      .orderBy('animal.dateOfBirth', 'ASC')
      .leftJoinAndSelect('animal.owner', 'owner')
      .getOne();
  }

  async countAnimalsBySpecies(): Promise<SpeciesCount[]> {
    return this.animalRepository.createQueryBuilder('animal')
      .select('animal.species', 'species')
      .addSelect('COUNT(*)', 'count')
      .groupBy('animal.species')
      .orderBy('count', 'DESC')
      .getRawMany();
  }

  async findPersonWithMostAnimals(): Promise<{ person: Person; animalCount: number }> {
    const result = await this.animalRepository.createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'owner')
      .select('owner.id', 'ownerId')
      .addSelect('COUNT(*)', 'animalCount')
      .groupBy('owner.id')
      .orderBy('animalCount', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new Error('No animals found');
    }

    const person = await this.personRepository.findOne({
      where: { id: result.ownerId },
      relations: ['animals'],
    });

    if (!person) {
      throw new Error('Person not found');
    }

    return {
      person,
      animalCount: parseInt(result.animalCount),
    };
  }

  async findPersonWithMostCats(): Promise<{ person: Person; catCount: number }> {
    const result = await this.animalRepository.createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'owner')
      .where('animal.species = :species', { species: 'cat' })
      .select('owner.id', 'ownerId')
      .addSelect('COUNT(*)', 'catCount')
      .groupBy('owner.id')
      .orderBy('catCount', 'DESC')
      .limit(1)
      .getRawOne();
  
    if (!result) {
      throw new Error('No cats found');
    }
  
    const person = await this.personRepository.findOne({
      where: { id: result.ownerId },
      relations: ['animals'],
    });
  
    if (!person) {
      throw new Error('Person not found');
    }
  
    return {
      person,
      catCount: parseInt(result.catCount),
    };
  }

  async findHeaviestAnimalWithOwner(): Promise<{ animal: Animal; owner: Person }> {
    const result = await this.animalRepository.createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'owner')
      .orderBy('animal.weight', 'DESC')
      .limit(1)
      .getOne();
  
    if (!result) {
      throw new Error('No animals found');
    }
  
    return {
      animal: result,
      owner: result.owner,
    };
  }

  async findOwnerWithHeaviestAnimals(): Promise<{ owner: Person; totalWeight: number; animals: Animal[] }> {
    const result = await this.personRepository.createQueryBuilder('person')
      .leftJoinAndSelect('person.animals', 'animal')
      .select('person.id', 'ownerId')
      .addSelect('SUM(animal.weight)', 'totalWeight')
      .groupBy('person.id')
      .orderBy('totalWeight', 'DESC')
      .limit(1)
      .getRawOne();
  
    if (!result) {
      throw new Error('No animals found');
    }
  
    const owner = await this.personRepository.findOne({
      where: { id: result.ownerId },
      relations: ['animals'],
    });
  
    if (!owner) {
      throw new Error('Owner not found');
    }
  
    return {
      owner,
      totalWeight: parseFloat(result.totalWeight),
      animals: owner.animals,
    };
  }
}