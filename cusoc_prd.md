# Product Requirements Document (PRD)
## CUSoC — Chandigarh University Season of Code
### Registration & Cohort Management Website

---

**Document Version:** 1.0  
**Date:** May 22, 2026  
**Prepared For:** CUSoC Program Team, Chandigarh University  
**Status:** Draft

---

## 1. Overview

### 1.1 Purpose
This document defines the product requirements for the CUSoC (Chandigarh University Season of Code) registration and cohort management website. The platform will serve as the official digital gateway for students and industry professionals to apply for the program as contributors, mentors, or project proposers — and for admins to manage and review those submissions.

### 1.2 Background
CUSoC is an open-source development program run by Chandigarh University. The program runs in two phases:
- **Pilot Summer Program:** 15 May 2026 – 15 July 2026 — Identification and training of high-potential contributors
- **Final Showcase & Evaluation Day:** 21 July 2026 — Final assessment and project showcase
- **CUSoC Cohort Program:** 25 July 2026 – April 2027 — Long-term mentorship and production-scale engineering training

### 1.3 Goals
- Provide a clean, accessible, dark-themed registration portal for all applicant types
- Collect structured data from contributors, mentors, and project proposers
- Store all submissions in a custom database
- Notify applicants via email on submission and after review
- Allow admins to log in and manage all submissions from a dashboard

---

## 2. Scope

### In Scope
- Public-facing landing/home page
- Contributor Application form
- Mentor Application form (Industry, Faculty, Student mentor types)
- Project Proposal form
- Admin dashboard (login-protected) for viewing and reviewing submissions
- Email notification system (on submission + post-review)
- File upload support (resume PDF) + profile links (GitHub, LinkedIn)
- Mobile-responsive design
- English language only

### Out of Scope
- Applicant login / self-service portal
- Payment processing
- Real-time collaboration tools
- Multi-language support

---

## 3. Target Users

| User Type | Description |
|-----------|-------------|
| CU Students | Chandigarh University students applying as Contributors or Student Mentors |
| Industry Professionals | External professionals applying as Industry Mentors |
| CU Faculty | Faculty members applying as Faculty Mentors |
| Project Proposers | Anyone (CU-affiliated) submitting a project idea |
| Program Admin | CUSoC organizers who review applications and manage cohort selections |

---

## 4. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React / Next.js (App Router) |
| Styling | Tailwind CSS |
| Backend | Node.js with Express, or Next.js API Routes |
| Database | MongoDB (via Mongoose ODM) |
| File Storage | AWS S3 or Cloudinary (for resume uploads) |
| Email | Nodemailer with SMTP or SendGrid |
| Auth (Admin) | NextAuth.js or JWT-based login |
| Deployment | Vercel (frontend) + MongoDB Atlas (cloud DB) |

---

## 5. Pages & Features

---

### 5.1 Landing / Home Page

**Purpose:** Introduce the program, showcase timelines, and direct users to the right application.

**Sections:**
- Hero section with CUSoC branding, tagline, and CTA buttons
- Program Timeline table:
  - Pilot Summer Program: 15 May – 15 July 2026
  - Final Showcase & Evaluation Day: 21 July 2026
  - CUSoC Cohort Program: 25 July 2026 – April 2027
- Pilot Program Applications section with three cards:
  - Contributor Application
  - Mentor Application
  - Project Proposal
- About CUSoC section (brief program description)
- FAQ section (optional)
- Footer with contact/social links

---

### 5.2 Contributor Application Form

**Purpose:** Allow CU students to register as open-source contributors for the pilot program.

**URL:** `/apply/contributor`

#### Section 1 — Basic Information
| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | Full Name | Text input | Yes |
| 2 | Email Address | Email input | Yes |
| 3 | Contact Number | Tel input | Yes |
| 4 | University / Institution Name | Text input | Yes |
| 5 | Degree Program (e.g. B.Tech CSE, MCA) | Text input | Yes |
| 6 | Current Year of Study | Dropdown (1st–5th Year) | Yes |
| 7 | LinkedIn Profile | URL input | No |
| 8 | GitHub Profile | URL input | Yes |
| 9 | Resume / CV Upload | File upload (PDF only, max 5MB) | Yes |

#### Section 2 — Technical Background
| # | Field | Type | Required |
|---|-------|------|----------|
| 10 | Primary Areas of Interest | Multi-select checkboxes: AI/ML, Data Science, Web Development, Mobile Development, Cybersecurity, Cloud/DevOps, UI/UX, Open Source, Research, IoT/Embedded Systems, Blockchain, Automation | Yes |
| 11 | Technical Skills | Textarea (languages, frameworks, tools, databases) | Yes |
| 12 | Comfortable With | Multi-select checkboxes: Git/GitHub, REST APIs, Linux, Docker, Research Writing, Team Collaboration, Agile/Scrum, Testing & Debugging | No |
| 13 | Rate Your Technical Confidence | Radio scale 1–5 (1 = Beginner, 5 = Advanced) | Yes |

#### Section 3 — Technical Projects & Experience
| # | Field | Type | Required |
|---|-------|------|----------|
| 14 | Describe Your Best Technical Project | Textarea (problem, tech used, contribution, outcomes) | Yes |
| 15 | Project Links (GitHub repos, deployed apps) | Textarea | No |
| 16 | Open Source Contributions | Textarea (PRs, issues, hackathons, community) | No |
| 17 | Have You Worked in Teams Before? | Radio: Yes / No | Yes |

#### Section 4 — Motivation & Goals *(implied from form context)*
| # | Field | Type | Required |
|---|-------|------|----------|
| 18 | Why do you want to join CUSoC? | Textarea | Yes |
| 19 | What do you hope to achieve? | Textarea | Yes |
| 20 | Availability (hours/week) | Dropdown or number input | Yes |

#### Section 5 — Availability & Commitment
| # | Field | Type | Required |
|---|-------|------|----------|
| 21 | Can you commit to the 8-week pilot program? | Radio: Yes / No | Yes |
| 22 | Any other commitments during this period? | Textarea | No |

#### Section 6 — Project Preferences
| # | Field | Type | Required |
|---|-------|------|----------|
| 26 | Preferred Project Domains | Multi-select: AI/ML, Research, Web Development, Mobile Apps, Cybersecurity, Open Source, Institutional Tools, Data Science, Automation, IoT | Yes |
| 27 | Preferred Role | Multi-select: Developer, Research Contributor, UI/UX Designer, Technical Writer, Data Analyst, QA/Testing | Yes |
| 28 | Preferred Collaboration Mode | Radio: Online / Offline / Hybrid | Yes |
| 29 | Confirmation checkbox | "I confirm the information is accurate and I commit to actively participating..." | Yes |

**Submit Button:** "Submit Application" (gold/yellow, full-width)

---

### 5.3 Mentor Application Form

**Purpose:** Allow Industry professionals, CU Faculty, and senior CU students to apply as mentors.

**URL:** `/apply/mentor`

**Mentor Type Selection (at top):**
Three cards displayed:
- **Industry Mentor** — 5+ years experience, guide real-world projects
- **Faculty Mentor** — CU Faculty, research & academic guidance
- **Student Mentor** — 3rd/4th year students, peer mentorship

Selecting a card dynamically shows/hides relevant fields.

#### Common Fields (All Mentor Types)
| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | Full Name | Text | Yes |
| 2 | Email Address | Email | Yes |
| 3 | Contact Number | Tel | Yes |
| 4 | LinkedIn Profile | URL | Yes |
| 5 | GitHub Profile | URL | No |
| 6 | Resume / CV | File upload PDF, max 5MB | Yes |
| 7 | Areas of Expertise | Multi-select (same as interest areas) | Yes |
| 8 | Mentoring Experience | Textarea | No |
| 9 | Why do you want to mentor? | Textarea | Yes |
| 10 | Availability (hrs/week) | Number input | Yes |
| 11 | Preferred Collaboration Mode | Radio: Online / Offline / Hybrid | Yes |
| 12 | Confirmation checkbox | Yes |

#### Industry Mentor — Additional Fields
| # | Field | Type | Required |
|---|-------|------|----------|
| M1 | Current Company / Organization | Text | Yes |
| M2 | Designation / Role | Text | Yes |
| M3 | Years of Experience | Number | Yes |
| M4 | Industry Domain | Dropdown/text | Yes |

#### Faculty Mentor — Additional Fields
| # | Field | Type | Required |
|---|-------|------|----------|
| F1 | Department | Text | Yes |
| F2 | Research Areas | Textarea | Yes |
| F3 | Publications / Research Links | Textarea | No |

#### Student Mentor — Additional Fields
| # | Field | Type | Required |
|---|-------|------|----------|
| S1 | University Roll Number | Text | Yes |
| S2 | Current Year of Study (3rd/4th) | Dropdown | Yes |
| S3 | Degree Program | Text | Yes |
| S4 | Technical Skills | Textarea | Yes |

---

### 5.4 Project Proposal Form

**Purpose:** Allow CU-affiliated individuals to propose open-source projects for contributors to work on.

**URL:** `/apply/project`

| # | Field | Type | Required |
|---|-------|------|----------|
| 1 | Proposer Full Name | Text | Yes |
| 2 | Email Address | Email | Yes |
| 3 | Affiliation (Student / Faculty / Staff) | Dropdown | Yes |
| 4 | GitHub Profile | URL | No |
| 5 | Project Title | Text | Yes |
| 6 | Project Domain | Multi-select (AI/ML, Web Dev, etc.) | Yes |
| 7 | Problem Statement | Textarea | Yes |
| 8 | Proposed Solution / Description | Textarea | Yes |
| 9 | Tech Stack Required | Textarea | Yes |
| 10 | Expected Deliverables | Textarea | Yes |
| 11 | Difficulty Level | Radio: Beginner / Intermediate / Advanced | Yes |
| 12 | Estimated Duration | Dropdown: 4 weeks / 6 weeks / 8 weeks | Yes |
| 13 | Existing Codebase / Repo Link | URL | No |
| 14 | Are you willing to mentor this project? | Radio: Yes / No | Yes |
| 15 | References / Similar Projects | Textarea | No |
| 16 | Confirmation checkbox | Yes |

---

### 5.5 Admin Dashboard

**Purpose:** Allow CUSoC program admins to log in, view all submissions, and manage review status.

**URL:** `/admin` (login-protected)

#### 5.5.1 Admin Login
- Email + password login
- JWT session or NextAuth session
- No public registration — admin accounts created manually or seeded

#### 5.5.2 Dashboard Overview
- Summary cards: Total Contributors, Total Mentors, Total Project Proposals, Pending Reviews
- Recent submissions table with quick-action buttons

#### 5.5.3 Contributor Submissions Table
Columns:
- Name, Email, University, Degree, Year, GitHub, Submission Date, Status (Pending / Approved / Rejected)
- Actions: View Full Application, Approve, Reject, Download Resume

#### 5.5.4 Mentor Submissions Table
Columns:
- Name, Email, Mentor Type, Company/Dept, Expertise, Submission Date, Status
- Actions: View Full Application, Approve, Reject, Download Resume

#### 5.5.5 Project Proposals Table
Columns:
- Project Title, Proposer Name, Domain, Difficulty, Duration, Submission Date, Status
- Actions: View Full Proposal, Approve, Reject

#### 5.5.6 Filters & Search
- Filter by: status (Pending / Approved / Rejected), submission type, date range
- Search by: name, email, domain

#### 5.5.7 Bulk Actions
- Bulk approve / reject selected rows
- Export to CSV

---

## 6. Email Notification System

| Trigger | Recipient | Email Content |
|---------|-----------|---------------|
| Form submitted | Applicant | Confirmation email with submission summary and reference ID |
| Form submitted | Admin | New submission alert with applicant details |
| Admin approves | Applicant | Approval email with next steps and program details |
| Admin rejects | Applicant | Rejection email with polite feedback message |

All emails should include the CUSoC branding (logo, dark theme, gold accent).

---

## 7. Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Performance | Page load < 2s on average connection |
| Responsiveness | Fully mobile-responsive (320px to 1440px+) |
| File Upload Limit | PDF only, max 5MB per file |
| Form Validation | Client-side + server-side validation on all required fields |
| Security | Admin routes protected by auth middleware; input sanitized to prevent XSS/SQL injection |
| Accessibility | WCAG 2.1 AA compliance (keyboard nav, ARIA labels, contrast ratios) |
| Browser Support | Latest 2 versions of Chrome, Firefox, Safari, Edge |
| Data Retention | Submissions stored indefinitely until manually deleted by admin |

---

## 8. Database Schema (High-Level)

**Database:** MongoDB (hosted on MongoDB Atlas)  
**ODM:** Mongoose

### Collections

- **contributors** — stores all contributor application data + resume file URL. Flexible document structure accommodates optional fields naturally.
- **mentors** — stores mentor applications. Type-specific fields (Industry / Faculty / Student) stored as nested sub-documents within the same collection, avoiding the need for joins.
- **project_proposals** — stores project proposal submissions as self-contained documents.
- **admins** — stores admin user credentials (hashed passwords via bcrypt).
- **email_logs** — tracks sent notification emails per submission (submissionId reference, type, timestamp, status).

### Why MongoDB?
- Form submissions have varying fields per mentor type — MongoDB's document model handles this natively without JSONB workarounds
- No complex relational joins needed; each submission is a self-contained document
- Easy horizontal scaling via MongoDB Atlas
- Flexible schema allows adding new form fields without migrations

---

## 9. API Endpoints (High-Level)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/apply/contributor` | Submit contributor application |
| POST | `/api/apply/mentor` | Submit mentor application |
| POST | `/api/apply/project` | Submit project proposal |
| POST | `/api/upload/resume` | Upload resume file |
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/contributors` | Fetch all contributor submissions |
| GET | `/api/admin/mentors` | Fetch all mentor submissions |
| GET | `/api/admin/projects` | Fetch all project proposals |
| PATCH | `/api/admin/submissions/:id/status` | Update status (approve/reject) |
| GET | `/api/admin/export` | Export submissions as CSV |

---

## 10. Milestones & Suggested Timeline

| Phase | Tasks | Suggested Duration |
|-------|-------|--------------------|
| Phase 1 — Setup | Project scaffold, MongoDB Atlas setup, Mongoose schema design, auth setup | 3–4 days |
| Phase 2 — Forms | Build all 3 application forms with validation | 5–7 days |
| Phase 3 — Backend | API routes, DB integration, file upload | 4–5 days |
| Phase 4 — Email | Nodemailer/SendGrid integration | 2 days |
| Phase 5 — Admin | Dashboard UI + all admin API integrations | 5–6 days |
| Phase 6 — Landing | Home page design and content | 2–3 days |
| Phase 7 — QA | Testing, bug fixes, responsive checks | 3–4 days |
| Phase 8 — Deploy | Vercel deployment, MongoDB Atlas production cluster, domain setup | 1–2 days |
| **Total** | | **~25–33 days** |

---

## 11. Open Questions / To Be Decided

- What domain/URL will the website be hosted on?
- Will there be a deadline for applications — and should forms auto-close after the deadline?
- Should the admin dashboard support multiple admin accounts with role-based access?
- Should rejected applicants be able to re-apply in a future cohort?
- Is there a cap on the number of accepted contributors/mentors per cohort?

---

## 12. Appendix — Form Sections Summary

| Form | Sections | Total Fields (approx.) |
|------|----------|------------------------|
| Contributor Application | Basic Info, Technical Background, Projects & Experience, Motivation, Availability, Project Preferences, Confirmation | ~29 fields |
| Mentor Application | Mentor Type Selection, Common Fields, Type-Specific Fields, Confirmation | ~20–24 fields |
| Project Proposal | Proposer Info, Project Details, Deliverables, Confirmation | ~16 fields |

---

*End of Document — CUSoC Registration Website PRD v1.0*
