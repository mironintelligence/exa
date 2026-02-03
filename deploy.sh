#!/bin/bash

echo "🚀 ExA Platform: FINAL DEPLOYMENT SEQUENCE STARTING..."

# 1. Install Dependencies
echo "📦 Installing dependencies..."
npm install --quiet

# 2. Database Sync & Seeding
echo "🗄️ Syncing database schema..."
npx prisma generate
npx prisma db push --accept-data-loss
echo "🌱 Seeding tactical data..."
npx tsx seed.ts

# 3. Build Validation
echo "🏗️ Running production build..."
npm run build

# 4. Git Push - Full Force
echo "🛰️ Pushing to GitHub..."
git add .
git commit -m "feat: EXA PLATFORM v2.5.0 - FULL SCALE AUTONOMOUS REBUILD [CTO COMMIT]"
git push origin main --force

echo "✨ DEPLOYMENT COMPLETE. SYSTEM IS LIVE."
