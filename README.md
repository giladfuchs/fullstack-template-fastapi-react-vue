# Full Stack Template

This is a full stack web application template built with:

- **FastAPI** (Python) backend
- **Vue 3** and **React** frontends — both written in **TypeScript**, with similar structure and design but implemented as **standalone apps**
- **PostgreSQL** database
- **Docker Compose** for full environment orchestration

---

## 🌐 Live View

- [React Frontend ](https://fullstack-template-react.vercel.app/)
- [Vue Frontend ](https://fullstack-template-vue.vercel.app/)
- [FastAPI Backend Docs  ](https://full-stack-api.fly.dev/docs)
---

## Features

This template is designed to manage a complete **teacher-student-assignment workflow**:

- **Teacher login** and dashboard
- **Students list** per teacher, with:
  - Add / Edit / Delete controls
  - Access to student profile
- **Student profile page** including:
  - Full CRUD for **assignments**

## Run the Project
```bash
cd docker
docker-compose up --build
```

### Service URLs

- **React frontend** → [http://localhost:3040](http://localhost:3040)  
- **Vue frontend** → [http://localhost:3030](http://localhost:3030)  
- **Backend API** (FastAPI) → [http://localhost:5001](http://localhost:5001)  
- **PostgreSQL** → `localhost:5434`


---

## 🤝 Contributing

Contributions are welcome!  
If you find this project useful, consider giving it a ⭐ on GitHub — it helps others discover it!

To contribute, fork the repository and submit a pull request with your enhancements or bug fixes.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
