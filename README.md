# Thulamela Municipality Digital Services App
View Site ->  https://xheeze.github.io/Thulamela_Municipality/


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
## Support

For issues and questions,
