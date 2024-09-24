import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Person } from '../person/person.entity';

@Entity()
@ObjectType()
export class Animal {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  dateOfBirth: Date;

  @Column()
  @Field()
  species: string;

  @Column()
  @Field()
  breed: string;

  @Column()
  @Field()
  color: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  weight: number;

  @ManyToOne(() => Person, person => person.animals)
  @Field(() => Person)
  owner: Person;
}