import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from './person.entity';

@Resolver(of => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(returns => [Person])
  async persons() {
    return this.personService.findAll();
  }

  @Query(returns => Person)
  async person(@Args('id') id: number) {
    return this.personService.findOne(id);
  }

  @Mutation(returns => Person)
  async createPerson(
    @Args('lastName') lastName: string,
    @Args('firstName') firstName: string,
    @Args('email') email: string,
    @Args('phoneNumber') phoneNumber: string
  ) {
    return this.personService.create({ lastName, firstName, email, phoneNumber });
  }

  // Ajoutez d'autres mutations selon vos besoins (update, delete, etc.)
}