# 🚀 Freelance Task Marketplace

A full-stack web platform that helps individuals find freelancers for small tasks and freelancers to find work opportunities. Users can post tasks, bid on tasks, and manage their posted tasks seamlessly.

## 🔗 Live Site URLs

- **Client:** [https://freelance-task-client.netlify.app](https://freelance-task-client.netlify.app)
- **Server:** [https://freelance-task-server.vercel.app](https://freelance-task-server.vercel.app)

---

## 📌 Features

- 🔒 **Authentication & Authorization**
  - Email/password & Google-based login
  - Protected routes for task management

- 📝 **Task Management (CRUD)**
  - Post, update, delete tasks
  - Only task owners can update/delete their tasks

- 🔍 **Task Browsing & Details**
  - Browse all available tasks
  - See task details and bid on tasks

- 📊 **User Dashboard**
  - View tasks posted by the user
  - Track bids, update and delete tasks

- 📅 **Deadline Sorting & Filtering**
  - Tasks are sorted by the nearest deadlines first
  - Limited display for featured tasks on the home page

---

## 🖼 Pages & Routes

| Page                | Route               | Protection     |
|---------------------|---------------------|----------------|
| Home                | `/`                 | Public         |
| Add Task            | `/add-task`         | Protected      |
| Browse Tasks        | `/browse-tasks`     | Public         |
| Task Details        | `/task/:id`         | Protected      |
| My Posted Tasks     | `/my-posted-tasks`  | Protected      |
| Update Task         | `/update/:id`       | Protected      |
| Login               | `/login`            | Public         |
| Register            | `/register`         | Public         |
| 404 Not Found       | `*`                 | Public         |

---

## 📱 Responsiveness

The site is fully responsive and optimized for:

- Mobile phones
- Tablets
- Desktop devices

---

## ⚙️ Technologies Used

### Client (React)
- React Router DOM
- Firebase Authentication
- Tailwind CSS + DaisyUI
- React Toastify
- Lottie-React (optional animation)

### Server (Node + Express)
- Express.js
- MongoDB Native Driver
- dotenv for env config
- Vercel Deployment

---

## 🔐 Environment Variables

Create a `.env` file in both `client/` and `server/` directories:

### Client:
