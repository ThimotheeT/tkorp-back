import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { Animal } from './animal.entity';

@Resolver(of => Animal)
export class AnimalResolver {
  constructor(private animalService: AnimalService) {}

  @Query(returns => [Animal])
  async animals() {
    return this.animalService.findAll();
  }

  @Query(returns => Animal)
  async animal(@Args('id') id: number) {
    return this.animalService.findOne(id);
  }

  @Mutation(returns => Animal)
async createAnimal(
  @Args('name') name: string,
  @Args('dateOfBirth') dateOfBirth: Date,
  @Args('species') species: string,
  @Args('breed') breed: string,
  @Args('color') color: string,
  @Args('weight') weight: number,
  @Args('ownerId') ownerId: number
) {
  return this.animalService.create({ name, dateOfBirth, species, breed, color, weight }, ownerId);
}

  // Ajoutez d'autres mutations selon vos besoins (update, delete, etc.)
}