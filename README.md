# ExA Gaming Platform

A modern gaming tournament platform built with Next.js 14, Prisma, and PostgreSQL.

## Features

- 🎮 Multi-game support (PUBG Mobile, Valorant, and more)
- 🏆 Tournament management system
- 👑 Admin panel for game status control
- 🎨 Modern dark gaming aesthetic
- ⚡ Built with Next.js 14 and Server Actions
- 🗄️ PostgreSQL database with Prisma ORM

## Tech Stack

- **Framework:** Next.js 14
- **Database:** PostgreSQL + Prisma
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** NextAuth.js (ready to configure)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/mironintelligence/exa.git
cd exa
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit \`.env\` and add your database connection string:
\`\`\`
DATABASE_URL="postgresql://user:password@localhost:5432/exa?schema=public"
\`\`\`

4. Push database schema:
\`\`\`bash
npx prisma db push
\`\`\`

5. Seed the database:
\`\`\`bash
npx tsx seed.ts
\`\`\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

\`\`\`
exa/
├── prisma/
│   └── schema.prisma      # Database schema
├── public/
│   └── images/            # Game cover images
├── src/
│   ├── actions/           # Server actions
│   ├── app/               # Next.js app router pages
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   └── lib/               # Utility functions
├── deploy.sh              # Deployment script
└── seed.ts                # Database seed script
\`\`\`

## Admin Panel

Access the admin panel at \`/admin/games\` to manage game statuses:
- Toggle games between ACTIVE and COMING_SOON
- View game metadata

## Deployment

### Quick Deploy

Run the deployment script:
\`\`\`bash
./deploy.sh
\`\`\`

### Manual Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add \`DATABASE_URL\` environment variable
4. Deploy

## License

MIT
