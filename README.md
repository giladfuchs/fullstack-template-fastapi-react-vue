# Full Stack Template

This is a full stack web application template built with:

- **FastAPI** (Python 3.13) backend  
- **Vue 3.5** and **React 19** frontends — both written in **TypeScript**, with similar structure and design but implemented as standalone apps  
- **PostgreSQL** database  

---

##  Live Preview

- [React Frontend ](https://fullstack-template-react.vercel.app/)
- [Vue Frontend ](https://fullstack-template-vue.vercel.app/)
- [FastAPI Backend Docs  ](https://full-stack-api.fly.dev)
---
## Why use this template?

This project is a clean starting point for any full stack application.  
It includes everything you need to get moving quickly, without extra setup:

### Frontend
- Dynamic tables: two ready-made table components that automatically adapt to your models.  
- Generic form system: add and edit any model through a single reusable form component.  
- View component: a reusable design for displaying model details.  
- Login component: a ready-made login flow.  
- Customization: choose theme color, RTL or LTR direction, language, fonts, and more.  

### Backend
- Dynamic routes: adapt quickly to any model, including the authentication model.  
- Relational tables: models are linked with foreign keys and structured hierarchically, so each parent can access only their own child and subchild (multi-tenant style).  
- Dynamic queries: query any model through the API by passing filters directly.  
- Validation: request bodies are fully validated in add and edit routes before saving to the database.  

---

## How it works

This template demonstrates a complete **teacher → student → assignment** workflow.  

- On entry, you see the login screen. You can either select an existing teacher from the list at the bottom and log in with their credentials, or click the plus icon to add a new teacher.  
- After login, the teacher dashboard shows a table of that teacher’s students only.  
- From the dashboard you can:
  - View a student’s profile (eye icon) or hover to preview their tasks.  
  - Add new students with the plus button.  
- Inside a student profile you can manage everything related to that student: edit details, and add or edit tasks.  


---

## Tech Stack

### Frontend

###  [`Vue 3.5 + TypeScript`](vue3)  

- Vuetify 3  
- Pinia  
- AG Grid + vue3-easy-data-table  
- Vue I18n  

###  [`React 19 + TypeScript`](react)  
- MUI 7  
- Redux Toolkit  
- AG Grid + MUI Table  
- React Intl  
- Formik + Yup  

### Backend [`fastapi-postgres`](fastapi-postgres)
- FastAPI (fully async) with SQLModel  
- Pydantic v2  
- JSON Web Token (JWT) authentication  
- Pytest setup for async API testing

### Dev & Deployment
-  Run locally with [`Docker`](docker/docker-compose.yaml)
- Example [`GitHub Action `](.github/workflows/deploy.yml) included for CI/CD setup  
 
---


## Run locally with Docker
To run the entire stack with Docker, use:

```bash
cd docker
docker-compose up --build
```

You will get the following URLs:

- **React frontend** → [http://localhost:3366](http://localhost:3366)  
- **Vue frontend** → [http://localhost:3355](http://localhost:3355)  
- **Backend API (FastAPI)** → [http://localhost:5001](http://localhost:5001)  
- **PostgreSQL** → `localhost:5434`  

---
## Run locally without Docker

### For each frontend app (`/react` or `/vue3`):


```bash
pnpm install
pnpm start
```

**Check the package.json scripts for additional commands, such as running the linter or building for production.**

---
### Run Python backend locally

```bash
docker run --name fullstack-template-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=postgres -e POSTGRES_INITDB_ARGS="--auth=md5" -p 5434:5434 -v postgres_data_fullstack_template:/var/lib/postgresql/data -d postgres:17 postgres -p 5434
```

```bash
#install
python -m venv venv
source venv/bin/activate   # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
#run
python debug.py   # or: uvicorn main:app --reload

```
 

Make sure your `DATABASE_URL` is set correctly in `.env` (or simply use the PostgreSQL instance started by Docker Compose).

An example `.env` file might look like this:

```bash
DATABASE_URL=postgresql+psycopg://user:password@localhost:5434/postgres
USER_LOCAL=your_computer_username   # e.g. value from os.getenv("USER")

```


---

## 🤝 Contributing

Contributions are welcome!  
If you find this project useful, consider giving it a ⭐ on GitHub — it helps others discover it!

To contribute, fork the repository and submit a pull request with your enhancements or bug fixes.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
