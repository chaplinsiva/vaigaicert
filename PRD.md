# Product Requirements Document (PRD)
# Vaigai Certificate Provider

**Document Version:** 1.0.0  
**Project Name:** Vaigai Certificate Provider  
**Organization:** Vaigai College of Engineering  
**Event:** 5-Day AI Webinar Series 2026 (Sept 7 - Sept 11, 2026)  
**Target Release:** August 2026 / Active for September 2026 Event  

---

## 1. Executive Summary & Objective

**Vaigai Certificate Provider** is a specialized, high-aesthetic web application designed for **Vaigai College of Engineering** to automate the validation, generation, and distribution of official e-Certificates of Participation for the **5-Day AI Webinar Series 2026**.

The platform solves certificate management challenges by:
1. Connecting directly to participant registrations recorded via Google Forms / Google Sheets.
2. Enforcing a secure, time-gated lock policy until the conclusion of the webinar series on **September 11, 2026**.
3. Providing an **Admin Portal** (`admin` / `Free@&Focus`) allowing organizers to bypass the lock, audit participant entries, inspect certificate previews, and export certificates in bulk.
4. Offering an intuitive public portal with live countdown timers, schedule highlights, and instant certificate search and download post-event.

---

## 2. Event Specifications & Academic Context

- **Host Institution:** Vaigai College of Engineering
- **Departments Involved:** Department of Computer Science & Engineering (CSE) & Department of Electronics & Communication Engineering (ECE)
- **Event Title:** 5-Day AI Webinar Series 2026
- **Event Dates:** September 7, 2026 – September 11, 2026 (7:00 PM – 8:00 PM IST Daily)
- **Convener:** Dr. R. Sivaranjani (Professor / ECE)
- **Faculty Coordinators:** Ms. Selvamahalakshmi (AP / ECE), Ms. Roobika (AP / CSE)
- **Webinar Itinerary:**
  - **Day 1 (Sept 7, 2026):** Mr. Jaiber John – *Embodied AI: Bridging Vision, Language, and Action for Next-Gen Robotics*
  - **Day 2 (Sept 8, 2026):** Dr. Yoga Meena – *Computer Vision and AI: Leveraging Video Analytics for Enhanced Insight*
  - **Day 3 (Sept 9, 2026):** Dr. S. Mohamed Mansoor Roomi – *Deep Learning & Multimedia Analytics*
  - **Day 4 (Sept 10, 2026):** Mrs. Vijayalakshmi – *Engineering the Future with AI: From Curiosity to Creating Real-World Solutions*
  - **Day 5 (Sept 11, 2026):** Mr. Muthu Nivas – *The Democratization of Knowledge in the AI Age*

---

## 3. User Roles & Personas

### 3.1 Participant (Public User)
- **Goal:** Check registration status, view webinar timeline, and download official certificate once released.
- **Experience Pre-Unlock (< Sept 11, 2026, 8:00 PM IST):**
  - Searches name, email, or mobile number.
  - Sees verified participant status with a **Locked State & Live Countdown Timer**.
  - Can view blurred/watermarked preview indicating authenticity.
  - Can add calendar reminders for webinar sessions.
- **Experience Post-Unlock (>= Sept 11, 2026, 8:00 PM IST):**
  - Instant certificate reveal with confetti animation.
  - One-click Download as High-Resolution PNG & PDF.
  - Built-in QR verification badge.

### 3.2 Administrator (College Organizers)
- **Credentials:**
  - **Username:** `admin`
  - **Password:** `Free@&Focus`
- **Privileges:**
  - Complete bypass of the time-lock mechanism.
  - Real-time synchronization with Google Sheets (`gid=1021106059`).
  - Search, filter, and preview individual certificates.
  - Batch generation and ZIP/bulk PDF printing capabilities.
  - Manual participant injection and metadata overrides (e.g., correcting misspelled names).
  - Quick share link generator for participants.

---

## 4. System Architecture & Technical Specifications

### 4.1 Frontend Architecture
- **Framework:** Next.js 14+ (App Router) + React 18+
- **Styling:** Tailwind CSS with custom academic palette (Deep Navy `#0b132b`, Sapphire `#1c2541`, Gold Foil `#f59e0b` / `#d97706`, Platinum `#f8fafc`).
- **Icons:** Lucide-React
- **Canvas / Export Engine:** `html2canvas` & `jspdf` for high-dpi (300 DPI equivalent) vector and raster outputs.
- **QR Code Engine:** `qrcode` dynamic SVG/Canvas encoder.
- **Celebration Effects:** `canvas-confetti`.

### 4.2 Data Pipeline & Google Sheets Integration
- **Primary Source:** Google Sheets CSV export:
  `https://docs.google.com/spreadsheets/d/1n0qntg1k2uM6P9I_qd6jr2sh07FsKGVtAoO3HejxwG4/export?format=csv&gid=1021106059`
- **Data Mapping Schema:**
  - `Timestamp` -> Registration Time
  - `Email` -> Primary verification key
  - `Salutation` + `Name` -> Certificate Recipient Header
  - `Designation` + `Branch` + `Department` -> Role qualifier
  - `College Name` -> Institution line
  - `Mobile Number` -> Secondary search key
  - Auto-generated `Certificate ID` -> Format: `VCE-AI26-[HASH]`
- **Reliability Guarantee:** Automatic fallback sample dataset + manual CSV upload modal if Google Sheets network is restricted or offline.

---

## 5. Security & Verification

1. **Anti-Tampering Watermark & Certificate ID:** Every certificate embeds a unique alphanumeric ID and dynamic QR code encoding verification metadata.
2. **Client-side Session Encryption:** Admin state stored in secure session storage with cryptographic salt checks.
3. **Time-Lock Enforcement:** Client timestamp cross-checked with UTC/IST time standards.

---

## 6. Milestones & Delivery Checklist

- [x] Product Requirements Definition (PRD.md)
- [x] Next.js 14 App Architecture & Theme Design
- [x] Live Google Sheet Synchronization Engine
- [x] High-Resolution Academic Certificate Component with QR & Signatures
- [x] Public Participant Search & Countdown Time-Lock Screen
- [x] Admin Login (`admin` / `Free@&Focus`) & Audit Dashboard
- [x] PDF / High-Res PNG Download & Bulk Export Tools
- [x] Responsive Mobile & Desktop Layout Validation
