import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SpeciesCount {
  @Field()
  species: string;

  @Field(() => Int)
  count: number;
}