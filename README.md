
# mYNotes - MERN Notes App with Authentication

A modern, secure, and responsive Note-Taking web application built with React, Zustand, Chakra UI and Node, Express, MongoDB. Features user authentication, OTP email verification, and CRUD operations for notes.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Available Scripts](#available-scripts)  
- [Project Structure](#project-structure)
- [Environment Variables](#envrionment-variables)    
- [Authentication Flow](#authentication-flow)  
- [Future Improvements](#future-improvements)  
- [Contributing](#contributing)  
- [License](#license)

---

## Features

- User registration with email verification via OTP  
- Secure login and protected routes  
- Create, View, Update, and Delete notes  
- User profile management  
- Responsive design with mobile-friendly navigation drawer  
- Password strength validation and confirmation during signup 

---

## Tech Stack

- **Frontend:** React, React Router, Zustand, Chakra UI, Framer Motion, TailwindCSS
- **Backend:** Node, Express, MongoDB, JWT, BcryptJS, Nodemailer with Brevo
- **Icons:** React Icons  
- **Forms & Validation:** Password strength bar, password checklist  
- **Routing:** Protected and redirect routes for authentication flow  


---

## Getting Started

### Prerequisites

- Node.js (>=14.x recommended)  
- npm or yarn  

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/mynotes.git
cd mynotes
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm start
# or
yarn start
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## Available Scripts

- `npm start` / `yarn start` - Run the app in development mode  
- `npm run build` / `yarn build` - Build the app for production  

---

## Project Structure

```
mYNotes/
├── package.json
├── package-lock.json
├── backend/
│   ├── index.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── notes.controller.js
│   ├── db/
│   │   └── connectDB.js
│   ├── mail/
│   │   ├── emails.js
│   │   └── emailTemplates.js
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── models/
│   │   ├── auth.model.js
│   │   └── notes.model.js
│   ├── routes/
│   │   ├── notes.route.js
│   │   └── user.route.js
│   └── utils/
│       └── generateTokenAndSetCookie.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       ├── main.jsx
│       ├── components/
│       │   ├── LoadingSpinner.jsx
│       │   ├── Nav.jsx
│       │   ├── NoNotes.jsx
│       │   ├── NoteTile.jsx
│       │   ├── PasswordInput.jsx
│       │   └── TagsInput.jsx
│       ├── pages/
│       │   ├── CreateNotes.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── MyProfile.jsx
│       │   ├── OTPVerificationPage.jsx
│       │   ├── SignupPage.jsx
│       │   └── UpdateNotes.jsx
│       └── store/
│           ├── NotesStore.jsx
│           └── UserStore.jsx

```

---

## Environment Variables

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
SMTP_HOST=your_brevo_host.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_email@example.com
SMTP_PASSWORD=your_brevo_password
CLIENT_URL=http://localhost:5173

```

---

## Authentication Flow

- Users sign up with username, email, and password.  
- Email OTP verification is required before accessing protected routes.  
- Verified users can log in and manage notes.  
- Protected routes guard dashboard, note management, and profile pages.  
- Redirects ensure appropriate access depending on authentication and verification state.  

---

## Future Improvements

- Password Reset functionality 
- OTP Resend functionality 
- Bookmark Functionality
- Note search and filtering  
- Dark mode support  
- Better error handling  
- Testing (unit and integration)  

---

## Contributing

Feel free to open issues and pull requests!

---

## License

MIT License

---

Made with ❤️ by Shubham Pathak
