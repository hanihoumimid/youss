import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Post from '#models/post'
import Category from '#models/category'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const categories = await Category.all()

    const categoryMap: Record<string, number> = {}
    categories.forEach((cat) => {
      categoryMap[cat.slug] = cat.id
    })

    const posts = [
      {
        title: 'Aulnay-Bourget et Gagny en tête de la R1',
        slug: 'aulnay-bourget-gagny-tete-r1',
        excerpt: 'Les deux équipes dominent le classement de la division R1 après les derniers matchs',
        content:
          'Aulnay-Bourget confirme sa domination avec une victoire spectaculaire contre Gagny. Les deux équipes montrent un niveau de jeu impressionnant avec une défense agressive et des attaques incisives. La saison promet d\'être compétitive avec plusieurs prétendants au titre.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 2 }),
        categoryId: categoryMap['r1'],
        authorName: 'Jean Dupont',
        viewsCount: 1250,
      },
      {
        title: 'Rosny réalise l\'exploit face à Mantes-la-Jolie',
        slug: 'rosny-exploit-mantes',
        excerpt: 'Une victoire inattendue qui relance les espoirs de Rosny en N3',
        content:
          'Dans un match palpitant, Rosny a su imposer son jeu face à Mantes-la-Jolie. Les jeunes talents de Rosny ont montré une grande maturité tactique et une cohésion impressionnante. Cette victoire pourrait marquer un tournant décisif de la saison.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 4 }),
        categoryId: categoryMap['n3'],
        authorName: 'Marie Laurent',
        viewsCount: 890,
      },
      {
        title: 'Le 93 sur tous les fronts: zoom sur les derbys de la semaine',
        slug: 'le-93-tous-les-fronts',
        excerpt: 'Cette semaine, le département accueille quatre matchs importants entre clubs locaux',
        content:
          'La Seine-Saint-Denis vibre au rythme du handball avec une semaine exceptionnelle de rencontres. Les derbys locaux sont des événements majeurs qui rassemblent les supporters et montrent la richesse du handball régional. À ne pas manquer !',
        coverImageUrl:
          'https://images.unsplash.com/photo-1516450360452-9312f5e0908d?w=1000&q=80',
        publishedAt: DateTime.now(),
        categoryId: categoryMap['actualite'],
        authorName: 'Pierre Martin',
        viewsCount: 2100,
      },
      {
        title: 'Classement R1: trois équipes en lice pour le titre',
        slug: 'classement-r1-trois-equipes',
        excerpt: 'Le suspense est total en haut du classement avec seulement deux points d\'écart',
        content:
          'À mi-saison, le classement de R1 est très serré. Trois équipes se disputent la première place avec des prestations régulièrement convaincantes. L\'intensité du jeu s\'accroît avec chaque journée, promettant un épilogue dramatique.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 1 }),
        categoryId: categoryMap['classements'],
        authorName: 'Admin',
        viewsCount: 650,
      },
      {
        title: 'Interview: les secrets de la domination de Gagny',
        slug: 'interview-secrets-gagny',
        excerpt: 'Le coach de Gagny nous révèle les clés de leur succès remarquable cette saison',
        content:
          'En exclusivité, l\'entraîneur principal de Gagny parle de sa philosophie d\'entraînement et des éléments clés qui font la force de son équipe. Il insiste sur l\'importance de la cohésion du groupe et de la constance dans les efforts.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1493223335237-b4e6e346b21f?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 3 }),
        categoryId: categoryMap['equipes'],
        authorName: 'Sophie Bernard',
        viewsCount: 1450,
      },
      {
        title: 'Rémi Delaporte: l\'émergence d\'un talent local',
        slug: 'remi-delaporte-talent-local',
        excerpt: 'Le jeune ailier de Rosny fait sensation avec ses performances impressionnantes',
        content:
          'Rémi Delaporte impressionne depuis le début de la saison avec un jeu dynamique et une vitesse d\'exécution remarquable. À seulement 22 ans, il figure déjà parmi les meilleurs buteurs de sa catégorie. Un talent à suivre !',
        coverImageUrl:
          'https://images.unsplash.com/photo-1434504494175-36a5f00ce172?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 5 }),
        categoryId: categoryMap['joueurs'],
        authorName: 'Luc Rousseau',
        viewsCount: 1120,
      },
      {
        title: 'Calendrier complet de la phase retour en R2',
        slug: 'calendrier-retour-r2',
        excerpt: 'Découvrez tous les matchs de la deuxième moitié de saison en R2',
        content:
          'La phase retour débute dans deux semaines avec un calendrier chargé. Chaque équipe devra confirmer ses performances des matchs aller. Les rencontres se succèderont à un rythme soutenu, donnant peu de répit aux joueurs.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 6 }),
        categoryId: categoryMap['r2'],
        authorName: 'Marc Petit',
        viewsCount: 420,
      },
      {
        title: 'Les trois matchs à ne pas manquer ce week-end',
        slug: 'trois-matchs-weekend',
        excerpt: 'Le handball local atteint son paroxysme avec des rencontres décisives',
        content:
          'Ce week-end s\'annonce électrisant avec trois matchs majeurs qui pourraient bouleverser les classements. Les équipes joueront avec l\'urgence et l\'envie de marquer des points importants pour leurs ambitions respectives.',
        coverImageUrl:
          'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=1000&q=80',
        publishedAt: DateTime.now().minus({ days: 7 }),
        categoryId: categoryMap['matchs'],
        authorName: 'Admin',
        viewsCount: 980,
      },
    ]

    await Post.createMany(posts)
  }
}
