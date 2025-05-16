# BizInvoicer

BizInvoicer is a comprehensive invoice management system built with Node.js, Express, and MySQL. It provides a robust solution for businesses to manage their invoicing, client relationships, and financial documentation.

## 🌟 Features

- **User Authentication & Authorization**
  - Secure login and registration system
  - Role-based access control
  - Session management

- **Firm Management**
  - Create and manage multiple business profiles
  - Customize firm details and branding

- **Client Management**
  - Store and manage client information
  - Track client history and interactions

- **Product Management**
  - Maintain product catalog
  - Set pricing and product details

- **Invoice Generation**
  - Create professional invoices
  - Customize invoice templates
  - Generate PDF invoices
  - Track invoice status

- **Quotation System**
  - Create and manage quotations
  - Convert quotations to invoices
  - Track quotation status

- **Tax Management**
  - Configure tax rates
  - Apply taxes to invoices
  - Tax reporting

- **Settings & Configuration**
  - Customize system settings
  - Manage user preferences
  - Configure business rules

## 🛠️ Technology Stack

- **Backend Framework**: Node.js with Express
- **Database**: MySQL with Sequelize ORM
- **Template Engine**: EJS
- **Authentication**: Express Session, bcryptjs
- **API Documentation**: Swagger UI
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Security**: Helmet

## 📁 Project Structure

```
bizinvoicer/
├── bin/                    # Application entry point
├── config/                 # Configuration files
├── controllers/           # Route controllers
├── middleware/            # Custom middleware
├── migrations/            # Database migrations
├── models/                # Database models
├── public/               # Static files
├── routes/               # API routes
├── seeders/              # Database seeders
├── utils/                # Utility functions
├── views/                # EJS templates
├── app.js                # Main application file
├── package.json          # Project dependencies
└── swagger.json          # API documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bizinvoicer.git
   cd bizinvoicer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=bizinvoicer
   SESSION_SECRET=your_session_secret
   ```

4. Run database migrations and seeders:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. Start the application:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## 📚 API Documentation

API documentation is available at `/api-docs` when the server is running. The documentation is powered by Swagger UI and provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## 🔒 Security Features

- Password hashing using bcryptjs
- Session-based authentication
- HTTP security headers with Helmet
- SQL injection protection through Sequelize
- XSS protection
- CSRF protection

## 📧 Email Integration

The system includes email functionality for:
- Invoice notifications
- Password reset
- Account verification
- System notifications

## 🔄 Database Migrations

The project uses Sequelize migrations for database version control. To create a new migration:

```bash
npx sequelize-cli migration:generate --name migration-name
```

To run migrations:
```bash
npx sequelize-cli db:migrate
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- Sequelize team for the ORM
- All contributors who have helped shape this project
