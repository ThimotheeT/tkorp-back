import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  findOne(id: number): Promise<Person> {
    return this.personRepository.findOne({ where: { id } });
  }

  create(personData: Partial<Person>): Promise<Person> {
    const newPerson = this.personRepository.create(personData);
    return this.personRepository.save(newPerson);
  }
  
  async update(id: number, personData: Partial<Person>): Promise<Person> {
    await this.personRepository.update(id, personData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.personRepository.delete(id);
  }
}