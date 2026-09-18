\# AI Job Tracker



AI Job Tracker is a full-stack web application for managing job applications and using AI to assist throughout the job-search process.



The application allows users to track applications, monitor their progress through different stages, analyze job descriptions, compare resumes against job requirements, generate interview questions, and receive AI-powered application advice.



\## Features



\### Authentication

\- User registration and login

\- JWT-based authentication

\- Password encryption

\- Protected frontend routes

\- User-specific job application data



\### Job Application Management

\- Add new job applications

\- View application details

\- Edit existing applications

\- Delete applications

\- Search applications by company

\- Filter applications by status

\- Paginated application listing

\- Track application date, salary, location, notes, and job description



\### Dashboard

\- Total application count

\- Applied applications

\- Assessments

\- Interviews

\- Offers

\- Application status visualization

\- Job-search progress overview



\### AI Career Tools

\- Job description analysis

\- Required and preferred skill identification

\- Technology identification

\- Resume-to-job matching

\- Resume match score

\- Matching and missing skill identification

\- AI improvement recommendations

\- Role-specific interview question generation

\- Technical, project, and behavioral interview questions

\- AI-powered application advice



\### User Interface

\- Responsive React interface

\- Dark and light themes

\- Sidebar navigation

\- Reusable job forms and application cards

\- Loading states and toast notifications



\## Tech Stack



\### Frontend

\- React

\- Vite

\- JavaScript

\- React Router

\- Axios

\- Recharts

\- React Toastify

\- CSS



\### Backend

\- Java 21

\- Spring Boot

\- Spring Security

\- Spring Data JPA

\- Hibernate

\- JWT Authentication

\- Maven



\### Database

\- Microsoft SQL Server



\### AI Integration

\- OpenAI Responses API



\## Application Architecture



```text

React Frontend

&#x20;     |

&#x20;     | HTTP / REST API

&#x20;     v

Spring Boot Backend

&#x20;     |

&#x20;     +--------------------+

&#x20;     |                    |

&#x20;     v                    v

SQL Server            OpenAI API

