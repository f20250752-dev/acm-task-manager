ACM Task Manager – Web Development Induction Task

Overview:
This project is a frontend task management system built as part of ACM induction.
It demonstrates authentication flow, role-based access control, task handling, and logging.

Features:
- Simulated Google Sign-In flow
- Role selection (Admin, Lead, Developer)
- Role-Based Access Control (RBAC)
- Task completion functionality
- Frontend logging using JavaScript
- Clean and responsive UI
- Cross-platform frontend compatible with all modern browsers
- Notifications:
The application simulates notifications using alerts and logs to demonstrate event-based notification triggers. In a production setup, this would be replaced with email or push notifications using backend services.



Authentication Flow:
User logs in using a simulated Google login button.
After successful login, the user selects a role and is redirected to the tasks page.

RBAC:
- Admin & Lead can assign tasks
- Developer can only view and complete tasks

Logging:
User actions such as login and task completion are logged using console logs.

Tech Stack:
- HTML
- CSS (Flexbox)
- JavaScript (Vanilla)

Future Improvements:
- Integrate real Google Authentication using Firebase
- Backend-based logging
- Persistent task storage
