# Notes Manager App

A full-stack MERN application for managing personal notes with secure user authentication, image uploads, and dark mode support.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

## Demo Video 
*[(https://drive.google.com/file/d/1r38GvXXHt7WYiUV9y90IJ0U1Nrj7gtnq/view?usp=drive_link)]*

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [License](#license)

## Features

### Authentication & Security
- **User Registration & Login** with JWT-based authentication
- **JWT Expiry Handling** with auto-logout and session timeout warnings
- **Password Encryption** using bcryptjs
- **Protected Routes** - only authenticated users can access their notes

### Notes Management
- **Create Notes** with rich text content and optional images
- **Read Notes** in a beautiful card-based layout
- **Update Notes** with inline editing capabilities
- **Delete Notes** with confirmation dialogs
- **Image Support** - upload and display images with notes
- **Tags System** - organize notes with customizable tags

### Search & Organization
- **Real-time Search** across note titles, content, and tags
- **Tag Filtering** - filter notes by specific tags
- **Quick Access** to recently created and updated notes

### User Experience
- **Dark Mode** - toggle between light and dark themes
- **Responsive Design** - optimized for desktop, tablet, and mobile
- **Image Previews** - visual preview before uploading images
- **Loading States** - smooth loading animations and feedback
- **Error Handling** - user-friendly error messages

### Responsive Design
- **Mobile-First** approach with responsive grid layout
- **Touch-Friendly** interfaces for mobile devices
- **Cross-Browser** compatibility

## Tech Stack

### Frontend
- **React.js** - UI library for building user interfaces
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Context API** - State management for auth and theme
- **CSS3** - Custom CSS with CSS Variables for theming

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload middleware
- **Bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### Development Tools
- **Concurrently** - Run multiple commands concurrently
- **Nodemon** - Auto-restart server during development
- **Git** - Version control



## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- Git

### Step-by-Step Setup

1. **Clone the repository**
   ```bash
   git clone 
   cd notes-manager-app
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-all
   ```


4. **Run the application**
   ```bash
   # Development mode (both frontend and backend)
   npm run dev

   # Backend only
   npm run server

   # Frontend only
   npm run client
   ```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Your Name**
- GitHub: [Maryam Tariq](https://github.com/MaryamTariq-1)
- LinkedIn: [Maryam Tariq](https://www.linkedin.com/in/maryamtariq1/)



### Built by Maryam Tariq using the MERN Stack

