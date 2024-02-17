# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Overview:

This project consists in the development of a frontend payroll application. Users can register, login, view, create, delete time roles.

Technologies used:

Frontend: Reactjs

Main features:

Registration and login:
Implemented a robust registration and login system using JWT authentication for enhanced security. 2. 2. Main feed:

The application displays a dynamic main feed, showing user-generated time roles. Users can view, create, edit and delete any timesheet belonging to them. The records are seamlessly integrated into the employees/clients menu, appearing in the employees view (for clients only) and in the admin view (for administrators only).

Each record contains essential details such as employee name, hourly rate, hours, and total hours to be paid.  Options have been implemented to delete such a record, either as a customer (with some restrictions) or as an administrator.

Use of specific logic to ensure a more structured and easier to maintain code base.

Application of SOLID principles to improve readability and maintainability of the code.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run build
```