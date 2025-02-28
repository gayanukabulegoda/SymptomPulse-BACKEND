<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/gayanukabulegoda/SymptomPulse-BACKEND.git">
    <img src="/assets/symptompulse-logo.png" alt="SymptomPulse Logo" width="150" height="150">
  </a>

  <h2 align="center">SymptomPulse BACKEND</h2>

  <p align="center">
    Welcome to the <strong>SymptomPulse</strong> backend repository! This Node.js/Express API (powered by TypeScript, Prisma, and MySQL) is the backbone of the SymptomPulse mobile application, which empowers users to check symptoms, receive potential condition insights via the OpenFDA API, manage medications with reminders, and securely track their health history.
    <br />
    <a href="https://github.com/gayanukabulegoda/SymptomPulse-BACKEND/tree/main/src"><strong>Explore the project »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/gayanukabulegoda/SymptomPulse-BACKEND/issues/new?labels=bug">Report Bug</a>
    ·
    <a href="https://github.com/gayanukabulegoda/SymptomPulse-BACKEND/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

---

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <ul>
      <li><a href="#core-features">Core Features</a></li>
      <li><a href="#built-with">Built With</a></li>
    </ul>
    <li><a href="#getting-started">Getting Started</a></li>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation-and-setup">Installation and Setup</a></li>
      <li><a href="#usage">Usage</a></li>
    </ul>
    <li><a href="#api-documentation">API Documentation</a></li>
    <li><a href="#frontend-repository">Frontend Repository</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## About The Project

**SymptomPulse** is a mobile application designed to assist users in monitoring their health by checking symptoms and managing medications effectively. With an intuitive interface and robust backend support, users can easily:

- **Select Symptoms:** Choose from a comprehensive list (e.g., "headache," "fever") to check for potential medical conditions.
- **Receive Condition Insights:** Leverage the OpenFDA API to get possible medical condition suggestions based on the symptoms selected.
- **Manage Medications:** Add and schedule medications with reminders including dosage and timing.
- **Track History:** Securely view and analyze their symptom and medication history.

The backend handles all data processing, API integrations, and user authentication, ensuring a secure and reliable experience.

### Core Features

1. **Symptom Selection & Analysis**  
   Users can select symptoms from a predefined list and get possible medical conditions based on data from the OpenFDA API.

2. **Medication Management**  
   Add medications with detailed reminders (time, dosage) to ensure users never miss a dose.

3. **Secure History Tracking**  
   All user data is stored securely, allowing users to view their symptom and medication history at any time.

4. **Robust Authentication**  
   JSON Web Tokens (JWT) and Bcrypt are utilized to ensure secure user authentication and authorization.

5. **Efficient Data Handling**  
   Built with MySQL and Prisma ORM, the backend provides robust data modeling and management capabilities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Built With

This backend is powered by a modern, scalable stack ensuring robust performance and maintainability:

[![Node.js][node-shield]][node-url]
[![Express.js][express-shield]][express-url]
[![TypeScript][typescript-shield]][typescript-url]
[![Prisma][prisma-shield]][prisma-url]
[![MySQL][mysql-shield]][mysql-url]
[![JWT][jwt-shield]][jwt-url]
[![Bcrypt][bcrypt-shield]][bcrypt-url]
[![Postman][postman-shield]][postman-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started

Follow these instructions to set up the **SymptomPulse BACKEND** on your local machine.

### Prerequisites

1. **Node.js** (v22+ recommended)  
   [Download & Install Node.js](https://nodejs.org/en/download/)
2. **MySQL**  
   [Download & Install MySQL](https://dev.mysql.com/downloads/)
3. **npm or yarn** (npm comes bundled with Node.js)  
   [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
4. **Postman** (optional, for API testing)  
   [Download Postman](https://www.postman.com/downloads/)

### Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/gayanukabulegoda/SymptomPulse-BACKEND.git
   ```
   Navigate into the project directory:
   ```bash
   cd SymptomPulse-BACKEND
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Environment Variables**  
   Create a `.env` file in the root directory and add the following configuration:
   ```bash
   DATABASE_URL="mysql://<username>:<password>@localhost:3306/symptompulse_db"
   JWT_SECRET="your_jwt_secret_key"
   JWT_EXPIRES_IN="7d"  # adjust as necessary
   PORT=5000
   NODE_ENV=development
   CURRENT_API_VERSION = "v1"
   CLIENT_URL = "http://localhost:8081"
   OPENFDA_API_URL="https://api.fda.gov/drug/event.json"
   ```
   Adjust the values based on your local or production environment.

4. **Database Setup with Prisma**  
   Run the Prisma migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
   ```
   This will synchronize your MySQL database with the schema defined in `prisma/schema.prisma`.

### Usage

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   The server should now be running at [http://localhost:5000](http://localhost:5000).

2. **Build & Run for Production**
   ```bash
   npm run build
   npm start
   ```
   or
   ```bash
   yarn build
   yarn start
   ```
   This compiles the TypeScript code to JavaScript and starts the production server.

3. **Testing** (if applicable)  
   To run tests:
   ```bash
   npm run test
   ```
   or
   ```bash
   yarn test
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## API Documentation

Detailed API documentation—including endpoints, request/response formats, and sample payloads—is available via our [Postman Collection](https://documenter.getpostman.com/view/36681432/2sAYdhJqGj).

- Ensure the server is running before making requests.
- The Postman documentation provides all necessary information to integrate and test the API effectively.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Frontend Repository

The frontend for SymptomPulse is built with modern web technologies. For more information, please visit the **SymptomPulse FRONTEND** repository:
- [SymptomPulse FRONTEND](https://github.com/gayanukabulegoda/SymptomPulse-FRONTEND.git)

---

## License

Distributed under the **MIT License**. See [`LICENSE`](https://github.com/gayanukabulegoda/SymptomPulse-BACKEND/blob/main/LICENSE) for more details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

<div align="center">
  <p>
    &copy; 2025 <a href="https://grbulegoda.me/" target="_blank">Gayanuka Bulegoda</a>
  </p>
</div>

---

<!-- MARKDOWN LINKS & IMAGES -->
[node-shield]: https://img.shields.io/badge/Node.js-black?style=for-the-badge&logo=node.js&logoColor=green
[node-url]: https://nodejs.org/
[express-shield]: https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express&logoColor=white
[express-url]: https://expressjs.com/
[typescript-shield]: https://img.shields.io/badge/TypeScript-black?style=for-the-badge&logo=typescript&logoColor=3178C6
[typescript-url]: https://www.typescriptlang.org/
[prisma-shield]: https://img.shields.io/badge/Prisma-black?style=for-the-badge&logo=prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[mysql-shield]: https://img.shields.io/badge/MySQL-black?style=for-the-badge&logo=mysql&logoColor=white
[mysql-url]: https://www.mysql.com/
[jwt-shield]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[jwt-url]: https://jwt.io/
[bcrypt-shield]: https://img.shields.io/badge/Bcrypt-black?style=for-the-badge&logo=bcrypt&logoColor=white
[bcrypt-url]: https://github.com/kelektiv/node.bcrypt.js
[postman-shield]: https://img.shields.io/badge/Postman-black?style=for-the-badge&logo=Postman&logoColor=FF7139
[postman-url]: https://www.postman.com/