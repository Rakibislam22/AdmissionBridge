# 🎓 AdmissionBridge

> A full-stack university admission platform that allows students to find universities based on academic scores and budget, compare them, and submit applications.

This project was developed as a technical assignment for the **Full Stack Developer Intern** position at **iniAstra Tech**.  
It demonstrates real-time filtering with SQL, eligibility validation, side-by-side comparison, and application submission.

---

## 🚀 Live Demo

👉 [Live App URL](https://the-dmission-bridge.netlify.app/)  

---

## 📦 Project Overview

AdmissionBridge is a **React + Node.js + SQL (PostgreSQL) full-stack application** that enables:

- Searching universities with filters (country, degree level, tuition range)
- Real-time updates based on user inputs
- Student eligibility checks (GPA + IELTS)
- Side-by-side university comparison
- Applying to a university via a multi-step form with validation

---

## 🧠 Key Features

✔ **High-Conversion Hero Search**  
Animation-powered hero section with quick search by country and degree.

✔ **Real-Time SQL Filtering**  
Filter universities by tuition fee, country, and degree.

✔ **Eligibility Check**  
Marks universities as “Not Eligible” if user’s GPA/IELTS scores are lower than requirements.

✔ **Comparison Tool**  
Select up to 3 universities and compare side-by-side.

✔ **Multi-Step Application Form**  
Submit applications with backend validation and SQL persistence.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Tailwind CSS, DaisyUI, Framer Motion |
| Backend | Node.js, Express |
| Database | PostgreSQL (Neon) |
| Deployment | Vercel/Netlify (frontend), Railway/Neon (backend + DB) |

---

## 📁 Repository Structure

```

AdmissionBridge
├── backend
│   ├── index.js
│   ├── db.js
│   ├── routes/
│   │   ├── universities.js
│   │   └── applications.js
│   └── .env
├── frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
├── database
│   └── seed.sql
├── .gitignore
└── README.md

````

---

## ⚙️ Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/Rakibislam22/AdmissionBridge.git
cd AdmissionBridge
````

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and add your PostgreSQL connection:

```
DB_HOST=YOUR_DB_HOST
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_NAME=YOUR_DB_NAME
DB_PORT=YOUR_DB_PORT
PORT=5000
```

Run backend:

```bash
npm start
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend will run at **[http://localhost:3000](http://localhost:3000)**

---

## 📊 Database Seed (PostgreSQL)

Use the included SQL seed file to populate initial data:

### 📁 `database/seed.sql`

```sql
CREATE TABLE IF NOT EXISTS universities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  degree_level TEXT NOT NULL,
  min_gpa NUMERIC(2,1) NOT NULL,
  min_ielts NUMERIC(2,1) NOT NULL,
  tuition_fee INTEGER NOT NULL
);

INSERT INTO universities (name, country, degree_level, min_gpa, min_ielts, tuition_fee) VALUES
('MIT', 'USA', 'Masters', 3.5, 7.0, 30000),
('University of Toronto', 'Canada', 'Masters', 3.2, 6.5, 25000),
('Stanford University', 'USA', 'Masters', 3.6, 7.5, 32000),
('Harvard University', 'USA', 'Masters', 3.5, 7.0, 31000),
('University of British Columbia', 'Canada', 'Masters', 3.0, 6.5, 22000),
('University of Waterloo', 'Canada', 'Bachelors', 3.0, 6.0, 18000),
('University of Oxford', 'UK', 'Masters', 3.7, 7.5, 35000),
('University of Cambridge', 'UK', 'Masters', 3.7, 7.5, 34000),
('Imperial College London', 'UK', 'Masters', 3.5, 7.0, 33000),
('University College London', 'UK', 'Bachelors', 3.2, 6.5, 28000),
('Australian National University', 'Australia', 'Masters', 3.1, 6.5, 26000),
('University of Melbourne', 'Australia', 'Masters', 3.2, 6.5, 27000),
('University of Sydney', 'Australia', 'Bachelors', 3.0, 6.0, 24000),
('Technical University of Munich', 'Germany', 'Masters', 2.8, 6.5, 15000),
('RWTH Aachen University', 'Germany', 'Masters', 2.9, 6.5, 14000),
('ETH Zurich', 'Switzerland', 'Masters', 3.6, 7.0, 20000),
('National University of Singapore', 'Singapore', 'Masters', 3.4, 7.0, 29000),
('Nanyang Technological University', 'Singapore', 'Bachelors', 3.1, 6.5, 26000),
('University of Tokyo', 'Japan', 'Masters', 3.3, 6.5, 21000),
('Seoul National University', 'South Korea', 'Masters', 3.2, 6.5, 19000);


CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  university_id INT REFERENCES universities(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  gpa FLOAT NOT NULL,
  ielts FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Test API Endpoints

✔ Get universities

```
GET /api/universities
```

✔ Apply to university

```
POST /api/applications
```

Body:

```json
{
  "universityId": 1,
  "name": "Rakib",
  "email": "rakib@example.com",
  "gpa": 3.5,
  "ielts": 7
}
```

---

## 📝 Project Notes

* UI built with Tailwind CSS + DaisyUI
* Smooth intro animations with Framer Motion
* Clean layout for comparison & filtering
* Backend rejects ineligible applications (GPA/IELTS)

---

## 💡 Future Improvements

* Add authentication (login/signup)
* Pagination for large university lists
* Save favorites or recent searches
* Dark mode support

---

## 👨‍💻 Author

**Md Rakib Ali**
GitHub: [https://github.com/Rakibislam22](https://github.com/Rakibislam22)

---

## 📄 License

This project is **free to use and modify**.


