# Future Leaders School - School Management System

The **Future Leaders School Management System** is a desktop-focused application designed to streamline the management of essential school data, including students, parents, teachers, weekly schedules, and important reminders. The application provides a well-organized and efficient platform for school administrators, allowing them to handle data and visualize insights related to the school community.

[View the live project here](https://future-leaders-school.netlify.app)

---

## Table of Contents
- [Features](#features)
- [Technologies & Libraries](#technologies--libraries)
- [Usage](#usage)

---

## Features

This system is built with a range of useful features to simplify school data management:

- **Student, Parents, and Teacher Management**:
  - Add, delete, and update records for students, parents, and teachers.
  - Synchronized addition and removal of students and their associated parents.
  - Filter student, parents, and teacher records by name or class.

- **Class Schedule Management**:
  - View, and filter weekly class schedules from grades 1 to 6.

- **Dashboard Analytics**:
  - View summary statistics for the number of students, parents, teachers, and classes.
  - Visualize student and teacher gender distribution in a pie chart.
  - Display religious demographics of students in a line chart.

- **Event Management**:
  - Add, edit, delete, and track important school events and reminders in an integrated calendar.

- **User Role Management**:
  - Administrators, assistants, and general users can manage or view data based on their roles.
  - New users are given a "guest" role by default, restricting them to read-only access.

---

## Technologies & Libraries

The project is developed using the following technologies and libraries:

- **HTML & CSS**
- **Tailwind CSS** - for utility-first styling
- **JavaScript** - for frontend scripting
- **React** - as the frontend framework
- **Context API** - for global state management across the app
- **React Multi Date Picker** - for enhanced calendar and date selection
- **React Router DOM** - for navigation and route management
- **React Query** - for handling asynchronous data fetching
- **Recharts** - to display line and pie charts on the dashboard
- **Supabase** - as the backend service for:
  - Data storage for students, parents, teachers, and weekly schedules
  - User authentication and role-based access control

## Usage
The following are the primary sections within the app and their main functionalities:

Dashboard:

View analytics, including total counts and distribution charts for students and teachers.
Manage upcoming events and reminders in the calendar view.
Student Management:

Add new student records along with their respective parents.
Filter records by class or name for quick access.
Schedule Management:

Access weekly schedules per grade and filter by grade level.
User Settings:

Update personal information for logged-in users and manage permissions based on their roles.