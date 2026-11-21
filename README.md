# SAMBI-SHOP

A responsive fashion e-commerce web application that makes it easier for customers to explore clothing and shoes for men, women, and babies.

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-purple?logo=vite)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## Live Demo

Live Website: To be added after deployment.

GitHub Repository: https://github.com/tuyizeresandra3-byte/SAMBI-SHOP

## Screenshots

Add screenshots of your finished application here.

Suggested screenshots:
- Homepage and navigation
- Product catalogue
- Product details
- Shopping cart and checkout
- Wishlist
- Admin dashboard

Example:

```markdown
![SAMBI-SHOP Homepage](./public/images/homepage.png)
```

## Project Overview

SAMBI-SHOP is a fashion e-commerce project developed as part of my frontend development learning journey.

The application provides a digital shopping experience where customers can browse products, search for items, explore product details, manage their shopping cart, and place demo orders.

The project also includes an administration dashboard for managing products, inventory, and customer orders.

## Problem Statement

Customers need a convenient way to explore fashion products and manage their shopping experience online.

SAMBI-SHOP aims to provide a simple, accessible, and responsive shopping platform for customers interested in clothing and shoes.

## Target Users

- Customers shopping for men's fashion.
- Customers shopping for women's fashion.
- Parents and guardians looking for baby products.
- Store administrators managing products and orders.

## Features

### Customer Features
- Browse fashion products.
- Explore product categories.
- Search and filter products.
- Sort products.
- View product details.
- Select product sizes and colours where available.
- Add products to the shopping cart.
- Update product quantities.
- Add products to a wishlist.
- Complete a demo checkout.
- Select from Cash on Delivery, MTN Mobile Money, and Airtel Money options.

### Admin Features
- View dashboard statistics.
- Add and remove products.
- Monitor product inventory.
- View customer orders.
- Update order statuses.

Payment notice: Payment options are currently presented as demo checkout choices. The application does not yet process real MTN Mobile Money or Airtel Money transactions.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | Building interactive user interfaces |
| JavaScript (ES6+) | Application logic |
| HTML5 | Webpage structure |
| CSS3 | Styling and responsive design |
| Vite | Development server and build tool |
| React DOM | Rendering React components |
| React Router DOM | Routing dependency |
| Lucide React | Icons |
| Local Storage | Persisting selected application data |
| Vitest | Testing framework configuration |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js installed.
- npm installed.
- Git installed.
- Visual Studio Code or another code editor.

### 1. Clone the repository

```bash
git clone https://github.com/tuyizeresandra3-byte/SAMBI-SHOP.git
```

### 2. Open the project folder

```bash
cd SAMBI-SHOP
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

**Windows PowerShell note:** If PowerShell blocks the npm command, use `npm.cmd` instead, for example `npm.cmd run dev`.

## Project Structure

The current application is primarily organized around the following files. Update this structure if the project is later separated into components and pages.

```text
SAMBI-SHOP/
│
├── public/
│   └── images/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── test-setup.js
│
├── index.html
├── package.json
├── eslint.config.js
├── vite.config.js
└── README.md
```

## APIs and Data Storage

The current version does not use a dedicated backend API or database.

- Product and order information is managed within the frontend application.
- Browser Local Storage is used to persist selected data.
- Product images use externally hosted image URLs.

Future versions may connect to a backend API and database to support secure user accounts, centralized product management, and real transactions.

## Challenges and Solutions

Some important development areas addressed in this project include:

1. Managing application state: React state is used to manage products, shopping cart items, wishlist information, and orders.
2. Persisting information:Local Storage helps preserve selected information between browser sessions.
3. Inventory management: Product stock is updated when demo orders are placed.
4. Responsive design: CSS media queries help the shopping interface adapt to different screen sizes.

Add specific bugs you encountered and how you resolved them as you complete testing.

## Performance and Testing

Lighthouse results will be added after deployment and testing.

| Lighthouse category | Score |
|---|---|
| Performance | To be measured |
| Accessibility | To be measured |
| Best Practices | To be measured |
| SEO | To be measured |

Testing tools and commands:
- Browser Developer Tools
- Vite production build
- Vitest test runner

## Future Improvements

- Integrate real MTN Mobile Money and Airtel Money payment services.
- Build a secure backend and database.
- Add customer registration and login.
- Implement secure admin authentication and authorization.
- Add product editing and image uploading.
- Improve product recommendations.
- Add order tracking and customer notifications.
- Optimize product images and website performance.

## Developer

**Sandrine Tuyizere**

Frontend Development Learner | React | JavaScript | HTML | CSS

- GitHub: https://github.com/tuyizeresandra3-byte
- Project: https://github.com/tuyizeresandra3-byte/SAMBI-SHOP

## Acknowledgements

This project was developed as part of my frontend development learning journey.

I appreciate the instructors, mentors, and learning community who supported my progress and helped me develop practical web development skills.
