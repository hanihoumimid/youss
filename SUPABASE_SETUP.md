# 🚀 Configuration Supabase pour Handball93

Handball93 supporte **Supabase** comme base de données. Voici comment configurer votre connexion.

## 📋 Prérequis

- Compte Supabase gratuit (https://supabase.com)
- Projet Supabase créé

## 🔧 Configuration Étape par Étape

### 1️⃣ Obtenir vos credentials Supabase

**Depuis le Dashboard Supabase:**
1. Ouvre ton projet Supabase
2. Va à **Settings** (⚙️) → **Database**
3. Tu verras plusieurs options:
   - **Project URL** (ex: https://xxxxx.supabase.co)
   - **Connection String** (PostgreSQL URL)
   - **Database Password**

### 2️⃣ Deux Méthodes de Configuration

#### Méthode 1️⃣: Connection String (RECOMMANDÉE ⭐)

C'est la plus simple et recommandée pour Supabase.

**Dans Supabase Dashboard → Settings → Database:**
- Copie la **Connection String** (Choose "Session pooler" or "Transaction pooler")
- Format: `postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres`

**Dans ton `.env` local:**
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
```

**C'est tout ! Pas besoin de configurer DB_HOST, DB_PORT, etc.**

Puis exécute:
```bash
node ace migration:run
```

---

#### Méthode 2️⃣: Credentials Individuels

Si tu préfères les paramètres séparés:

**Dans ton `.env` local:**
```env
DB_HOST=db.xxxxx.supabase.co
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=YOUR_DATABASE_PASSWORD
DB_DATABASE=postgres
```

Remplace:
- `xxxxx` avec ton project ID Supabase
- `YOUR_DATABASE_PASSWORD` avec le password de ta base de données

Puis exécute:
```bash
node ace migration:run
```

---

## ✅ Vérifier la Connexion

```bash
# Si la connexion est OK, tu verras:
$ node ace migration:run

[INFO] Running migrations
[INFO] Done

# Puis remplis avec les données de test:
$ node ace seed:run

[INFO] Database seeded successfully
```

---

## 🐛 Troubleshooting

### ❌ "Connection refused"
- Vérifie que ton Supabase est actif (pas en mode pause)
- Vérifie que la CONNECTION STRING est correcte
- Assure-toi d'utiliser "Session pooler" (pas "Transaction pooler" pour les migrations)

### ❌ "Authentication failed"
- Vérifie le password de la base de données
- Assure-toi d'utiliser l'user `postgres` (par défaut)

### ❌ "Database does not exist"
- Assure-toi que le DB_DATABASE est `postgres` (défaut Supabase)
- Ou change par le vrai nom de ta base

### ❌ Env validation errors
- Supprime `DATABASE_URL` ET les `DB_*` vides
- Ou utilise SOIT `DATABASE_URL` SOIT les `DB_*`, pas les deux

---

## 🔐 Sécurité

⚠️ **NE COMMIT PAS TON `.env`**

1. `.env` est ignoré par `.gitignore` (normalement)
2. Pour le déploiement (Vercel, Railway, etc.), ajoute tes env vars dans le dashboard du service
3. Les credentials ne doivent jamais être visibles publiquement

---

## 🌐 Déploiement

### Sur Vercel
1. Va à Settings → Environment Variables
2. Ajoute `DATABASE_URL` avec ta connection string Supabase
3. Redéploie → Les migrations se lancent automatiquement

### Sur Railway
1. Crée une nouvelle variable d'environnement
2. Ajoute `DATABASE_URL`
3. Railway détecte automatiquement PostgreSQL

### Sur Heroku
1. Settings → Config Vars
2. Ajoute `DATABASE_URL` avec ta connection string

---

## 💡 Tips

- **Session Pooler vs Transaction Pooler**: 
  - Pour migrations → Session Pooler
  - Pour production → Transaction Pooler (meilleur pour pool connections)

- **Test rapide**: 
  ```bash
  npm run dev
  ```
  La base se connecte automatiquement et SSR fonctionne

- **Créer une nouvelle base Supabase**:
  - Supabase Dashboard → New Project
  - Attend 2-3 minutes
  - Utilise la connection string

---

**Questions?** Consulte [QUICKSTART.md](./QUICKSTART.md) ou [HANDBALL93.md](./HANDBALL93.md) 📖

Bon développement ! 🏐
