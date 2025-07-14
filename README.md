# Insightory - Inventory Management Dashboard

A modern, full-stack inventory management dashboard built with Next.js, Node.js, MongoDB, and TypeScript. This project provides comprehensive analytics, OTP-based authentication, and real-time inventory insights.

## 🚀 Features

### Frontend (Next.js)
- **Modern UI/UX**: Built with Next.js 14+ App Router, Tailwind CSS, and shadcn/ui components
- **Email OTP Authentication**: Secure login system with email-based OTP verification
- **Interactive Dashboard**: Multiple tabs for products, categories, brands, stock management, and analytics
- **Data Visualizations**: Charts and graphs using Chart.js and react-chartjs-2
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application

### Backend (Node.js/Express)
- **RESTful API**: Clean API architecture with Express.js
- **MongoDB Integration**: Database operations using Mongoose ODM
- **Email Service**: Nodemailer integration with react-email templates
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Environment Configuration**: Secure environment variable management

### Dashboard Features
- **Products Management**: View, filter, and analyze product data
- **Category Analytics**: Distribution charts and category-wise insights
- **Brand Analysis**: Brand performance and product count analytics
- **Stock Management**: Inventory levels, low stock alerts, and stock distribution
- **Sales & Discounts**: Discount analysis and pricing insights
- **Reviews & Ratings**: Customer feedback analysis and rating distributions
- **Advanced Analytics**: Multi-dimensional data visualization and reporting

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Chart.js, react-chartjs-2
- **Icons**: Lucide React
- **Email Templates**: @react-email/components

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **Email**: Nodemailer
- **Environment**: dotenv

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript

## 📁 Project Structure

```
Insightory/
├── frontend/                    # Next.js frontend application
│   ├── .next/                  # Next.js build output (auto-generated)
│   ├── app/                    # App Router pages and layouts
│   │   ├── auth/               # Authentication pages
│   │   │   ├── login/          # Login page
│   │   │   │   └── page.tsx    # Login page component
│   │   │   ├── verify-otp/     # OTP verification page
│   │   │   │   ├── page.tsx    # OTP verification wrapper
│   │   │   │   └── VerifyOtpPage.tsx # Main OTP verification component
│   │   │   └── layout.tsx      # Auth layout
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── overview/       # Dashboard overview
│   │   │   │   └── page.tsx    # Overview page component
│   │   │   ├── products/       # Products management
│   │   │   │   └── page.tsx    # Products page component
│   │   │   ├── categories/     # Category analytics
│   │   │   │   └── page.tsx    # Categories page component
│   │   │   ├── brands/         # Brand analysis
│   │   │   │   └── page.tsx    # Brands page component
│   │   │   ├── stock/          # Stock management
│   │   │   │   └── page.tsx    # Stock page component
│   │   │   ├── discounts/      # Sales & discounts
│   │   │   │   └── page.tsx    # Discounts page component
│   │   │   ├── reviews/        # Reviews & ratings
│   │   │   │   └── page.tsx    # Reviews page component
│   │   │   ├── analytics/      # Advanced analytics
│   │   │   │   └── page.tsx    # Analytics page component
│   │   │   └── layout.tsx      # Dashboard layout
│   │   ├── globals.css         # Global CSS styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home/landing page
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # shadcn/ui components
│   │       ├── alert.tsx       # Alert component
│   │       ├── button.tsx      # Button component
│   │       ├── card.tsx        # Card component
│   │       ├── input.tsx       # Input component
│   │       ├── label.tsx       # Label component
│   │       └── sheet.tsx       # Sheet component
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Utility functions
│   ├── emails/                 # Email templates
│   │   ├── OtpEmail.tsx        # OTP email template
│   │   └── ConfirmationEmail.tsx # Confirmation email template
│   ├── public/                 # Static assets
│   │   ├── favicon.ico         # Favicon
│   │   └── images/             # Image assets
│   ├── node_modules/           # Dependencies (auto-generated)
│   ├── .env.local              # Environment variables
│   ├── .gitignore              # Git ignore file
│   ├── components.json         # shadcn/ui configuration
│   ├── eslint.config.mjs       # ESLint configuration
│   ├── next.config.ts          # Next.js configuration
│   ├── package.json            # Frontend dependencies
│   ├── package-lock.json       # Lock file
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tailwind.config.ts      # Tailwind CSS configuration
│   └── tsconfig.json           # TypeScript configuration
├── backend/                    # Node.js backend application
│   ├── controllers/            # Route controllers
│   │   └── authController.js   # Authentication controller
│   ├── models/                 # Database models
│   │   ├── User.js             # User model
│   │   ├── Product.js          # Product model
│   │   └── Review.js           # Review model
│   ├── routes/                 # API routes
│   │   └── auth.js             # Authentication routes
│   ├── middleware/             # Custom middleware
│   │   ├── auth.js             # Authentication middleware
│   │   └── validation.js       # Validation middleware
│   ├── emails/                 # Email templates (backend)
│   │   └── OtpEmail.jsx        # OTP email template
│   ├── node_modules/           # Dependencies (auto-generated)
│   ├── .env                    # Environment variables
│   ├── .gitignore              # Git ignore file
│   ├── package.json            # Backend dependencies
│   ├── package-lock.json       # Lock file
│   └── server.js               # Server entry point
├── .gitignore                  # Root git ignore
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB installation)
- SMTP email service (Gmail, Mailtrap, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SivansRawat/Insightory.git
   cd Insightory
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

### Environment Setup

#### Frontend Environment Variables
Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/insightory

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Server
PORT=5000
NODE_ENV=development
```

### Database Setup

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string

2. **Configure Database Access**
   - Create a database user
   - Whitelist your IP address
   - Update the `MONGODB_URI` in your `.env` file

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - Use the OTP authentication system to log in

## 📊 Dashboard Features

### Products Tab
- Complete product listing with images, pricing, and stock information
- Category distribution charts
- Search and filter functionality
- Product analytics and insights

### Categories Tab
- Category-wise product distribution
- Performance metrics by category
- Visual charts and graphs

### Brands Tab
- Brand analysis and comparison
- Product count by brand
- Brand performance metrics

### Stock & Inventory Tab
- Real-time stock levels
- Low stock alerts
- Inventory distribution charts
- Stock management tools

### Sales & Discounts Tab
- Discount analysis
- Price range distributions
- Sales performance metrics

### Reviews & Ratings Tab
- Customer review analysis
- Rating distributions
- Sentiment analysis

### Analytics Tab
- Advanced data visualizations
- Multi-dimensional analysis
- Custom reports and insights

## 🔐 Authentication

The application uses a secure OTP-based authentication system:

1. **Email Input**: User enters their email address
2. **OTP Generation**: System generates and sends a 6-digit OTP
3. **Email Delivery**: OTP is sent via email using Nodemailer
4. **Verification**: User enters OTP for verification
5. **JWT Token**: Upon successful verification, a JWT token is issued
6. **Session Management**: Token-based session management

## 🎨 UI Components

The project uses shadcn/ui for consistent, accessible UI components:

- **Installation**: `npx shadcn@latest add `
- **Components Used**: Button, Input, Label, Sheet, Card, Table, and more
- **Customization**: Fully customizable with Tailwind CSS
- **Accessibility**: Built-in accessibility features

## 📧 Email Templates

Email templates are built using react-email:

- **OTP Email**: Styled OTP delivery email
- **Confirmation Email**: Account verification confirmation
- **Responsive Design**: Mobile-friendly email templates
- **Brand Consistency**: Consistent branding across all emails

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Render)
1. Connect your GitHub repository to Railway or Render
2. Set environment variables in the platform dashboard
3. Configure build and start commands
4. Deploy automatically on push to main branch

### Database (MongoDB Atlas)
- Already cloud-hosted
- Configure connection string in environment variables
- Set up proper security rules and IP whitelisting


## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/send-otp` - Send OTP to email
- `POST /api/auth/verify-otp` - Verify OTP and get JWT token
- `POST /api/auth/resend-otp` - Resend OTP

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Analytics Endpoints
- `GET /api/analytics/categories` - Category analytics
- `GET /api/analytics/brands` - Brand analytics
- `GET /api/analytics/stock` - Stock analytics

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Chart.js](https://www.chartjs.org/) for data visualization
- [MongoDB](https://www.mongodb.com/) for the database
- [Vercel](https://vercel.com/) for frontend hosting

## 📞 Support

If you have any questions or need help with setup, please:
- Open an issue on GitHub
- Contact the maintainer

**Repository**: [https://github.com/SivansRawat/Insightory](https://github.com/SivansRawat/Insightory)
