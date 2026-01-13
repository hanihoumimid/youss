#!/bin/bash

# Handball93 Quick Start Script

echo "🏐 Handball93 - Quick Start"
echo "=========================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Créating .env file..."
    cp .env.example .env 2>/dev/null || echo "WARN: No .env.example found, create manually"
    echo "✅ .env created. Please edit it with your database credentials."
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run migrations
echo ""
echo "🗄️  Running database migrations..."
node ace migrate

# Run seeders
echo ""
echo "🌱 Seeding database with test data..."
node ace seed:run

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting development server..."
npm run dev
