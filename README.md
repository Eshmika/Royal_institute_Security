# Royal_institute_Security

Royal Academy Education Institute is an institute management system designed to manage institute educational activities efficiently. This is a web-based application that was developed mainly based on eight functions, including user management, financial management, enrollment and attendance management, class management, lesson material management, timetable management, salary management, Q&A and feedback management. Through the use of the Royal Academy Education Institute, it helps students and teachers interact in a convenient manner, and it also helps managers and administrators manage institute tasks effectively and reliably. . We are using the MERN stack to implement this project. We are using the MERN stack to implement this project.

## CORS hardening

- Server now enforces a CORS allowlist using `CORS_ORIGINS` (comma-separated), defaulting to `http://localhost:3000`. Examples:

PowerShell (current session only):

```powershell
$env:CORS_ORIGINS = "http://localhost:3000,https://yourdomain.example"
```

CMD:

```bat
set CORS_ORIGINS=http://localhost:3000,https://yourdomain.example
```

- Frontend dev server (CRA on port 3000) is configured via `frontend/craco.config.js` to avoid sending `Access-Control-Allow-Origin: *`. Use `npm start` from `frontend/` to apply this behavior.

### Verify locally

Use curl to check headers:

```
curl -i http://localhost:5000/ -H "Origin: http://localhost:3000"
curl -i http://localhost:3000/ -H "Origin: http://localhost:3000"
```

Expected: No wildcard `Access-Control-Allow-Origin: *`. Server should reflect allowed origin or block.

## Anti-clickjacking (dev server)

- The React dev server on port 3000 now sets anti-clickjacking headers via `frontend/craco.config.js`:
  - `X-Frame-Options: SAMEORIGIN`
  - `Content-Security-Policy: frame-ancestors 'self'`

Verify with:

```powershell
curl.exe -i http://localhost:3000/ | findstr /I "x-frame-options content-security-policy"
```

## Private IP disclosure

- Dev build source maps are disabled via `frontend/craco.config.js` to reduce risk of private IPs being embedded in `bundle.js`.
- Dev server host and HMR WebSocket hostname are pinned to `localhost`.

Verify with:

```powershell
curl.exe http://localhost:3000/static/js/bundle.js | findstr /R "\<10\.[0-9]\|\<192\.168\.|\<172\.(1[6-9]|2[0-9]|3[0-1])\."
```

Expected: no matches.

## Suppress X-Powered-By

- The API server disables Express’ `X-Powered-By` via `app.disable('x-powered-by')`.
- The CRA dev server (port 3000) removes `X-Powered-By` in `frontend/craco.config.js` using `setupMiddlewares`.

Verify:

```powershell
curl.exe -i http://localhost:5000/ | findstr /I "x-powered-by"
curl.exe -i http://localhost:3000/ | findstr /I "x-powered-by"
```

Expected: no `X-Powered-By` header in either response.

## Private IP disclosure (dev)

Some dev setups embed the local network IP in the webpack dev server client (HMR) code, which can appear in `http://localhost:3000/static/js/bundle.js`.

Mitigation added:

- `frontend/craco.config.js` forces dev server `host` and client WebSocket hostname to `localhost`.
- `frontend/.env.development` sets `HOST` and `WDS_SOCKET_HOST` to `localhost`.

Verify:

- Start the frontend with `npm start` in `frontend/`.
- Fetch the bundle and search for private IPs:
  ```powershell
  curl.exe -s http://localhost:3000/static/js/bundle.js | Select-String -Pattern '10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.'
  ```
  Expect no matches.

# SLIIT-Y2S2-ITPproject-Royal_institute

Royal Academy Education Institute is an institute management system designed to manage institute educational activities efficiently. This is a web-based application that was developed mainly based on eight functions, including user management, financial management, enrollment and attendance management, class management, lesson material management, timetable management, salary management, Q&A and feedback management. Through the use of the Royal Academy Education Institute, it helps students and teachers interact in a convenient manner, and it also helps managers and administrators manage institute tasks effectively and reliably. . We are using the MERN stack to implement this project. We are using the MERN stack to implement this project.

## Installation

Backend

```bash
  npm install bcrypt@^5.1.1
  npm install cookie-parser@^1.4.6
  npm install cors@^2.8.5
  npm install dotenv@^16.4.5
  npm install express@^4.19.2
  npm install jsonwebtoken@^9.0.2
  npm install mongoose@^8.3.1
  npm install nodemon@^3.1.0
  npm i multer
  npm i react-pdf
  npm i path
```

Frontend

```bash
  npm install @fortawesome/fontawesome-svg-core@^6.5.1
  npm install @fortawesome/free-solid-svg-icons@^6.5.1
  npm install @fortawesome/react-fontawesome@^0.2.0
  npm install @heroicons/react@^2.1.1
  npm install @testing-library/jest-dom@^5.17.0
  npm install @testing-library/react@^13.4.0
  npm install @testing-library/user-event@^13.5.0
  npm install axios@^1.6.8
  npm install html2canvas@^1.4.1
  npm install jspdf@^2.5.1
  npm install jspdf-autotable@^3.8.2
  npm install react@^18.2.0
  npm install react-big-calendar@^1.11.3
  npm install react-dom@^18.2.0
  npm install react-hot-toast@^2.4.1
  npm install react-icons@^5.0.1
  npm install react-router-dom@^6.22.3
  npm install react-scripts@^5.0.1
  npm install web-vitals@^2.1.4
  npm i react-to-print
  npm install sweetalert2
  npm i react-toastify
  npm i react-transition-group
  npm install @react-pdf/renderer
```

Main File

```bash
  npm i concurrently
```

Start the server

```bash
  npm run dev
```

## Documentation

[Final Report](https://mysliit-my.sharepoint.com/:b:/g/personal/it22004390_my_sliit_lk/EUUtSldM0eJHnle3oDt_JbwB8sWs95ROkxjIZKtOkCFcOw?e=6ANSDc)

## Authors

- [@Eshmika Hettiarachchi](https://github.com/Eshmika)
- [@Tishan Perera](https://github.com/TishanPerera)
- [@Ashan Gunathilaka](https://github.com/AshanGunathilaka)
- [@Samudra W](https://github.com/SamudraW)
- [@Kaveesha Nimanji](https://github.com/nimanjik)
- [@Venuja B](https://github.com/VenujaB)
- [@Dinusanka Gayashan](https://github.com/Dinusanka)
- [@Sasindu Diluranga](https://github.com/Wolferlk)

## Screenshots

![Website Screenshot1](https://github.com/Eshmika/Royal_institute/blob/db779ac34ecfeebafa2ce0b09fb9113f07302dfe/Documentation/screenshot1.png)
![Website Screenshot2](https://github.com/Eshmika/Royal_institute/blob/db779ac34ecfeebafa2ce0b09fb9113f07302dfe/Documentation/screenshot2.png)
![Website Screenshot3](https://github.com/Eshmika/Royal_institute/blob/db779ac34ecfeebafa2ce0b09fb9113f07302dfe/Documentation/screenshot3.png)
