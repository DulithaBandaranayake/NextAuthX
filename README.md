# Next.js Authentication System

This project is a **Next.js** application that provides a complete user authentication system. It includes features such as **login**, **signup**, **email verification**, and **password reset**. It uses **MongoDB** for database management, **Mailtrap** for email handling, and modern practices for **error handling** and **token management**.

---

## Features

- **User Authentication**:
  - Signup with email and password.
  - Secure login with token-based authentication.
- **Email Verification**:
  - Send email verification links using Mailtrap.
  - Validate and activate accounts via email.
- **Password Reset**:
  - Securely request and reset passwords through email.
- **Error Handling**:
  - Modern and descriptive error messages.
  - Graceful handling of invalid requests.
- **Token Management**:
  - Secure token generation for authentication and verification.
  - Token expiration and validation.

---

## Prerequisites

Before starting, ensure you have:

1. **Node.js** installed (version 16 or above recommended).
2. **MongoDB** account or local setup.
3. **Mailtrap** account for testing email functionality.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DulithaBandaranayake/NextAuthX.git
   cd NextAuthX
   ```

2. **Install dependencies** (use `--force` if necessary):
   ```bash
   npm install --force
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
    MONGO_URI=<mongodb compass url>
    TOKEN_SECRET=<your secret key>
    DOMAIN=<https://localhost:3000>
    MAILTRAP_USER=<mailtrap json username>
    MAILTRAP_PASS=<mailtrap json password>
   ```

4. **Set up MongoDB**:
   - Create a database and collection in MongoDB for user data.

5. **Set up Mailtrap**:
   - Sign up at [Mailtrap](https://mailtrap.io/) and create an inbox.
   - Use the SMTP credentials provided in the inbox settings.

6. **Run the development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Folder Structure

```
.
├── public           # Images
├── app
│   ├── api          
│   ├── users        # API routes for authentication logic
├── pages            
├── dbConfig         # Databse Handling
├── helper           # Models
├── middleware       # Middleware for authentication
├── .env.local       # Environment variables
└── README.md        # Project documentation
```

---

## How It Works

1. **Signup**:
   - User provides email and password.
   - Verification email is sent via Mailtrap.

2. **Login**:
   - User logs in with verified credentials.
   - A token is issued for session management.

3. **Email Verification**:
   - Email contains a unique link with a token.
   - Token is validated on the server to activate the user.

4. **Password Reset**:
   - User requests a password reset email.
   - Reset link with a token is sent to the user's email.

5. **Error Handling**:
   - Invalid inputs and expired tokens return descriptive errors.
   - Custom error handling ensures a smooth user experience.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## About the Developer

This project is developed by **Dulitha Bandaranayake**.  
Feel free to reach out or contribute to improve this project further!

---

## License

This project is open for contributions and does not include any restrictions on usage. Please attribute any modifications or enhancements appropriately.