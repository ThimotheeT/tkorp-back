import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './animal.entity';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { AnimalResolver } from './animal.resolver';
import { Person } from '../person/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Person])],
  providers: [AnimalService, AnimalResolver],
  controllers: [AnimalController],
})
export class AnimalModule {}