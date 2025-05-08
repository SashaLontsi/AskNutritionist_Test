# AskNutritionist

A containerized Next.js app built with TypeScript, TailwindCSS, and Docker.

## Features

- **TypeScript & ESLint:** Robust setup for type safety and code quality.
- **TailwindCSS:** Custom theme with responsive UI components.
- **Docker & Docker Compose:** Easily run the app in a containerized environment.
- **Pages:** Home, About, Contact, and Chat (integrated for AI interactions).
- **Fully Responsive Design:** Optimized for desktop and mobile.
- **Modern UI Implementation:** Complete overhaul of the user interface (currently on the "#2-Arslan" branch).

## How to Run This Project Locally

### 1. Prerequisites

Ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (if you prefer running without Docker)

### 2. Clone the Repository 

git clone https://github.com/SashaLontsi/AskNutritionist.git
cd AskNutritionist

## 3. Set up environment variables:
   - Create a `.env.local` file in the root directory of the project. This file is required for environment-specific settings (such as API keys, database URLs, etc.).
   - Use the following template as a starting point:

   ```env
   # .env.local example
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_here
   OPENAI_API_KEY=your_openai_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   # Add any other environment variables the app needs
   ```
   ## Note: 
   Do not commit your `.env.local` file to version control, as it may contain sensitive information.

## 4. Start the project with Docker
docker compose up

This will build the Docker image (if not already built) and start the Next.js app inside the container.

## 5. Open in your browser

[Go to http://localhost:3000](http://localhost:3000)

This opens the app in your default browser.

## 6. Running with npm (Alternative)
If you prefer running the app locally without Docker, you can use npm.

Install Dependencies
Make sure to install the dependencies first:

npm install
Start the Development Server
Run the development server with:

npm run dev
Then, open your browser and navigate to:

http://localhost:3000