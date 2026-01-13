import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/category'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      {
        name: 'Actualité',
        slug: 'actualite',
        color: 'blue-500',
        description: 'Les dernières nouvelles du handball',
      },
      {
        name: 'Classements',
        slug: 'classements',
        color: 'orange-500',
        description: 'Classements des différentes divisions',
      },
      {
        name: 'Matchs',
        slug: 'matchs',
        color: 'red-500',
        description: 'Résultats et calendrier des matchs',
      },
      {
        name: 'R1',
        slug: 'r1',
        color: 'purple-500',
        description: 'Actualités de la division R1',
      },
      {
        name: 'R2',
        slug: 'r2',
        color: 'pink-500',
        description: 'Actualités de la division R2',
      },
      {
        name: 'N3',
        slug: 'n3',
        color: 'green-500',
        description: 'Actualités de la division N3',
      },
      {
        name: 'Équipes',
        slug: 'equipes',
        color: 'indigo-500',
        description: 'Informations sur les équipes',
      },
      {
        name: 'Joueurs',
        slug: 'joueurs',
        color: 'cyan-500',
        description: 'Actualités des joueurs',
      },
    ])
  }
}
