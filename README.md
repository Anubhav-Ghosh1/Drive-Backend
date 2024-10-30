# Backend Project - Google Drive

This project is a backend application that mimics Google Drive functionality, allowing users to register, upload, manage, and search files. Built using **Node.js**, **Express**, **MongoDB**, and **Cloudinary**, it provides secure file handling with **JWT authentication**.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [File Routes](#file-routes)

## Technologies Used
- Node.js
- Express
- MongoDB
- JWT for authentication
- Cloudinary for file storage
- Multer for file upload handling

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   
2. **Install Dependencies**
    ```bash
    npm install
    ```

## Environment Variables

The following environment variables are required for the application to function correctly. Create a `.env` file in the root directory of your project and add the variables as shown below:

| Variable                  | Description                                      |
|---------------------------|--------------------------------------------------|
| `MONGO_URI`               | MongoDB connection URI                           |
| `JWT_SECRET`              | Secret key used for signing JWT tokens           |
| `CLOUDINARY_CLOUD_NAME`   | Cloudinary cloud name                            |
| `CLOUDINARY_API_KEY`      | Cloudinary API key                               |
| `CLOUDINARY_API_SECRET`   | Cloudinary API secret                            |

### Example `.env` file
```plaintext
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

## API Endpoints

This section outlines the available API endpoints for user and file management.

### User Routes

| Method | Endpoint                     | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/api/user/register`          | Register a new user             |
| POST   | `/api/user/login`             | Login and get access token      |
| GET    | `/api/user/refreshToken`      | Refresh access token            |
| PATCH  | `/api/user/changePassword`    | Change current password         |
| GET    | `/api/user/getCurrentUser`    | Retrieve current user information|
| PATCH  | `/api/user/updateAccountDetails` | Update user details         |
| PATCH  | `/api/user/updateUserAvatar`  | Update user avatar              |

### File Routes

| Method | Endpoint                  | Description                  |
|--------|----------------------------|------------------------------|
| POST   | `/api/file/uploadFile`     | Upload a new file           |
| PATCH  | `/api/file/editFileName`   | Edit file name              |
| DELETE | `/api/file/deleteFile`     | Delete a file               |
| GET    | `/api/file/searchFile`     | Search files by name        |
| GET    | `/api/file/getFileByUser`  | Retrieve files for the current user |

## Technologies Used

This project utilizes the following technologies:

- **Node.js**: JavaScript runtime for building scalable server-side applications.
- **Express**: Web framework for Node.js, designed for building APIs and web applications.
- **MongoDB**: NoSQL database for storing user and file data.
- **Cloudinary**: Media management service for uploading and storing files.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.
- **Multer**: Middleware for handling file uploads in Express.
- **Bcrypt**: Library for hashing passwords.
- **Dotenv**: Module for loading environment variables from a `.env` file.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
