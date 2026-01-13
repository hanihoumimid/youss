# 🏐 Démarrage Rapide - Handball93

Bienvenue dans **Handball93**, une application web sportive moderne construite avec AdonisJS 6 et Vue 3.

## 🚀 Lancement en 5 minutes

### 1️⃣ Prérequis

```bash
# Vérifie que tu as installé:
node --version    # >= 20
npm --version     # >= 9
psql --version    # PostgreSQL >= 12 (optionnel, utilise une DB en ligne)
```

### 2️⃣ Installation

```bash
# Clone le projet (si git)
git clone <url> && cd youss

# Ou utilise les fichiers existants
cd youss

# Installe les dépendances
npm install
```

### 3️⃣ Configuration Database

Crée un fichier `.env` :

```bash
# Option 1: Local PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=handball93

# Option 2: Supabase (https://supabase.com)
DB_HOST=xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=xxxxx
DB_DATABASE=postgres
```

Ou copie depuis l'exemple :
```bash
cp .env.example .env
# Édite avec tes paramètres
```

### 4️⃣ Initialisation Database

```bash
# Crée les tables
node ace migrate

# Remplit avec données de test
node ace seed:run
```

### 5️⃣ Lancer l'application

```bash
npm run dev
```

Visite **http://localhost:3333** 🎉

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [HANDBALL93.md](./HANDBALL93.md) | Overview du projet, features, installation complète |
| [IMPLEMENTATION.md](./IMPLEMENTATION.md) | Architecture détaillée, structure des fichiers, patterns |
| [CODING_CONVENTIONS.md](./CODING_CONVENTIONS.md) | Standards TypeScript, Vue 3, Tailwind pour ce projet |
| [CHECKLIST.md](./CHECKLIST.md) | Checklist complète de ce qui a été implémenté |
| [.github/copilot-instructions.md](./.github/copilot-instructions.md) | Instructions pour les agents IA (Copilot, Claude) |

---

## 🎯 Commandes Principales

```bash
npm run dev          # 🚀 Serveur de développement avec HMR
npm run build        # 🔨 Build production
npm start            # ▶️ Démarrer le serveur
npm run lint         # 🔍 Vérifier le code
npm run format       # ✨ Auto-formater le code
npm run typecheck    # ✅ Vérifier les types TypeScript

node ace migrate     # 📊 Exécuter les migrations
node ace seed:run    # 🌱 Remplir la base avec données
node ace make:model  # 📝 Générer un nouveau model
node ace make:controller # 🎮 Générer un nouveau controller
```

---

## 🏗️ Structure Rapide

```
youss/
├── app/
│   ├── controllers/posts_controller.ts    # Logique métier
│   ├── models/                            # Post, Category, Team
│   └── middleware/                        # Auth, etc.
├── database/
│   ├── migrations/                        # Schema SQL
│   └── seeders/                           # Données test
├── inertia/
│   ├── pages/                             # Home, Article, Category
│   ├── components/                        # Navbar, Footer, ArticleCard
│   ├── layouts/app.vue                    # Layout principal
│   └── css/app.css                        # Tailwind CSS
├── start/
│   ├── routes.ts                          # Routes HTTP
│   └── kernel.ts                          # Middleware
└── config/                                # Configuration
```

---

## 🎨 Design

### Couleurs
- **Fond**: Dark slate-900
- **Primaire**: Orange → Red gradient
- **Texte**: Blanc/Gris clair
- **Effets**: Glassmorphism avec borders transparents

### Layout
- ✅ Mobile-first responsive
- ✅ Bento grid asymétrique
- ✅ Animations fluides
- ✅ Dark mode par défaut

---

## 📖 Pages Principales

| Page | URL | Description |
|------|-----|-------------|
| **Accueil** | `/` | Hero + Bento grid + Filtre catégories + Articles |
| **Article** | `/posts/:slug` | Contenu complet + Sidebar articles similaires |
| **Catégorie** | `/category/:slug` | Articles filtrés par catégorie |

---

## 🔑 Fonctionnalités

- ✅ Articles avec catégories
- ✅ Filtrage dynamique par catégorie (sans reload)
- ✅ Design moderne et responsive
- ✅ Navigation fluide avec Inertia.js
- ✅ Rendu côté serveur (SSR) pour performances
- ✅ Images avec Unsplash (à remplacer par S3/Supabase)
- ✅ Newsletter CTA
- ✅ Réseaux sociaux dans footer

---

## 🐛 Troubleshooting

### "Module not found" errors
```bash
npm install
npm run build
```

### Database connection error
```bash
# Vérifie la configuration .env
# Assure-toi que PostgreSQL est lancé
psql -U postgres -c "SELECT 1"
```

### Port 3333 déjà utilisé
```bash
# Change le port dans .env
HTTP_PORT=3334
```

### HMR ne fonctionne pas
```bash
# Redémarre le serveur
npm run dev
```

---

## 🚀 Prochaines Étapes

1. **Éditer les articles**: Ajoute/modifie les posts via seeders ou un CMS
2. **Personnaliser les couleurs**: Change les Tailwind classes
3. **Ajouter l'authentification**: Utilise `@adonisjs/auth`
4. **Images en production**: Connecte S3 ou Supabase Storage
5. **Newsletter**: Intègre Mailchimp ou Sendgrid

---

## 📞 Besoin d'aide ?

1. 📖 Lis les guides dans le dossier racine
2. 💬 Consulte la doc d'[AdonisJS](https://docs.adonisjs.com)
3. 💬 Consulte la doc de [Vue 3](https://vuejs.org)
4. 💬 Consulte la doc de [Inertia.js](https://inertiajs.com)

---

**Bon développement ! 🏐✨**

Créé avec ❤️ par l'équipe YOUSS
