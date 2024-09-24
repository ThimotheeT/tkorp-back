import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { PersonResolver } from './person.resolver'; // Nouveau fichier à créer

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PersonService, PersonResolver], // Ajout du PersonResolver
  controllers: [PersonController],
})
export class PersonModule {}