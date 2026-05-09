# 🌌 Anime Tracker

A sleek, full-stack web application designed for anime and TV show enthusiasts to easily track their watch progress. Build your personal watchlist, log the exact episodes you're on, organize shows by their current status, and visualize your progress with a premium, cyberpunk-inspired dark theme interface.

## ✨ Features
- **Dynamic Watchlist Dashboard**: Add, edit, and delete shows from your personal library in real-time.
- **Progress Tracking**: Log your exact episode count with visual progress bars that automatically fill up as you get closer to finishing a show.
- **Advanced Filtering**: Instantly filter your library by statuses like *Watching, Completed, On Hold, Dropped,* or *Plan to Watch*.
- **Premium Dark Aesthetic**: A sleek, custom-designed user interface featuring frosted-glass components (glassmorphism), neon gradients, and smooth micro-animations.
- **RESTful API backend**: Fully custom Express.js API to handle all data creation, modification, and deletion.

## 💻 Tech Stack
### Frontend
- **React.js**: Component-based UI library.
- **React Router**: For seamless, single-page application navigation.
- **Axios**: Handling asynchronous API requests.
- **Vanilla CSS3**: Completely custom styling utilizing CSS variables, flexbox/grid layouts, and glassmorphism.

### Backend & Database
- **Node.js & Express.js**: Fast, scalable server architecture for REST API endpoints.
- **MongoDB Atlas**: Cloud-hosted NoSQL database for reliable, persistent data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YourUsername/anime-tracker.git
   ```

2. **Setup the Server:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file inside the `server` directory and add your MongoDB Atlas connection string:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/anime-tracker?retryWrites=true&w=majority
   ```
   Start the backend:
   ```bash
   npm run dev
   ```

3. **Setup the Client:**
   Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   npm install
   npm start
   ```
   The app will open automatically at `http://localhost:3000`.

## 🗺️ Roadmap / Future Enhancements
- **Global Search**: Search for new shows and auto-fill data (like episode counts and cover images) directly from the app.

- *More features to be added as the project grows...*
