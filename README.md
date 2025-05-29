<div align="center">
  <h1>🎉 Event Management System 🎭</h1>
  <p>A full-stack web application for managing events, built with React.js, Node.js, Express, and MongoDB</p>
  
  [![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.18.2-000000?logo=express)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-8.0.3-47A248?logo=mongodb)](https://www.mongodb.com/)
</div>

## ✨ Features
- **User Authentication**: Secure login and registration system
- **Event Management**: Create, view, update, and delete events
- **Admin Dashboard**: Manage users, events, and categories
- **Responsive Design**: Works on desktop and mobile devices
- **Image Upload**: Cloudinary integration for event images
- **Real-time Updates**: Dynamic content loading without page refresh

## 🛠 Tech Stack

### Frontend
- React.js 18.2.0
- React Router DOM 6.21.0
- Tailwind CSS 3.3.7
- Axios for API calls
- React Icons
- React Toastify for notifications

### Backend
- Node.js
- Express.js 4.18.2
- MongoDB with Mongoose ODM
- JWT Authentication
- Bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage
- Twilio for notifications (optional)

## 📋 Prerequisites

Before you begin, ensure you have installed the following:
- Node.js (v16 or later)
- npm (v8 or later)
- MongoDB (v6.0 or later)
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neel1112/Event_Management_Project.git
   cd Event_Management_Project
   ```

2. **Install frontend dependencies**
   ```bash
   cd front
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../back
   npm install
   ```

## ⚙️ Configuration

1. **Backend Environment Variables**
   Create a `.env` file in the `back` directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

2. **Frontend Environment**
   Create a `.env` file in the `front` directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

## 🚦 Running the Application

1. **Start the backend server**
   ```bash
   cd back
   npm run dev
   ```

2. **Start the frontend development server**
   ```bash
   cd ../front
   npm start
   ```

3. **Access the application**
   - User Interface: http://localhost:3000
   - Admin Interface: http://localhost:3000/admin

## 📸 Screenshots

### User Interface

#### Home Page
![Home Page](./Images/homepage.jpeg)
The landing page showcases featured events and navigation to different sections.

#### About Page
![About Page](./Images/aboutpage.jpeg)
Information about the event management system and its features.

#### Events Page
![Events Page](./Images/eventpage.jpeg)
Browse and search through all available events.

#### Gallery Page
![Gallery Page](./Images/gallarypage.jpeg)
Visual showcase of past events and activities.

#### Contact Us Page
![Contact Us Page](./Images/contectuspage.jpeg)
Contact form for user inquiries and feedback.

#### User Profile
![Profile Page](./Images/profilepage.jpg)
User profile page showing personal information and registered events.

### Admin Interface

#### Admin Login
![Admin Login](./Images/Admin-login.jpeg)
Secure login page for administrators.

#### Admin Dashboard - User List
![User List - Admin](./Images/userlist-ADMIN%20SIDE.jpeg)
Manage all registered users from the admin panel.

#### Event Management
![Event Post - Admin](./Images/eventpost-ADMIN%20SIDE.jpeg)
Create and manage events from the admin interface.

#### Category Management
![Post Category - Admin](./Images/post%20catagory-ADMIN%20SIDE.jpeg)
Manage event categories and classifications.

#### Admin Profile
![Personal Details - Admin](./Images/personal%20details-ADMIN%20SIDE.jpeg)
Admin profile and account settings.

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Neel Patel** - [GitHub](https://github.com/neel1112)

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- References

---

<div align="center">
  <p>Made with ❤️ using React, Node.js, Express, and MongoDB</p>
</div>

