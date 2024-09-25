import { Resolver, Query, Args, Mutation, ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { AnimalService } from './animal.service';
import { Animal } from './animal.entity';
import { SpeciesCount } from './species-count.dto';
import { Person } from '../person/person.entity';

@ObjectType()
class PersonWithMostAnimals {
  @Field(() => Person)
  person: Person;

  @Field(() => Int)
  animalCount: number;
}

@ObjectType()
class PersonWithMostCats {
  @Field(() => Person)
  person: Person;

  @Field(() => Int)
  catCount: number;
}

@ObjectType()
class HeaviestAnimalWithOwner {
  @Field(() => Animal)
  animal: Animal;

  @Field(() => Person)
  owner: Person;
}

@ObjectType()
class OwnerWithHeaviestAnimals {
  @Field(() => Person)
  owner: Person;

  @Field(() => Float)
  totalWeight: number;

  @Field(() => [Animal])
  animals: Animal[];
}

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

  @Query(() => Animal, { name: 'oldestAnimal' })
  async getOldestAnimal(): Promise<Animal> {
    return this.animalService.findOldestAnimal();
  }

  @Query(() => [SpeciesCount])
  async animalsCountBySpecies(): Promise<SpeciesCount[]> {
    return this.animalService.countAnimalsBySpecies();
  }

  @Query(() => PersonWithMostAnimals)
  async personWithMostAnimals(): Promise<PersonWithMostAnimals> {
    return this.animalService.findPersonWithMostAnimals();
  }

  @Query(() => PersonWithMostCats)
  async personWithMostCats(): Promise<PersonWithMostCats> {
    return this.animalService.findPersonWithMostCats();
  }

  @Query(() => HeaviestAnimalWithOwner)
  async heaviestAnimalWithOwner(): Promise<HeaviestAnimalWithOwner> {
    return this.animalService.findHeaviestAnimalWithOwner();
  }

  @Query(() => OwnerWithHeaviestAnimals)
  async ownerWithHeaviestAnimals(): Promise<OwnerWithHeaviestAnimals> {
    return this.animalService.findOwnerWithHeaviestAnimals();
  }
}