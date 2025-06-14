# The Integrity Auto and Body - Automotive Business Platform

A comprehensive automotive business platform that streamlines used car sales, repair services, and customer engagement through modern web technologies.

## 🚗 Features

- **Car Inventory Management**: Browse, search, and filter vehicles with advanced filtering
- **Service Booking System**: Schedule automotive repair and maintenance services
- **Customer Testimonials**: Display and manage customer reviews and ratings
- **Payment Calculator**: EMI and financing calculations for vehicle purchases
- **VIN Decoder Integration**: Automatic vehicle information extraction
- **Car Comparison Tool**: Side-by-side vehicle comparison
- **Price History Tracking**: Monitor vehicle pricing trends
- **Admin Panel**: Secure administrative interface for content management
- **Mobile Responsive Design**: Optimized for all device sizes
- **Real-time Database**: PostgreSQL with Supabase backend

## 🛠 Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Premium component library
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Smooth animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Supabase** - Database hosting and management
- **Drizzle ORM** - Type-safe database operations

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Supabase Account** (free tier available)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd integrity-auto-website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup with Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project:
   - **Name**: `integrity-auto-db` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Select closest to your location
5. Wait for project initialization (2-3 minutes)

#### Get Database Connection Details
1. In your Supabase dashboard, go to **Settings** → **Database**
2. Under "Connection Info", find your connection details:
   - **Host**: `db.xxxxxxxxxxxxx.supabase.co`
   - **Database name**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: [Your project password]

#### Connection String Format
```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# PostgreSQL Connection Details (Auto-generated from DATABASE_URL)
PGHOST=db.[YOUR-PROJECT-REF].supabase.co
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=[YOUR-PASSWORD]

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random
```

**Important**: Replace the placeholder values with your actual Supabase credentials.

### 5. Database Schema Setup

The project includes a complete database migration script. Run it using the SQL Editor in Supabase:

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase_migration.sql`
3. Paste and execute the script
4. Verify tables are created in **Table Editor**

#### Expected Tables
After migration, you should see these tables in the **"public"** schema:
- `cars` - Vehicle inventory
- `services` - Repair services
- `testimonials` - Customer reviews
- `service_bookings` - Service appointments
- `contact_messages` - Customer inquiries
- `admin_credentials` - Admin authentication
- `sessions` - Session management

### 6. Seed Data (Optional)

The migration script includes sample data:
- **8 vehicles** with complete specifications
- **13 repair services** with pricing
- **13 customer testimonials** with ratings
- **1 admin account** (username: `admin`, password: `integrity2024`)

### 7. Run the Application

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## 🔧 Development

### Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and API functions
├── server/                 # Backend Express application
│   ├── routes.ts           # API route definitions
│   ├── database-storage.ts # Database operations
│   └── db.ts              # Database connection
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema definitions
└── supabase_migration.sql  # Database setup script
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Database operations
npm run db:generate    # Generate migrations
npm run db:migrate     # Run migrations
npm run db:studio     # Open Drizzle Studio
```

## 🗄️ Database Schema

### Core Tables

#### Cars Table
```sql
- id (Primary Key)
- make, model, year
- price, mileage
- color, interior_color
- fuel_type, transmission
- condition, status
- images (Array)
- features (Array)
- vin, description
- specs (mpg, safety rating, etc.)
```

#### Services Table
```sql
- id (Primary Key)
- name, description
- starting_price
- category, duration
- features (Array)
- image, icon
- is_active
```

#### Testimonials Table
```sql
- id (Primary Key)
- name, role
- rating (1-5)
- comment
- image
- is_approved
- created_at
```

## 🔐 Admin Panel

Access the admin panel at `/admin`:

**Default Credentials:**
- Username: `admin`
- Password: `integrity2024`

**Admin Features:**
- Manage vehicle inventory
- Update service offerings
- Moderate customer testimonials
- View service bookings
- Handle contact messages
- Change admin password

## 🚢 Deployment

### Using Replit Deployments

1. Push your code to a Git repository
2. Connect the repository to Replit
3. Set environment variables in Replit
4. Deploy using Replit's deployment feature

### Environment Variables for Production

Ensure these are set in your deployment environment:

```env
DATABASE_URL=your-supabase-connection-string
SESSION_SECRET=your-production-session-secret
NODE_ENV=production
```

## 🔄 Switching to a Different Supabase Database

### Method 1: Complete Migration to New Supabase Project

#### Step 1: Create New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `integrity-auto-new` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Select closest to your location
5. Wait for project initialization (2-3 minutes)

#### Step 2: Get New Database Connection Details
1. In your new Supabase dashboard, go to **Settings** → **Database**
2. Copy the connection details:
   - **Host**: `db.xxxxxxxxxxxxx.supabase.co`
   - **Database**: `postgres`
   - **Port**: `5432`
   - **User**: `postgres`
   - **Password**: [Your new project password]

#### Step 3: Update Environment Variables
Edit your `.env` file with new connection details:

```env
# Updated Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[NEW-PASSWORD]@db.[NEW-PROJECT-REF].supabase.co:5432/postgres

# Updated PostgreSQL Connection Details
PGHOST=db.[NEW-PROJECT-REF].supabase.co
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=[NEW-PASSWORD]

# Keep the same session secret
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random
```

#### Step 4: Set Up Database Schema in New Project
1. Go to your **new** Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste this complete setup script:

```sql
-- Complete Database Setup for New Supabase Instance

-- Create admin_credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mileage INTEGER NOT NULL,
  color TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  condition TEXT NOT NULL,
  status TEXT DEFAULT 'available',
  images TEXT[] DEFAULT '{}',
  description TEXT,
  vin TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  interior_color TEXT,
  drivetrain TEXT,
  body_style TEXT,
  engine TEXT,
  trim TEXT,
  number_of_seats INTEGER,
  number_of_doors INTEGER,
  mpg_city INTEGER,
  mpg_highway INTEGER,
  safety_rating TEXT,
  dealer_rating DECIMAL(3,1),
  days_on_market INTEGER,
  vehicle_history TEXT,
  financing_available BOOLEAN DEFAULT true
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  image TEXT,
  features TEXT[] DEFAULT '{}',
  duration TEXT,
  is_active BOOLEAN DEFAULT true,
  image_url TEXT
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  image TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create service_bookings table
CREATE TABLE IF NOT EXISTS service_bookings (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  vehicle_info TEXT NOT NULL,
  service_type TEXT NOT NULL,
  preferred_date TEXT NOT NULL,
  preferred_time TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin credentials (with your preferred password)
INSERT INTO admin_credentials (username, password_hash, recovery_code, is_active, created_at, updated_at)
VALUES ('admin', 'admin123', 'INTEGRITY2024RESET', true, NOW(), NOW());

-- Insert sample cars data
INSERT INTO cars (make, model, year, price, mileage, color, fuel_type, transmission, condition, status, images, description, vin, features, interior_color, drivetrain, body_style, engine, trim, number_of_seats, number_of_doors, mpg_city, mpg_highway, safety_rating, dealer_rating, days_on_market, vehicle_history, financing_available) VALUES
('Toyota', 'Camry', 2020, 24999.00, 35000, 'Silver', 'Gasoline', 'Automatic', 'used', 'available', ARRAY['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop&crop=center'], 'Well-maintained Toyota Camry with excellent reliability record', 'TOY123456789012345', ARRAY['Toyota Safety Sense', 'Fuel Efficient Engine', 'Premium Audio System'], 'Black', 'FWD', 'Sedan', '2.5L 4-Cylinder', 'LE', 5, 4, 28, 39, '5.0', 4.8, 15, 'Clean Title', true),
('Honda', 'Civic', 2019, 19999.00, 42000, 'Blue', 'Gasoline', 'Manual', 'used', 'available', ARRAY['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop&crop=center'], 'Sporty Honda Civic with manual transmission', 'HON123456789012345', ARRAY['Honda Sensing Safety Suite', 'Sport Mode', 'Manual Transmission'], 'Gray', 'FWD', 'Sedan', '2.0L 4-Cylinder', 'Sport', 5, 4, 31, 40, '5.0', 4.7, 8, 'Clean Title', true),
('Ford', 'F-150', 2021, 32999.00, 25000, 'Black', 'Gasoline', 'Automatic', 'used', 'available', ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center'], 'Powerful Ford F-150 pickup truck with towing package', 'FOR123456789012345', ARRAY['Towing Package', 'Crew Cab', 'Bedliner'], 'Black', '4WD', 'Truck', '3.5L EcoBoost V6', 'XLT', 6, 4, 20, 24, '4.0', 4.9, 22, 'Clean Title', true),
('BMW', 'X3', 2022, 42999.00, 18000, 'White', 'Gasoline', 'Automatic', 'used', 'available', ARRAY['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center'], 'Luxury BMW X3 with premium features and low miles', 'BMW123456789012345', ARRAY['Luxury Package', 'Heated Seats', 'Navigation System'], 'Brown', 'AWD', 'SUV', '3.0L Twin Turbo I6', 'xDrive30i', 5, 4, 23, 29, '5.0', 4.6, 5, 'Clean Title', true),
('Tesla', 'Model 3', 2023, 38999.00, 12000, 'Red', 'Electric', 'Automatic', 'used', 'available', ARRAY['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop&crop=center'], 'Latest Tesla Model 3 with Full Self-Driving capability', 'TES123456789012345', ARRAY['Autopilot', 'Supercharging Network', 'Over-the-Air Updates'], 'White', 'RWD', 'Sedan', 'Electric Motor', 'Standard Range Plus', 5, 4, 130, 120, '5.0', 4.9, 3, 'Clean Title', true);

-- Insert services data
INSERT INTO services (name, description, starting_price, category, icon, image, features, duration, is_active, image_url) VALUES
('Oil Change Service', 'Complete oil and filter change with multi-point inspection', 49.99, 'Maintenance', 'wrench', 'oil-change.jpg', ARRAY['Synthetic Oil Available', 'Filter Replacement', 'Fluid Level Check', 'Battery Test'], '30 minutes', true, 'https://images.unsplash.com/photo-1632823469372-6c3a701c4e8e?w=400&h=300&fit=crop'),
('Brake System Inspection', 'Comprehensive brake system inspection and service', 75.00, 'Safety', 'shield', 'brake-service.jpg', ARRAY['Brake Pad Inspection', 'Rotor Analysis', 'Brake Fluid Test', 'ABS System Check'], '45 minutes', true, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'),
('Tire Services', 'Professional tire rotation, balancing, and alignment', 85.00, 'Maintenance', 'rotate-ccw', 'tire-service.jpg', ARRAY['Tire Rotation', 'Wheel Balancing', 'Pressure Check', 'Tread Analysis'], '60 minutes', true, 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop'),
('Battery & Electrical', 'Battery and charging system diagnostic and service', 65.00, 'Electrical', 'battery', 'electrical-service.jpg', ARRAY['Battery Load Test', 'Alternator Check', 'Starter Test', 'Electrical System Scan'], '45 minutes', true, 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop'),
('Engine Diagnostics', 'Advanced computer diagnostic scan and analysis', 99.99, 'Diagnostic', 'cpu', 'engine-diagnostic.jpg', ARRAY['OBD-II Scan', 'Error Code Analysis', 'Performance Check', 'Emissions Test'], '30 minutes', true, 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop'),
('Transmission Service', 'Complete transmission fluid and filter service', 149.99, 'Drivetrain', 'cog', 'transmission-service.jpg', ARRAY['Fluid Replacement', 'Filter Change', 'System Inspection', 'Road Test'], '90 minutes', true, 'https://images.unsplash.com/photo-1597404294360-feeeda04f042?w=400&h=300&fit=crop'),
('AC & Climate Control', 'Air conditioning system service and repair', 89.99, 'Climate', 'snowflake', 'ac-service.jpg', ARRAY['Refrigerant Check', 'Leak Detection', 'System Cleaning', 'Performance Test'], '60 minutes', true, 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=400&h=300&fit=crop'),
('Cooling System Service', 'Complete cooling system flush and maintenance', 79.99, 'Maintenance', 'droplets', 'cooling-service.jpg', ARRAY['Coolant Flush', 'Thermostat Check', 'Radiator Inspection', 'Hose Inspection'], '75 minutes', true, 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=300&fit=crop');

-- Insert testimonials data
INSERT INTO testimonials (name, role, rating, comment, image, is_approved, created_at) VALUES
('Sarah Johnson', 'Verified Customer', 5, 'Outstanding service! The team at Integrity Auto found exactly what I was looking for. The buying process was smooth, transparent, and professional from start to finish.', 'https://images.unsplash.com/photo-1494790108755-2616b332faa6?w=150&h=150&fit=crop&crop=face', true, NOW()),
('Michael Chen', 'Verified Customer', 5, 'Excellent experience purchasing my Honda Civic. The staff was honest about the vehicle condition, pricing was fair, and they even threw in a free oil change!', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', true, NOW()),
('Jennifer Martinez', 'Verified Customer', 5, 'Incredible customer service! They went above and beyond to help me find the perfect car within my budget. Highly recommended for anyone looking for quality used vehicles.', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', true, NOW()),
('David Wilson', 'Verified Customer', 5, 'Professional and reliable dealership. My Ford F-150 has been running perfectly since purchase. Their service department is top-notch too!', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', true, NOW()),
('Lisa Thompson', 'Verified Customer', 4, 'Great experience overall. Transparent pricing, honest service, and they really took the time to explain everything about the vehicle I was purchasing.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', true, NOW()),
('Robert Garcia', 'Verified Customer', 5, 'Fast and efficient service department. My BMW maintenance was completed on time and within budget. Will definitely be returning for future service needs.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', true, NOW());
```

#### Step 5: Restart Your Application
```bash
# Stop the current application
# Update your .env file with new Supabase details
# Restart the application
npm run dev
```

#### Step 6: Verify the Migration
1. Check that your website loads correctly
2. Log into admin panel with: `admin` / `admin123`
3. Verify all data is present in the new database
4. Test creating/editing/deleting content to ensure it saves to the new database

### Method 2: Temporary Database Switch (for Testing)

If you want to temporarily switch databases for testing:

#### Quick Switch Steps:
1. **Backup current .env file**:
   ```bash
   cp .env .env.backup
   ```

2. **Update .env with new database**:
   ```env
   DATABASE_URL=postgresql://postgres:[TEST-PASSWORD]@db.[TEST-PROJECT-REF].supabase.co:5432/postgres
   ```

3. **Restart application**:
   ```bash
   npm run dev
   ```

4. **To revert back**:
   ```bash
   cp .env.backup .env
   npm run dev
   ```

### Method 3: Using Multiple Environment Files

For managing multiple databases (development, staging, production):

#### Create Multiple Environment Files:
```bash
# Development database
.env.development

# Staging database  
.env.staging

# Production database
.env.production
```

#### Switch Between Environments:
```bash
# Copy the environment you want to use
cp .env.production .env
npm run dev
```

### Data Migration Between Databases

#### Export Data from Current Database:
```sql
-- Run in your current Supabase SQL Editor
COPY cars TO STDOUT WITH CSV HEADER;
COPY services TO STDOUT WITH CSV HEADER;
COPY testimonials TO STDOUT WITH CSV HEADER;
COPY admin_credentials TO STDOUT WITH CSV HEADER;
```

#### Import Data to New Database:
```sql
-- Run in your new Supabase SQL Editor after creating tables
COPY cars FROM STDIN WITH CSV HEADER;
-- [Paste the cars data]

COPY services FROM STDIN WITH CSV HEADER;
-- [Paste the services data]

-- Continue for all tables
```

### Verification Checklist

After switching databases, verify:

- [ ] Website loads without errors
- [ ] Admin login works (`/admin`)
- [ ] All cars are visible on the homepage
- [ ] Services page displays correctly
- [ ] Testimonials appear on the website
- [ ] Admin can add/edit/delete content
- [ ] Changes persist after page refresh
- [ ] No console errors in browser

### Current Database Configuration

Your current setup uses:
- **Database Host**: `db.krspnqedycoppzxjpayd.supabase.co`
- **Admin Login**: username `admin`, password `admin123`
- **Tables**: cars, services, testimonials, admin_credentials, service_bookings, contact_messages, sessions

### Environment Variables Template

Create a `.env` file with these variables for any new Supabase database:

```env
# Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# PostgreSQL Connection Details
PGHOST=db.[YOUR-PROJECT-REF].supabase.co
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=[YOUR-PASSWORD]

# Session Management
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random

# Optional: Node Environment
NODE_ENV=development
```

### Quick Database Switch Commands

For quick switching between databases, use these commands:

```bash
# Backup current environment
cp .env .env.backup

# Switch to new database (replace with your details)
cat > .env << EOF
DATABASE_URL=postgresql://postgres:NEW_PASSWORD@db.NEW_PROJECT_REF.supabase.co:5432/postgres
PGHOST=db.NEW_PROJECT_REF.supabase.co
PGPORT=5432
PGDATABASE=postgres
PGUSER=postgres
PGPASSWORD=NEW_PASSWORD
SESSION_SECRET=your-super-secret-session-key-here-make-it-long-and-random
EOF

# Restart application
npm run dev

# To revert back
cp .env.backup .env
npm run dev
```

### Database Migration Scripts

For easy database setup, save this as `new_database_setup.sql`:

```sql
-- Quick Database Setup Script
-- Run this in your new Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create all tables
CREATE TABLE IF NOT EXISTS admin_credentials (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  recovery_code TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sessions (
  sid VARCHAR PRIMARY KEY,
  sess JSONB NOT NULL,
  expire TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  mileage INTEGER NOT NULL,
  color TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  transmission TEXT NOT NULL,
  condition TEXT NOT NULL,
  status TEXT DEFAULT 'available',
  images TEXT[] DEFAULT '{}',
  description TEXT,
  vin TEXT,
  features TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  interior_color TEXT,
  drivetrain TEXT,
  body_style TEXT,
  engine TEXT,
  trim TEXT,
  number_of_seats INTEGER,
  number_of_doors INTEGER,
  mpg_city INTEGER,
  mpg_highway INTEGER,
  safety_rating TEXT,
  dealer_rating DECIMAL(3,1),
  days_on_market INTEGER,
  vehicle_history TEXT,
  financing_available BOOLEAN DEFAULT true
);

-- Additional tables (services, testimonials, etc.)
-- [Full table creation script from above]

-- Insert default admin user
INSERT INTO admin_credentials (username, password_hash, recovery_code, is_active, created_at, updated_at)
VALUES ('admin', 'admin123', 'INTEGRITY2024RESET', true, NOW(), NOW());

-- Success message
SELECT 'Database setup completed successfully!' as result;
```

### Common Migration Issues & Solutions

**Issue: Application shows "Database connection error"**
```bash
# Solution: Check your DATABASE_URL format
echo $DATABASE_URL
# Should look like: postgresql://postgres:password@db.project.supabase.co:5432/postgres
```

**Issue: Admin login not working after migration**
```sql
-- Solution: Verify admin credentials exist
SELECT * FROM admin_credentials WHERE username = 'admin';
-- If empty, re-run the admin insert command
```

**Issue: Tables not found**
```sql
-- Solution: List all tables to verify setup
\dt
-- If missing, re-run the table creation script
```

**Issue: Data not persisting**
```bash
# Solution: Verify environment variables are loaded
node -e "console.log(process.env.DATABASE_URL)"
# Should show your Supabase connection string
```

## 🛠️ Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
Error: getaddrinfo ENOTFOUND
```
**Solution**: Verify DATABASE_URL is correct and Supabase project is active

#### Missing Tables
```bash
Error: relation "cars" does not exist
```
**Solution**: Run the migration script in Supabase SQL Editor

#### Authentication Issues
```bash
Error: Admin user not found
```
**Solution**: Ensure admin credentials are seeded in database

### Database Verification

Check tables exist in Supabase:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

Check data was imported:
```sql
SELECT COUNT(*) FROM cars;
SELECT COUNT(*) FROM services;
SELECT COUNT(*) FROM testimonials;
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Check the troubleshooting section
- Review Supabase documentation
- Contact project maintainers

---

**Built with ❤️ for The Integrity Auto and Body**