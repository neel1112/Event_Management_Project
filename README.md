# Event Management System

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.18.2-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-8.0.3-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.7-06B6D4?logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

## 🌟 Overview

A full-stack event management system built with React, Node.js, Express, and MongoDB. This platform allows users to browse events, register for them, and manage their profiles. Administrators can manage events, users, and view analytics.

## 📱 Screenshots

### User Interface

#### Home Page
![Home Page](./images/homepage.jpeg)
*Welcome to the Event Management System*

#### Events Page
![Events Page](./images/eventpage.jpeg)
*Browse and discover upcoming events*

#### Gallery
![Gallery](./images/gallarypage.jpeg)
*View photos from past events*

#### About Us
![About Us](./images/aboutpage.jpeg)
*Learn more about our mission and team*

#### Contact Us
![Contact Us](./images/contectuspage.jpeg)
*Get in touch with our team*

#### User Profile
![User Profile](./images/profilepage.jpg)
*Manage your personal information and event registrations*

### Admin Panel

#### Admin Login
![Admin Login](./images/Admin-login.jpeg)
*Secure admin authentication*

#### Dashboard
![User Management](./images/userlist-ADMIN%20SIDE.jpeg)
*Manage system users and their permissions*

#### Event Management
![Event Management](./images/eventpost-ADMIN%20SIDE.jpeg)
*Create and manage events*

#### Category Management
![Category Management](./images/post%20catagory-ADMIN%20SIDE.jpeg)
*Organize events into categories*

#### User Details
![User Details](./images/personal%20details-ADMIN%20SIDE.jpeg)
*View and manage user information*

## 🚀 Features

### Frontend
- **User Authentication** - Login/Register functionality with JWT
- **Event Management** - Browse, filter, and search events
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Interactive UI** - Modern and intuitive user interface
- **Real-time Updates** - Dynamic content loading and updates

### Backend
- **RESTful API** - Well-structured API endpoints
- **Authentication** - Secure JWT-based authentication
- **File Upload** - Image upload using Cloudinary
- **Database** - MongoDB with Mongoose ODM
- **Security** - CORS, rate limiting, and input validation

## 🎥 Demo

Experience the application in action:
- **User Interface**: [Live Demo](#) (Coming Soon)
- **Admin Panel**: [Admin Demo](#) (Contact for access)

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher) or yarn
- MongoDB Atlas account or local MongoDB installation
- Cloudinary account (for image uploads)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-system.git
cd event-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd back

# Install dependencies
npm install

# Create a .env file in the back directory with the following variables:
cp .env.example .env

# Edit the .env file with your configuration
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../front

# Install dependencies
npm install

# Create a .env file in the front directory
# Add your environment variables (e.g., REACT_APP_API_URL)
```

## ⚙️ Environment Variables

### Backend (.env)
```env
PORT=4597
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:4597
```

## 🚦 Running the Application

### Development Mode

1. Start the backend server:
   ```bash
   cd back
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   cd front
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the frontend for production
cd front
npm run build

# The built files will be in the `build` directory
```

## 📂 Project Structure

```
event-management-system/
├── back/                    # Backend server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   ├── app.js          # Express app configuration
│   │   └── index.js        # Server entry point
│   └── package.json
│
└── front/                   # Frontend React app
    ├── public/             # Static files
    └── src/
        ├── assets/        # Images, fonts, etc.
        ├── components/     # Reusable UI components
        ├── pages/          # Page components
        ├── services/       # API services
        ├── styles/         # Global styles
        ├── utils/          # Helper functions
        ├── App.js          # Main App component
        └── index.js        # React entry point
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/users/register` - Register a new user
- `POST /api/v1/users/login` - User login
- `GET /api/v1/users/me` - Get current user profile

### Events
- `GET /api/v1/events` - Get all events
- `GET /api/v1/events/:id` - Get event by ID
- `POST /api/v1/events` - Create new event (Admin only)
- `PUT /api/v1/events/:id` - Update event (Admin only)
- `DELETE /api/v1/events/:id` - Delete event (Admin only)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">
  Made with ❤️ by Neel Patel
</div>
