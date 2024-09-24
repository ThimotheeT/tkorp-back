import { Controller, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from './person.entity';

@Controller('persons')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  findAll(): Promise<Person[]> {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Person> {
    return this.personService.findOne(+id);
  }
}