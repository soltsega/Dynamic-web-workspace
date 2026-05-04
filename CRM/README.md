# Premium Mini CRM

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel)](https://crm-yh6c.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, professional-grade CRM dashboard built with a modern glassmorphism aesthetic. Designed for speed, security, and a premium user experience.

---

## Features

- **Elite UI/UX:** Stunning dark-mode interface with glassmorphism effects and smooth Framer Motion animations.
- **Secure Authentication:** Fully featured login and registration with credential masking and JWT protection.
- **Industrial Security:** Integrated with `helmet` for secure headers and `express-rate-limit` to prevent brute-force attacks.
- **Multi-User Isolation:** Each user has their own private pipeline. No data leaks, total privacy.
- **Smart Lead Management:** Track clients, companies, job titles, and lead scores in a real-time dashboard.
- **Activity Tracking:** Add notes and follow-ups to your leads to ensure no deal falls through the cracks.
- **Built for Speed:** Powered by Vite and a lightweight, custom utility CSS system.

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide_Icons-FF6F61?style=for-the-badge&logo=lucide&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

---

## Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or Atlas URI)

### Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/mini-crm.git
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with MONGO_URI and JWT_SECRET
   node seeder.js # Seed initial admin user
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## Roadmap
- Advanced Analytics with Recharts
- Email Template Integration
- CSV Import/Export Engine
- Role-Based Access Control (RBAC)

---

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to help make this CRM even better.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**[View Live Demo](https://crm-yh6c.vercel.app/)**
