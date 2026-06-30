# 💻 Installation & Local Development

This guide will walk you through setting up FullStack Compass on your local machine for development, testing, or contributing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

---

## 🚀 1. Clone the Repository

First, clone the project to your local machine and navigate into the root directory:

```bash
git clone https://github.com/Sanzzz1125/fullStackCompass.git
cd fullStackCompass
```

---

## 🎨 2. Running the Frontend (React + Vite)

The frontend is a standalone React application located in the `client` folder.

1. **Navigate to the client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open your browser and navigate to `http://localhost:5173`. The Vite server features hot-reloading, so any changes you make to the code will instantly reflect in the browser.

---

## ⚙️ 3. Running the Backend (Express + MongoDB) (Optional)

Currently, the production version of FullStack Compass runs smoothly as a frontend-only application. However, if you wish to work on the API or connect a real database, you can run the backend server.

1. **Navigate to the server directory**:
   ```bash
   # Assuming you are in the root directory
   cd server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   You must provide your own MongoDB database to run the server.
   
   - Rename the provided `.env.example` file to `.env`:
     ```bash
     mv .env.example .env
     ```
   - Open the new `.env` file in your code editor.
   - Replace `<your-username>` and `<your-password>` with your actual MongoDB Atlas credentials.
   
   *Note: Do not worry about committing your password. The `.env` file is safely ignored by Git.*

4. **Start the backend server**:
   ```bash
   npm start
   # or run with nodemon for hot-reloading:
   npm run dev
   ```

5. **Verify**:
   You should see `✅ MongoDB connected` and `Server running on port 5000` in your terminal.

---

## 🚢 4. Deployment Instructions

This project is optimized for deployment on **Vercel**.

1. Create an account on [Vercel](https://vercel.com).
2. Connect your GitHub account and select this repository.
3. In the project settings, set the **Root Directory** to `client`.
4. Vercel will automatically detect the Vite framework and run `npm run build`.
5. The deployment will utilize the custom `vercel.json` rewrite rules to handle React Router navigation perfectly.
