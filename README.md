# Secure Software Development Assignment

Royal Academy Education Institute is an institute management system designed to manage institute educational activities efficiently. This is a web-based application that was developed mainly based on eight functions, including user management, financial management, enrollment and attendance management, class management, lesson material management, timetable management, salary management, Q&A and feedback management. Through the use of the Royal Academy Education Institute, it helps students and teachers interact in a convenient manner, and it also helps managers and administrators manage institute tasks effectively and reliably. . We are using the MERN stack to implement this project. We are using the MERN stack to implement this project.


## Installation

Backend

```bash
  cd frontend
  npm install 
```

Frontend

```bash
  cd server
  npm install 
```

Main File

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Documentation

[Report](https://mysliit-my.sharepoint.com/:b:/g/personal/it22004390_my_sliit_lk/EWQ7SujIFt1Fqkrz5ABYc2kBrgsrqkJWM2IlqZRJZS6j_g?e=AvHjxr)
[Youtube Video Link](https://youtu.be/8LrqlxDtooQ?si=2MhpWB2rIm6iWl97)
[GitHub Repository Link (Selected Project)](https://github.com/Eshmika/Royal_institute.git)
[ZAP Report to identify the vulnerabilities](https://mysliit-my.sharepoint.com/:b:/g/personal/it22004390_my_sliit_lk/EdhFq4tmvX5JmuUPokL_WTsBFqxmThd8SQFLAatOHbFiBQ?e=YUFh26)
[ZAP Report to after fixing the vulnerabilities](https://mysliit-my.sharepoint.com/:b:/g/personal/it22004390_my_sliit_lk/Ec0RBFXI2odLreAH02KEGmUBFifCVoPUIb7hWZnMxnXyMQ?e=WSrdJG)

## Group ID: 37

- IT22315632 - Rajapaksha R N D K 
- IT22358684 - Jayasooriya J K B A P  
- IT22341136 - Gunathilaka M A S 
- IT22004390 - Hettiarachchi E I   

## Security Vulnerabilities Identified

- Content Security Policy (CSP) Header Not Set
- Cross-Domain Misconfiguration (CORS Issues) 
- Missing Anti-Clickjacking Header 
- Cookie Missing HttpOnly Flag
- Cookies Without SameSite Attribute 
- Server Leaks Information via "X-Powered-By" HTTP Header 
- X-Content-Type-Options Header Missing
- Missing Authentication 