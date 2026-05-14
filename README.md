# Hintro Dashboard

A modern, responsive dashboard built with Next.js 16, TypeScript, Tailwind CSS, and shadcn/ui.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State Management**: Zustand with persistence
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Animations**: Framer Motion & Tailwind Animate

## Features

### User Management
- Two test users (u1 and u2) with different data states
- User switching via dropdown menu
- Persistent user selection using localStorage
- Logout functionality

### Dashboard Components
- **Stats Cards**: Display call session statistics
- **Usage Cards**: Show subscription and usage metrics
- **Call Sessions List**: Table view of recent call sessions with pagination
- Empty states for new users (u1)
- Real data display for active users (u2)

### Responsive Design
- Desktop: Fixed 256px sidebar
- Mobile: Sheet sidebar with hamburger menu
- Fully responsive layout across all screen sizes

### Feedback System
- Sidebar feedback collection
- Three feedback types: Bug Report, Feature Request, Improvement
- Optional 5-star rating for improvements
- Persistent storage using localStorage
- Feedback history with delete capability

### API Integration
- Mock backend at `https://mock-backend-hintro.vercel.app`
- Automatic user header injection
- Loading states with skeleton UI
- Error handling and display

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Dashboard home page
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── dashboard-layout.tsx
│   │   └── top-navbar.tsx
│   ├── sidebar/
│   │   └── sidebar.tsx
│   ├── dashboard/
│   │   ├── stats-cards.tsx
│   │   ├── usage-cards.tsx
│   │   └── call-sessions-list.tsx
│   ├── feedback/
│   │   └── feedback-sidebar.tsx
│   └── ui/                  # shadcn/ui components
├── services/
│   └── api.ts              # API service layer
├── store/
│   └── index.ts            # Zustand stores
├── types/
│   └── index.ts           # TypeScript interfaces
└── lib/
    ├── utils.ts            # Utility functions
    └── formatters.ts       # Data formatting utilities
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hintro-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

The dashboard integrates with the following mock API endpoints:

- `GET /api/auth/profile` - User profile data
- `GET /api/auth/dashboard` - Dashboard with subscription and usage
- `GET /api/call-sessions/stats` - Call session statistics
- `GET /api/call-sessions?limit=N` - Call session history

All endpoints accept `x-user-id` header with values `u1` or `u2`.

## User Data

| User ID | Data State | Description |
|---------|-----------|-------------|
| `u1` | Empty | New user with no data |
| `u2` | Filled | Active user with random data |

## Data Formatting

- **Duration**: Automatically formatted from seconds to human-readable format (e.g., "2h 15m", "45m 30s")
- **Dates**: Relative formatting (Today, Yesterday, X days ago)
- **Numbers**: Compact notation for large numbers (1K, 1M)

## Features Implemented

✅ Responsive layout (mobile-first)  
✅ Fixed sidebar on desktop, sheet on mobile  
✅ User switching between u1 and u2  
✅ Empty states for new users  
✅ Real data display for active users  
✅ Feedback system with localStorage  
✅ Call sessions list with table view  
✅ Usage and subscription cards  
✅ Stats cards with loading states  
✅ Clean transitions and animations  
✅ Semantic spacing and typography  
✅ Global CSS theme (no hardcoded colors)  
✅ TypeScript with strict mode  
✅ Error handling and loading states  
✅ Logout functionality  

## Design Conventions

- **Colors**: Uses CSS custom properties from Tailwind theme
- **Spacing**: Consistent Tailwind spacing scale (p-4, gap-4, etc.)
- **Typography**: Semantic heading hierarchy with proper tracking
- **Components**: All UI built with shadcn/ui primitives
- **Responsiveness**: Mobile-first with `lg:` breakpoint for desktop

## License

MIT