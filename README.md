
# Hintro Dashboard

A modern, responsive dashboard built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## Live Demo

* **Deployment URL**: https://hintro-dashboard-tau.vercel.app/login
* **GitHub Repository**: https://github.com/yprasad28/Hintro-Dashboard

## Loom Walkthrough

* **Part 1**: https://www.loom.com/share/53b7804d6bb84fdfb3799c55fc4d3ac8
* **Part 2**: https://www.loom.com/share/b8a8572a628840d3a83fee3b4f347079

## Tech Stack

* **Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS 4 with shadcn/ui components
* **State Management**: Zustand with persistence
* **Server State Management**: React Query (TanStack Query)
* **HTTP Client**: Axios
* **Icons**: Lucide React
* **Animations**: Framer Motion & Tailwind Animate

## Features

### User Management

* Two test users (`u1` and `u2`) with different dashboard states
* User switching via dropdown menu
* Persistent user selection using localStorage
* Logout functionality with confirmation modal

### Dashboard Components

* **Stats Cards**: Display call session statistics
* **Usage Cards**: Show subscription and usage metrics
* **Call Sessions List**: Table view of recent call sessions
* Grouped call sessions with participant avatars
* Empty states for new users (`u1`)
* Real data display for active users (`u2`)
* Loading states with skeleton UI

### Responsive Design

* Desktop: Fixed 256px sidebar
* Mobile: Sheet sidebar with hamburger menu
* Mobile-first responsive layout
* Fully responsive across all screen sizes

### Feedback System

* Feedback modal with rating system
* Three feedback types:

  * Bug Report
  * Feature Request
  * Improvement
* LocalStorage persistence
* Feedback history page
* Responsive table and mobile card views

### API Integration

* Mock backend at `https://mock-backend-hintro.vercel.app`
* Automatic `x-user-id` header injection
* React Query based data fetching
* Error handling and loading states

## Project Structure

```bash
src/
├── app/
│   ├── login/
│   ├── feedback-history/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── dashboard-layout.tsx
│   │   └── top-navbar.tsx
│   │
│   ├── sidebar/
│   │   └── sidebar.tsx
│   │
│   ├── dashboard/
│   │   ├── stats-cards.tsx
│   │   ├── usage-cards.tsx
│   │   └── call-sessions-list.tsx
│   │
│   ├── feedback/
│   └── ui/
│
├── hooks/
│   ├── use-dashboard.ts
│   ├── use-profile.ts
│   └── use-call-sessions.ts
│
├── services/
│   └── api.ts
│
├── store/
│   └── index.ts
│
├── types/
│   └── index.ts
│
└── lib/
    ├── utils.ts
    └── formatters.ts
```

## Getting Started

### Prerequisites

* Node.js 18+
* npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yprasad28/Hintro-Dashboard.git
```

2. Navigate to project directory:

```bash
cd Hintro-Dashboard
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open in browser:

```bash
http://localhost:3000
```

## Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run start` - Start production server
* `npm run lint` - Run ESLint

## API Endpoints

The dashboard integrates with the following mock API endpoints:

* `GET /api/auth/profile` - User profile data
* `GET /api/auth/dashboard` - Dashboard data
* `GET /api/call-sessions/stats` - Call session statistics
* `GET /api/call-sessions?limit=N` - Call session history

All endpoints accept:

```bash
x-user-id
```

Supported values:

* `u1`
* `u2`

## User Data

| User ID | Data State | Description                                |
| ------- | ---------- | ------------------------------------------ |
| `u1`    | Empty      | New user with no dashboard data            |
| `u2`    | Filled     | Active user with randomized dashboard data |

## Principles Followed

### DRY Principle

* Centralized reusable formatter utilities
* Removed duplicate helper functions
* Shared utility modules across components

### Reusable Architecture

* Reusable UI components
* Shared hooks for API handling
* Shared TypeScript interfaces

### Single Responsibility Principle

* API logic separated into services
* State management separated into stores
* UI logic separated into components
* Utility logic separated into lib folder

### Clean Code Practices

* Strict TypeScript typing
* Semantic HTML
* Accessible UI components
* Consistent naming conventions
* Responsive component structure

## Challenges Faced

### React Query Cache Invalidation

* Dashboard data initially displayed stale cached data during user switching
* Fixed by including `userId` in query keys

### Duplicate Utility Functions

* Some formatter functions were duplicated across components
* Consolidated into shared formatter utilities

### Responsive Layout Consistency

* Maintaining consistent layout behavior across desktop and mobile views
* Solved using reusable layout abstractions and semantic spacing

## Assumptions & Decisions

* LocalStorage was used for session persistence because backend auth APIs were not provided
* Feedback data is stored locally per user
* User switching is handled using the `x-user-id` request header
* React Query cache keys include `userId` to prevent stale data
* Mobile-first responsive design approach was followed

## Features Implemented

✅ Responsive layout (mobile-first)
✅ Fixed sidebar on desktop
✅ Mobile sheet sidebar
✅ User switching between `u1` and `u2`
✅ Empty states for new users
✅ Real data display for active users
✅ Feedback system with localStorage
✅ Feedback history page
✅ Call sessions list
✅ Usage and subscription cards
✅ Stats cards with loading states
✅ Clean transitions and animations
✅ Semantic spacing and typography
✅ TypeScript strict mode
✅ Error handling and loading states
✅ Logout functionality
✅ Reusable component architecture

## Design Conventions

* **Colors**: Uses CSS custom properties from Tailwind theme
* **Spacing**: Consistent Tailwind spacing scale
* **Typography**: Semantic heading hierarchy
* **Components**: Built using shadcn/ui primitives
* **Responsiveness**: Mobile-first approach using Tailwind breakpoints

## License

MIT
