# AutoExperts Admin Dashboard

AutoExperts Admin Dashboard is a React + Vite admin panel for managing the AutoExperts platform. It provides admin login, dashboard stats, member management, inspection bookings, used-car listings, auction listings, car upload forms, auction upload forms, and update/detail pages for vehicle records.

## Features

- Admin login
- Protected admin routes
- Dashboard overview with summary cards
- Sidebar navigation
- Member list management
- Inspection booking list with pagination
- Used-car listing management
- Auction-car listing management
- Auction detail page
- Used-car detail page
- Upload used-car details
- Upload auction-car details
- Update used-car information
- Update auction-car information
- View uploaded car images
- View inspection report PDF links
- Real-time auction updates using Socket.IO
- Search and pagination for listings
- Responsive admin layout

## Tech Stack

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- Tailwind CSS
- Formik
- Yup
- Framer Motion
- React Icons
- Chart.js
- React Chart.js 2
- Recharts
- MUI X Charts
- Socket.IO Client
- date-fns

## Project Structure

```text
Admin-Dashboard/
├── components/
│   └── utils.js
├── public/
├── src/
│   ├── assets/
│   │   └── img/
│   ├── components/
│   │   ├── charts/
│   │   │   └── TotalRevenueChart.jsx
│   │   ├── main/
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AuctionDetails.jsx
│   │   │   ├── AuctionList.jsx
│   │   │   ├── BidderDetailsModal.jsx
│   │   │   ├── EditModal.jsx
│   │   │   ├── InspectionBookingRow.jsx
│   │   │   ├── InspectionBookings.jsx
│   │   │   ├── Main.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── UpdateAuctionProductForm.jsx
│   │   │   ├── UpdateProductForm.jsx
│   │   │   ├── UploadAuctionCars.jsx
│   │   │   ├── UploadCarDetails.jsx
│   │   │   ├── UploadUsedCars.jsx
│   │   │   ├── UsedCarsList.jsx
│   │   │   ├── UserTable.jsx
│   │   │   ├── UserTableRow.jsx
│   │   │   └── socket.jsx
│   │   └── sidebar/
│   │       ├── Sidebar.css
│   │       └── Sidebar.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Requirements

Before running the project, make sure you have:

- Node.js installed
- npm installed
- Backend APIs running for:
  - Admin authentication
  - Members
  - Inspection bookings
  - Used cars
  - Auction cars
  - Bidding data
  - File uploads
  - Socket.IO auction updates

## Installation

Clone the repository:

```bash
git clone https://github.com/SalAkBuK/Admin-Dashboard.git
cd Admin-Dashboard
```

Install dependencies:

```bash
npm install
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open the local development URL shown in your terminal.

Usually it will be:

```text
http://localhost:5173
```

## Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

### Start Development Server

```bash
npm run dev
```

Runs the app in development mode using Vite.

### Build Project

```bash
npm run build
```

Builds the app for production.

### Preview Build

```bash
npm run preview
```

Runs a local preview of the production build.

### Lint Code

```bash
npm run lint
```

Runs ESLint checks for JavaScript and JSX files.

## Main Routes

This project uses `HashRouter`, so deployed routes may appear with `#/` in the URL.

| Route | Description |
|---|---|
| `/` | Redirects to login |
| `/login` | Admin login page |
| `/dashboard` | Admin dashboard overview |
| `/users` | Member/user list |
| `/inspection-bookings` | Inspection booking list |
| `/auction-list` | Auction car list |
| `/auction-details/:auctionId` | Auction car detail page |
| `/upload-car-details` | Upload car details page |
| `/upload-auction-cars` | Upload auction car form |
| `/upload-used-cars` | Upload used car form |
| `/used-cars` | Used-car list |
| `/used-car-details/:productId` | Used-car detail page |
| `/update-car-details/:productId` | Update used-car details |
| `/update-auction-car-details/:auctionId` | Update auction-car details |

## Backend API Notes

This repository contains the frontend admin dashboard only. The app expects backend services for:

- Admin login
- Authentication token validation
- Member listing
- Inspection booking listing
- Used-car product listing
- Used-car product upload
- Used-car product update
- Used-car product delete
- Auction car listing
- Auction car upload
- Auction car update
- Auction car delete
- Auction bidder details
- File uploads for car images
- File uploads for inspection report PDFs
- Real-time auction updates through Socket.IO

The source currently references backend API URLs directly in the frontend code. For production, it is recommended to move API URLs into environment variables.

Example:

```env
VITE_API_BASE_URL=
VITE_SOCKET_URL=
```

Then use those variables in Axios and Socket.IO configuration instead of hard-coded URLs.

## Authentication Notes

- Admin login stores the authentication token in `localStorage`.
- Protected routes check for the token before allowing access.
- If no token is found, the user is redirected to the login page.
- Logout removes the token from `localStorage`.

## Deployment

Build the project:

```bash
npm run build
```

After building, deploy the generated `dist/` folder to a static hosting provider.

Common deployment options:

- Vercel
- Netlify
- GitHub Pages
- cPanel hosting
- Apache server
- Nginx server

Because the app uses `HashRouter`, it is easier to deploy on static hosting without extra server rewrite rules.

Make sure your backend APIs are deployed and accessible from the frontend domain.

## Notes

- This is the admin frontend for the AutoExperts platform.
- Backend services must run separately.
- Auction features require Socket.IO backend support.
- Image and PDF upload features require backend file-upload support.
- Review hard-coded API URLs before production deployment.
- Keep secrets, API keys, and backend credentials out of the frontend repository.
- The current README in the repository is still the default React + Vite template and can be replaced with this file.

## License

No license file has been added yet. Add a license if you plan to make the project open source or distribute it publicly.
