# CUSoC — Chandigarh University Summer of Code

<p align="center">
  <img src="./public/cusoc.png" alt="CUSoC Logo" width="180" />
</p>

<p align="center">
  <strong>Official Registration & Cohort Management Portal</strong><br/>
  An open-source development program by Chandigarh University, inspired by Google Summer of Code.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
</p>

---

## 📋 Table of Contents

- [About](#-about)
- [Program Timeline](#-program-timeline)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#-api-endpoints)
- [Application Routes](#-application-routes)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🚀 About

**CUSoC (Chandigarh University Summer of Code)** is a structured open-source development program that connects students with industry professionals and faculty mentors to work on real-world projects.

This repository contains the full-stack web application for:
- 📝 Student & contributor registration
- 🧑‍🏫 Mentor applications (Industry, Faculty, Student mentors)
- 💡 Project proposal submissions
- 🔐 Admin dashboard for reviewing and managing all submissions
- 📧 Automated email notifications

---

## 📅 Program Timeline

| Phase | Dates |
|-------|-------|
| 🌱 Pilot Summer Program | 15 May 2026 – 15 July 2026 |
| 🏆 Final Showcase & Evaluation | 21 July 2026 |
| 🎓 CUSoC Cohort Program | 25 July 2026 – April 2027 |

---

## ✨ Features

- **Landing Page** — Program overview, timeline, and navigation to all application portals
- **Contributor Application** — Multi-section form for CU students to register as open-source contributors
- **Mentor Application Portals**
  - 🏢 Industry Mentor form (5+ years experience)
  - 🎓 Faculty Mentor form (CU faculty / research guidance)
  - 👨‍🎓 Student Mentor form (3rd/4th year peer mentors)
- **Project Proposal Portals**
  - Institutional Project form
  - Industry Project form
- **Admin Dashboard** — JWT-protected dashboard to view, approve/reject submissions, and export data as CSV
- **Email Notifications** — Automated emails on submission, approval, and rejection via Nodemailer
- **Resume Upload** — PDF upload (max 5MB) stored on Cloudinary
- **OTP Verification** — Email OTP flow for form submission validation
- **Mobile Responsive** — Fully responsive from 320px to 1440px+

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Styling |
| Vite | 8 | Build tool & dev server |
| Axios | 1.x | HTTP client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js + Express | 5.x | REST API server |
| MongoDB + Mongoose | 9.x | Database & ODM |
| Cloudinary | 2.x | Resume PDF storage |
| Multer | 2.x | File upload handling |
| Nodemailer | 8.x | Email notifications |
| JSON Web Token | 9.x | Admin authentication |
| bcryptjs | 3.x | Password hashing |
| dotenv | 17.x | Environment config |

---

## 📁 Project Structure

```
CUSoC/
├── public/                     # Static assets
│   ├── cusoc.png               # CUSoC logo
│   ├── favicon.svg
│   └── icons.svg
│
├── src/                        # Frontend source code
│   ├── components/
│   │   ├── Navbar.jsx          # Global navigation bar
│   │   └── Footer.jsx          # Global footer
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx              # Home / hero page
│   │   ├── ContributorForm.jsx          # Contributor application
│   │   ├── MentorPortal.jsx             # Mentor type selection
│   │   ├── IndustryMentorForm.jsx       # Industry mentor form
│   │   ├── FacultyMentorForm.jsx        # Faculty mentor form
│   │   ├── StudentMentorForm.jsx        # Student mentor form
│   │   ├── ProjectPortal.jsx            # Project type selection
│   │   ├── InstitutionalProjectForm.jsx # Institutional project form
│   │   ├── IndustryProjectForm.jsx      # Industry project form
│   │   ├── AdminLogin.jsx               # Admin login page
│   │   └── AdminDashboard.jsx           # Admin dashboard
│   │
│   ├── assets/                 # Image/icon assets
│   ├── api.js                  # Centralized Axios API client
│   ├── App.jsx                 # Root component with routing
│   ├── App.css                 # Global component styles
│   ├── main.jsx                # React entry point
│   └── index.css               # Base / reset CSS
│
├── backend/                        # Node.js + Express Backend
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   │
│   ├── controllers/
│   │   ├── applyController.js      # Form submissions + OTP logic
│   │   └── adminController.js      # Admin auth + management
│   │
│   ├── models/
│   │   ├── Contributor.js          # Contributor schema
│   │   ├── Mentor.js               # Mentor schema
│   │   ├── ProjectProposal.js      # Project proposal schema
│   │   └── Admin.js                # Admin user schema
│   │
│   ├── routes/
│   │   ├── applyRoutes.js          # /api/apply/* endpoints
│   │   └── adminRoutes.js          # /api/admin/* endpoints
│   │
│   ├── utils/
│   │   └── sendEmail.js            # Nodemailer email utility
│   │
│   ├── server.js                   # Express app entry point
│   ├── vercel.json                 # Backend Vercel config
│   ├── package.json
│   └── .env                        # Environment variables (gitignored)
│
├── index.html                  # Vite HTML entry
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── vercel.json                 # Frontend Vercel config
├── package.json                # Frontend dependencies
├── cusoc_prd.md                # Product Requirements Document
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** v9+
- **MongoDB Atlas** account (or local MongoDB instance)
- **Cloudinary** account (for resume PDF uploads)
- **SMTP credentials** (Gmail or any SMTP provider for Nodemailer)

---

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/your-org/CUSoC.git
cd CUSoC

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run at **http://localhost:5173**

---

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Start the backend in development mode (with hot-reload)
npm run dev

# OR start in production mode
npm start
```

The backend API will run at **http://localhost:5000**

---

### Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cusoc

# JWT
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Resume PDF Storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📡 API Endpoints

### Application Routes (`/api/apply`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/apply/send-otp` | Send OTP to email for verification |
| `POST` | `/api/apply/verify-otp` | Verify OTP before submission |
| `POST` | `/api/apply/contributor` | Submit contributor application (with resume upload) |
| `POST` | `/api/apply/mentor` | Submit mentor application (with resume upload) |
| `POST` | `/api/apply/project` | Submit project proposal |

### Admin Routes (`/api/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/admin/login` | Admin login — returns JWT |
| `GET` | `/api/admin/contributors` | Get all contributor submissions |
| `GET` | `/api/admin/mentors` | Get all mentor submissions |
| `GET` | `/api/admin/projects` | Get all project proposals |
| `PATCH` | `/api/admin/submissions/:id/status` | Approve or reject a submission |
| `GET` | `/api/admin/export` | Export submissions as CSV |

> All `/api/admin/*` routes (except login) require a valid JWT in the `Authorization: Bearer <token>` header.

---

## 🗺 Application Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `LandingPage` | Home page with program overview |
| `/register/contributor` | `ContributorForm` | Contributor application form |
| `/register/mentor` | `MentorPortal` | Mentor type selection |
| `/register/project` | `ProjectPortal` | Project type selection |
| `/apply/mentor/industry` | `IndustryMentorForm` | Industry mentor form |
| `/apply/mentor/faculty` | `FacultyMentorForm` | Faculty mentor form |
| `/apply/mentor/student` | `StudentMentorForm` | Student mentor form |
| `/apply/project/institutional` | `InstitutionalProjectForm` | Institutional project form |
| `/apply/project/industry` | `IndustryProjectForm` | Industry project form |
| `/admin/login` | `AdminLogin` | Admin login page |
| `/admin` | `AdminDashboard` | Admin dashboard (protected) |

---

## 🤝 Contributing

We welcome contributions to CUSoC! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style/formatting
- `refactor:` — Code refactoring
- `chore:` — Build/tooling changes

---

## 📄 License

This project is maintained by the **CUSoC Program Team, Chandigarh University**.  
For questions or collaboration, contact the organizing team.

---

