#!/bin/bash

# ExA Platform Deployment Script
# This script will: install dependencies, setup database, and deploy to GitHub

set -e  # Exit on error

echo "🚀 Starting ExA Platform Deployment..."

# Step 1: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Step 2: Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Step 3: Push database schema (requires DATABASE_URL)
echo ""
echo "🗄️  Pushing database schema..."
echo "⚠️  Note: Make sure DATABASE_URL is set in .env file"
if [ -f ".env" ]; then
  npx prisma db push
else
  echo "⚠️  .env file not found. Skipping database operations."
  echo "   Create .env file with DATABASE_URL to run database migrations."
fi

# Step 4: Run seed script
echo ""
echo "🌱 Seeding database..."
if [ -f ".env" ]; then
  npx tsx seed.ts
else
  echo "⚠️  Skipping seed - no .env file found."
fi

# Step 5: Git operations
echo ""
echo "📝 Preparing Git repository..."

# Remove old git folder
if [ -d ".git" ]; then
  echo "🗑️  Removing old .git folder..."
  rm -rf .git
fi

# Initialize new git repository
echo "🎯 Initializing new Git repository..."
git init

# Add all files
echo "➕ Adding all files..."
git add .

# Commit
echo "💾 Creating commit..."
git commit -m "feat: complete autonomous rebuild"

# Rename branch to main
echo "🌿 Renaming branch to main..."
git branch -M main

# Add remote
echo "🔗 Adding remote origin..."
git remote add origin https://github.com/mironintelligence/exa.git

# Force push
echo "🚀 Force pushing to GitHub..."
echo "⚠️  WARNING: This will OVERWRITE the remote repository!"
git push -u origin main --force

echo ""
echo "✅ Deployment complete!"
echo "🎉 ExA Platform has been successfully deployed to GitHub!"
echo ""
echo "Next steps:"
echo "1. Set up DATABASE_URL in your production environment"
echo "2. Deploy to Vercel or your preferred hosting platform"
echo "3. Run migrations and seed in production"
