# ACM Task Manager – Web Development Induction Task

## Overview
ACM Task Manager is a frontend-only task management web application built as part of the ACM Web Development Induction.

The project focuses on demonstrating:
- A realistic authentication flow
- Role-Based Access Control (RBAC)
- Task lifecycle management
- UI-driven state handling
- Frontend logging and simulated notifications

Although no backend is used, the application is intentionally designed to mirror real-world product behavior, showcasing strong frontend engineering practices.

---

##  Key Features

### Authentication Flow
- Google-style Sign-In interface using Firebase Authentication
- Displays user avatar and display name after login
- Authentication runs in OAuth testing mode, restricted to the project owner  
  → Demonstrates real Google OAuth integration without backend services

> The UI closely resembles the actual Google login experience to reflect real-world design standards.

---

### Role-Based Access Control (RBAC)
After authentication, users select a role:

**Lead**
- Assign tasks
- Delete tasks

**Developer**
- View assigned tasks
- Mark tasks as completed
- Pending counter automatically hides when no tasks remain (UX optimization)

RBAC is enforced entirely on the frontend using controlled UI rendering and state logic.

---

### Task Management
- Create, display, update, and delete tasks
- Persistent task storage using LocalStorage
- Task states:
  -  Pending
  -  Done
- Visual status badges clearly indicate task state

---

### Progress Tracking
- Dynamic progress bar displaying task completion percentage
- Automatically recalculates on task updates
- Provides immediate visual feedback to users

---

### Notifications (Simulated)
- User actions (login, task assignment, task completion) trigger:
  - Alerts
  - Console logs
- Demonstrates event-based notification logic

> In production, this would be replaced with backend-powered email or push notifications.

---

### Logout Mechanism
- Secure logout clears UI state
- Dashboard and task sections are hidden
- Login screen is restored cleanly
- Prevents unauthorized access after logout

This ensures proper session handling even in a frontend-only environment.

---

### Logging
- Key user actions logged using JavaScript `console.log`
- Helps trace application flow and user behavior
- Demonstrates frontend debugging and monitoring practices

---

## Tech Stack
- **HTML**
- **CSS** (Flexbox, responsive layout)
- **JavaScript (Vanilla)**
- **Firebase Authentication** (Google OAuth – testing mode)

---

## Why No Backend Features?
This project intentionally avoids backend services to emphasize frontend architecture and UI logic.

- **Caching**  
  Not required due to limited data size and LocalStorage-based persistence.

- **Rate Limiting**  
  Typically enforced server-side and not applicable in a frontend-only scope.

- **Backend Logging**  
  Simulated using console logs to demonstrate event tracking without server dependencies.

These choices reflect an understanding of frontend vs backend responsibilities.

---

## Deployment
The application is deployed using GitHub Pages:

🔗 **Live Demo**  
https://f20250752-dev.github.io/acm-task-manager/

---

## Future Improvements
- Backend-based task persistence
- Server-side notifications (email / push)
- Multi-user task assignment
- Admin dashboard
- Analytics and audit logging

---

### Summary
Even as a frontend-only application, this project demonstrates:
- Real authentication using Firebase
- Role-based access control
- State management and UI rendering
- Clean separation of concerns
- Thoughtful UI/UX design

This reflects real-world frontend development practices while remaining lightweight and easy to understand.

Even without a backend, the application behaves like a real-world task manager, showcasing practical frontend engineering skills.
