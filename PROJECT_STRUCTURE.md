# SaleMe Frontend Project Structure

## Overview
A modern React frontend for a reverse job portal connecting Employees and Employers.

## Key Features
- ✅ Combined Authentication (Login + Register with role selection)
- ✅ Employee Dashboard (create job posts with CV upload)
- ✅ Employer Dashboard (search employee profiles)
- ✅ Real-time notifications placeholder
- ✅ Modern UI with gradient styling and smooth animations
- ✅ Centralized API client with interceptors
- ✅ Token-based authentication ready for JWT
- ✅ Automatic error handling and 401 redirects

## Project Structure

```
saleme-frontend/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── Auth/               # Authentication components (old - replaced by pages/Auth)
│   │   ├── Employee/           # Employee-specific components
│   │   │   ├── CreateJobPost.js
│   │   │   ├── CreateJobPost.css
│   │   │   └── CreatePost.js   # Deprecated
│   │   ├── Employer/           # Employer-specific components
│   │   │   ├── SearchProfiles.js
│   │   │   ├── SearchProfiles.css
│   │   │   ├── ViewPosts.js
│   │   │   └── ViewPosts.css
│   │   ├── Layout/             # Layout components
│   │   │   ├── NavBar.js
│   │   │   └── NavBar.css
│   │   └── Notifications/      # Notification components
│   │       └── RealTimeNotifications.js
│   ├── pages/                  # Page components
│   │   ├── Auth.js            # Combined login/register page
│   │   ├── Auth.css
│   │   ├── Home.js
│   │   ├── EmployeeDashboard.js
│   │   ├── EmployerDashboard.js
│   │   └── EmployerDashboard.js
│   ├── services/              # API services
│   │   ├── apiClient.js       # Centralized axios instance with interceptors
│   │   ├── authService.js     # Authentication API calls
│   │   ├── postService.js     # Job posts API calls
│   │   └── userService.js     # User profile API calls
│   ├── App.js                 # Main app component with routing
│   ├── App.css
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── .env.example               # Environment variables template
├── package.json
└── README.md

```

## Technology Stack

- **React 19.2.3** - UI library
- **React Router 7.12.0** - Client-side routing
- **Axios** - HTTP client
- **Modern CSS** - Styling with gradients and animations

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file** from template:
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` for backend**:
   ```
   REACT_APP_API_BASE=http://localhost:8080/api
   ```

4. **Start development server**:
   ```bash
   npm start
   ```
   Opens on http://localhost:3000

5. **Build for production**:
   ```bash
   npm run build
   ```

## API Integration

### Centralized API Client (`src/services/apiClient.js`)
- Base URL: Configured via `REACT_APP_API_BASE`
- Auto-adds JWT token from localStorage
- Global error handling with 401 redirect
- 10-second timeout
- Request/response logging

### Service Files
- **authService.js** - Login & Register
- **postService.js** - Job posts CRUD & Search
- **userService.js** - User profile operations

All services use `apiClient` for consistent behavior.

## Backend Requirements

### Required Endpoints
See `BACKEND_INTEGRATION_GUIDE.md` for complete specifications:

1. **POST /api/auth/login** - User login
2. **POST /api/auth/register** - User registration
3. **POST /api/posts** - Create job post (with file upload)
4. **GET /api/posts** - Get all posts
5. **GET /api/posts/search** - Search employee profiles
6. **GET /api/users/profile** - Get user profile
7. **PUT /api/users/profile** - Update user profile

### CORS Configuration
Backend must enable CORS for all origins or at least:
- http://localhost:3000
- http://localhost:3007

### Database Schema
H2 Database with tables:
- `users` - User accounts with role
- `posts` - Job posts/profiles with file references

## Available Scripts

```bash
npm start         # Start dev server
npm run build     # Build for production
npm test          # Run tests (if configured)
npm run eject     # Eject from CRA (irreversible)
```

## Authentication Flow

1. User registers with name, email, password, and role
2. Backend returns user data (with JWT token)
3. Frontend stores token in localStorage
4. Token auto-added to all requests via interceptor
5. On 401, token cleared and user redirected to login

## Form Fields & Data

### Register Form
- Name (text)
- Email (email)
- Password (password)
- Role (radio: Employee / Employer)

### Create Job Post Form (Employee)
- Job Title (text, required)
- Your Name (text, required)
- Skills (text, comma-separated)
- Experiences (textarea)
- CV Upload (file: pdf/doc/docx)

### Search Form (Employer)
- Query (text, searches: title, skills, name)

## Styling & Design

- **Color Scheme**: Primary blue (#1976d2) with gradients
- **Border Radius**: 6-8px for modern look
- **Shadows**: Subtle 0 4px 12px rgba(0,0,0,0.1)
- **Transitions**: 0.3s ease on all interactive elements
- **Hover Effects**: Transform lift effect (translateY(-2px))
- **Background**: Gradient blue-to-gray

## Error Handling

- Network errors logged to console
- API errors displayed via alerts (improve with toast notifications later)
- 401 Unauthorized auto-redirects to login
- Error messages from backend displayed when available

## Future Enhancements

- [ ] Toast notifications instead of alerts
- [ ] Form validation on submit
- [ ] Loading states with spinners
- [ ] Pagination for search results
- [ ] Profile update page
- [ ] Post edit/delete functionality
- [ ] Real-time notifications with WebSocket
- [ ] Image uploads for avatars
- [ ] Dark mode theme
- [ ] Responsive mobile design

## Environment Variables

```
REACT_APP_API_BASE    # Backend API base URL (default: http://localhost:8080/api)
```

## Notes for Backend Team

- All timestamps use ISO 8601 format
- File uploads should return accessible URLs
- Use proper HTTP status codes
- Add validation for all inputs
- Return meaningful error messages
- Support multipart/form-data for file uploads
- Token should be in response as `token` field
- User data in response as `user` object

