# Handball93 - Application Sportive Moderne

Une application web d'actualité sportive locale développée avec **AdonisJS v6**, **Vue 3**, **Inertia.js** et **Tailwind CSS**.

## 🚀 Features

- ✅ **Architecture moderne**: AdonisJS 6 + Vue 3 Composition API + Inertia.js
- ✅ **Design épuré**: Dark mode, glassmorphism, animations fluides
- ✅ **Gestion d'articles**: Création, édition, catégorisation
- ✅ **Filtrage dynamique**: Filtrez par catégorie sans rechargement
- ✅ **SSR optimisé**: Rendu côté serveur pour les performances
- ✅ **Responsive**: Mobile-first, fonctionne sur tous les écrans
- ✅ **SEO-friendly**: Métadonnées appropriées, slugs uniques

## 📋 Prérequis

- **Node.js** >= 20
- **PostgreSQL** >= 12 (ou Supabase)
- **npm** ou **yarn**

## 🔧 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/youss-org/handball93.git
cd youss
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créez un fichier `.env` à la racine :

```bash
cp .env.example .env
```

Éditez `.env` avec vos paramètres PostgreSQL :

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=handball93
```

### 4. Exécuter les migrations

```bash
node ace migrate
```

### 5. Remplir la base avec des données de test

```bash
node ace seed:run
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3333](http://localhost:3333) dans votre navigateur.

## 📁 Structure du Projet

```
youss/
├── app/
│   ├── controllers/
│   │   └── posts_controller.ts       # Logique pour articles
│   ├── models/
│   │   ├── post.ts                   # Modèle Article
│   │   ├── category.ts               # Modèle Catégorie
│   │   └── team.ts                   # Modèle Équipe
│   └── middleware/
├── database/
│   ├── migrations/                   # Schéma PostgreSQL
│   └── seeders/                      # Données initiales
├── inertia/
│   ├── pages/
│   │   ├── home.vue                  # Accueil
│   │   ├── post/show.vue             # Détail article
│   │   └── category/index.vue        # Catégorie
│   ├── components/
│   │   ├── navbar.vue                # Barre de navigation
│   │   ├── footer.vue                # Pied de page
│   │   ├── article-card.vue          # Carte article
│   │   └── app.vue                   # Layout principal
│   └── css/app.css                   # Styles Tailwind
├── start/
│   ├── routes.ts                     # Routes HTTP
│   └── kernel.ts                     # Middleware
└── config/
    ├── app.ts                        # Config app
    ├── database.ts                   # Config DB
    └── inertia.ts                    # Config Inertia
```

## 🎨 Design & Styling

### Palette de Couleurs

- **Primaire**: Orange (`from-orange-500 to-red-500`)
- **Fond**: Slate-900 (dark mode)
- **Texte**: Blanc/Gris clair
- **Accent**: Glassmorphism avec `border-white/10`

### Composants Clés

| Composant | Fichier | Usage |
|-----------|---------|-------|
| Navbar | `navbar.vue` | Navigation sticky avec menu mobile |
| Hero Section | `home.vue` | Article principal en vedette |
| Bento Grid | `home.vue` | Articles "À ne pas manquer" |
| Article Card | `article-card.vue` | Carte article réutilisable |
| Category Filter | `home.vue` | Pills pour filtrer par catégorie |

## 🗄️ Base de Données

### Schéma

#### Categories
```sql
id (PK) | name | slug | color | description | timestamps
```

#### Posts
```sql
id (PK) | title | slug | excerpt | content | cover_image_url | 
published_at | category_id (FK) | author_name | views_count | timestamps
```

#### Teams (optionnel)
```sql
id (PK) | name | slug | logo_url | division | description | timestamps
```

## 🚀 Déploiement

### Build pour production

```bash
npm run build
```

### Démarrer en production

```bash
npm start
```

### Sur Vercel / Railway / Heroku

1. Pushez le code sur GitHub
2. Connectez votre repo au service
3. Définissez les variables d'environnement
4. Le déploiement se fera automatiquement

## 📝 Commandes Principales

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lancer le serveur avec HMR |
| `npm run build` | Compiler TypeScript |
| `npm start` | Démarrer en production |
| `npm test` | Lancer les tests |
| `npm run lint` | Vérifier le code |
| `npm run format` | Auto-formater avec Prettier |
| `node ace migrate` | Exécuter les migrations |
| `node ace seed:run` | Remplir avec données test |

## 🔐 Sécurité

- CSRF protection activée par défaut (Shield middleware)
- Sessions sécurisées avec `httpOnly`, `secure`, `sameSite=lax`
- Passwords hashés avec scrypt (voir `config/hash.ts`)
- Variables d'environnement sensibles non commitées

## 🤝 Contribution

Les contributions sont bienvenues ! Créez une branche, faites vos changements, et ouvrez une Pull Request.

## 📄 Licence

UNLICENSED - Propriété de l'organisation YOUSS

## 📞 Support

Pour des questions ou problèmes, ouvrez une issue sur GitHub ou contactez l'équipe de développement.

---

**Handball93** - Suivez l'actualité du handball en Seine-Saint-Denis 🏐
