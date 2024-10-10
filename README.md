# Recipe Sharing Community

## Introduction

A Recipe Sharing Community offering a wide range of recipes to create. Brows easily and securely from the comfort of your home.

## Project Description

Recipe Sharing Community is your go-to platform for browsing a wide variety of recipes. Our user-friendly platform makes it easy and secure to brows your preferred recipes from the comfort of your home. Enjoy seamless browsing experiences and focus on what matters most—enjoying your favorite recipes.

## Features

- **Profile:** Browse and search a wide range of sports venues.
- **Dashboard:** See user information, All bookings and manage booking.
- **Recipe Management:** Cancel bookingh.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Technology Stack

**Frontend:**

- Vite
- Next Js
- React Sonner
- TypeScript
- React Hook Form
- Nextui

**Backend:**

- Node.js
- Express
- TypeScript
- Mongoose

## Installation Guideline

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gandib/recipe-sharing-community-client
   cd recipe-sharing-community-client
   git clone https://github.com/gandib/recipe-sharing-community-server
   cd recipe-sharing-community-server
   ```

2. **Install dependencies:**

   **Frontend:**

   ```bash
   cd client
   npm install
   ```

   **Backend:**

   ```bash
   cd server
   npm install
   ```

3. **Configuration:**

   Create a `.env` file in the root directory of both the frontend and backend projects and add the necessary configuration variables.

   **Frontend .env:**

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   **Backend .env:**

   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_uri
   ```

4. **Run the project:**

   **Frontend:**

   ```bash
   cd client
   npm start
   ```

   **Backend:**

   ```bash
   cd server
   npm start
   ```

## Usage

1. **Access the website:**
   Open your web browser and navigate to Live client site `https://recipe-sharing-community-client.vercel.app`. and live backend site `https://recipe-sharing-community-server.vercel.app`

2. **Browse Recipe:**
   Explore the Recipe and view detailed information.

3. **Create Recipe:**
   Add desired recipe.

4. **Payment:**
   Proceed to Pay, enter payment informations.

5. **Dashboard:**
   View or Manage your Recipes.
