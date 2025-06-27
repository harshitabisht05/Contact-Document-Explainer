## 📦 Setup Instructions

#### 1. Clone the repo

```bash
git clone https://github.com/your-org/frontend-app.git
cd frontend-app
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is the **React/Next.js frontend** for the FastAPI backend that enables users to:
- Register and log in
- Upload and manage PDF files
- Transcribe and summarize documents
- Download summaries as PDFs
---

## 🧑‍💻 Pages

#### `/register`
- Username + password
- Registers a new user

#### `/login`
- Username + password
- Saves access token on login
- Redirects to `/upload`

#### `/dashboard`
- Lists all uploaded files
- Allows:
  - Summarizing a file
  - Deleting a file
  - Navigating to summary
  - Downloading PDF

#### `/upload`
- Upload only `.pdf` files
- On success: redirects to dashboard

#### `/summary/[file_id]`
- Fetches summary using `GET /summarize/{file_id}`
- Displays summary
- Includes "Download PDF" button (calls `GET /export/pdf/{file_id}`)

(If you need any component you can add it inside `/components` folder)

## Task:
1. Login and register page navbar (Ojaswee)
2. upload page dashbaord (Paridhi)
3. summary page and api integration (Harshita)