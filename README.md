# SAMBI-SHOP – Online shopping

## About My Project

SAMBI-SHOP is an online shopping website I created to make buying fashion products easier and more convenient. Customers can explore different collections, check product details, choose their preferred options, add products to their wishlist and shopping cart, and place orders.

I wanted to create a simple, attractive and user-friendly website where people can shop for men, women and babies in one place.

## Live Demo

## Website link: http://localhost:5173/shop


## Screenshots


The screenshots below show the main parts of my project:

- Homepage – Welcome page and featured fashion.
- Shop Page – Available products and collections.
- Product Details – Product information and available options.
- Wishlist – Favourite products.
- Shopping Cart – Selected products.
- Admin Dashboard – Store and inventory management.
- Admin Login – Administrator access.

\<!-- Add your screenshot images here using their actual file paths -->

## Features

- Browse products for men, women and babies.
- Search and filter products by category.
- View product details and prices.
- Select available sizes and colours.
- Add and remove products from the wishlist.
- Add products to the shopping cart.
- Check product availability and stock.
- Admin login and dashboard.
- Manage products and inventory.
- View and manage customer orders.
- Responsive and attractive user interface.

## Technologies Used

- **React.js** – Building the user interface.
- **JavaScript** – Adding functionality and interactions.
- **HTML** – Structuring the website.
- **CSS** – Styling and designing the pages.
- **Vite** – Running and building the project.
- **Supabase** – Backend services and database integration.
- **Git and GitHub** – Version control and project hosting.
- **Vercel** – Deployment.

##  How to Install and Run the Project

To run Sambi-Shop on your computer:

1. Make sure you have Node.js installed.
2. Clone the project from GitHub:

```bash
git clone YOUR_GITHUB_REPOSITORY_LINK
```

3. Open the project folder:

```bash
cd sambi-shop
```

4. Install the required packages:

```bash
npm install
```

5. Configure the required Supabase environment variables in your `.env.local` file.

6. Start the development server:

```bash
npm run dev
```

7. Open the local link provided in your terminal.

## Project Structure

```text
sambi-shop/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── AdminAccess.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .env.local
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vercel.json
└── vite.config.js
```

## API and Backend

I used Supabase to support the backend side of my project. It helps the application connect with backend services and manage data.

The project uses environment variables to configure the Supabase connection. Private keys and passwords should not be shared publicly.

## Challenges and How I Worked Through Them

While building this project, I faced some challenges, especially when working with the admin dashboard, product information and backend connection.

Some of the things I worked on included:

- Making sure products and their stock information display correctly.
- Working on the admin section for managing store products.
- Connecting the frontend with Supabase.
- Making the website easy to navigate and visually attractive.
- Fixing errors and testing different parts of the application.

These challenges helped me understand React better and improve my problem-solving skills.

## Future Improvements

There are still some things I would like to improve in Sambi-Shop:

- Add secure online payment options.
- Introduce order tracking for customers.
- Improve inventory and sales reports.
- Add customer registration and login.
- Improve the website's performance and mobile experience.

## Credits

This project was developed as part of my learning journey in frontend development.

I would like to appreciate my facilitators and everyone who supported me throughout the development process.

Developer:  TUYIZERE Sandrine

Project:Sambi-Shop

Programme: Innovate4JidJob – Cohort 02

Thank you for taking the time to explore my project!
