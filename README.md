# Amaze Property Management Solutions

A modern, highly responsive web application built for Amaze Property Management Solutions. The project aims to provide an engaging user experience with dynamic animations, sleek design, and comprehensive service details.

## ✨ Features

- **Modern UI/UX**: Designed with rich aesthetics, vibrant colors, glassmorphism, and dynamic animations.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile viewing.
- **Tailwind CSS Integration**: Fully customized styling utility classes for maintainable and scalable UI development.
- **Dynamic Scroll Animations**: Smooth transitions and scroll-triggered animations to improve user engagement.
- **Modular Architecture**: Built with Angular components for easy scalability and maintenance.

## 🛠️ Technology Stack

- **Framework**: [Angular](https://angular.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript, HTML5
- **Node Environment**: Node.js

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nvnpalani/amazepms.git
   ```
2. Navigate to the project directory:
   ```bash
   cd amazepms
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server

Run the following command to start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## 📂 Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── about/          # About Us page
│   │   ├── careers/        # Careers page
│   │   ├── clients/        # Our Clients page
│   │   ├── contact/        # Contact Us page
│   │   ├── footer/         # Global Footer component
│   │   ├── gallery/        # Gallery page
│   │   ├── header/         # Global Header component
│   │   ├── home/           # Landing page
│   │   ├── recruitments/   # Recruitments page
│   │   ├── services/       # Services page
│   │   └── strength/       # Our Strength page
│   ├── app.component.*     # Root component
│   └── app.routes.ts       # Application routing configuration
├── assets/                 # Images, icons, and static assets
├── index.html              # Main HTML file
└── styles.css              # Global styles & Tailwind directives
```

## 📝 Build & Deployment

To build the project for production, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory. Use the `--configuration production` flag for an optimized production build.
