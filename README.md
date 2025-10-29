# Thulamela Municipality Digital Services App

A modern, responsive web application for Thulamela Municipality providing digital services to both citizens and staff members.

## Features

### Citizen Portal
- 📅 **Appointments** - Schedule and manage appointments with municipal services
- 📄 **Document Services** - Upload and track document submissions
- 💬 **Feedback** - Submit feedback and complaints
- 🔔 **Announcements** - Stay updated with municipal announcements
- 📊 **Live Queue** - Real-time queue status for service centers

### Staff Dashboard
- 📋 **Queue Management** - Manage citizen queues and call next tickets
- 📝 **Task Management** - Create, assign, and track tasks
- 📄 **Document Processing** - Review and process citizen document submissions
- 📊 **Analytics Dashboard** - View service statistics and performance metrics

## Tech Stack

- **React 18** - Modern UI library
- **Vite 5** - Fast build tool and dev server
- **React Router 6** - Client-side routing
- **Zustand** - State management
- **Heroicons** - Beautiful icon set
- **LocalStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>/Thulamela-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
pnpm build
```

The production build will be generated in the `dist/` folder.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The workflow will automatically trigger on push to `main`

3. **Access your site**
   
   Your app will be available at: `https://<your-username>.github.io/<repo-name>/`

### Manual Deployment

```bash
# Set environment variables (PowerShell)
$env:GITHUB_ACTIONS="true"
$env:GITHUB_REPOSITORY="<your-username>/<repo-name>"

# Build and deploy
npm run deploy
```

## Project Structure

```
Thulamela-app/
├── src/
│   ├── pages/
│   │   ├── citizen/        # Citizen portal pages
│   │   └── staff/          # Staff dashboard pages
│   ├── shared/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Business logic & storage
│   │   └── stores/         # State management
│   ├── layouts/            # Page layouts
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static assets
├── .github/workflows/      # CI/CD workflows
└── vite.config.js          # Vite configuration
```

## Key Features Implementation

### Live Queue System
- Auto-refreshing queue display (30-second intervals)
- Real-time updates when staff calls next ticket
- Estimated wait time calculations

### Document Processing
- Multi-category document uploads
- Status tracking (Pending, In Progress, Completed, Rejected)
- Staff preview and processing workflow

### Task Management
- Priority-based task system (Low, Medium, High, Urgent)
- Status tracking (To Do, In Progress, Done)
- Quick task creation from dashboard

## License

MIT License - feel free to use this project for your municipality or organization.

## Support

For issues and questions, please open an issue on GitHub.
