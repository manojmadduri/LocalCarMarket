import { pgTable, text, serial, integer, boolean, decimal, timestamp, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  mileage: integer("mileage").notNull(),
  color: text("color").notNull(),
  interiorColor: text("interior_color"),
  fuelType: text("fuel_type").notNull(),
  transmission: text("transmission").notNull(),
  drivetrain: text("drivetrain"), // FWD, RWD, AWD, 4WD
  bodyStyle: text("body_style"), // Sedan, SUV, Truck, Coupe, etc.
  engine: text("engine"), // Engine description
  trim: text("trim"), // Trim level
  condition: text("condition").notNull().default("used"),
  status: text("status").notNull().default("available"), // available, pending, sold
  numberOfSeats: integer("number_of_seats"),
  numberOfDoors: integer("number_of_doors"),
  mpgCity: integer("mpg_city"),
  mpgHighway: integer("mpg_highway"),
  safetyRating: decimal("safety_rating", { precision: 2, scale: 1 }), // NHTSA rating
  dealerRating: decimal("dealer_rating", { precision: 2, scale: 1 }),
  daysOnMarket: integer("days_on_market"),
  vehicleHistory: text("vehicle_history"), // Clean, Accident, etc.
  financing: boolean("financing_available").default(true),
  images: text("images").array().default([]),
  description: text("description"),
  vin: text("vin"),
  features: text("features").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  startingPrice: decimal("starting_price", { precision: 8, scale: 2 }).notNull(),
  category: text("category").notNull(),
  icon: text("icon").notNull(),
  image: text("image"),
  imageUrl: text("image_url"),
  features: text("features").array().default([]),
  duration: text("duration"), // e.g., "1-2 hours"
  isActive: boolean("is_active").default(true),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(), // "Car Buyer", "Service Customer", etc.
  rating: integer("rating").notNull(),
  comment: text("comment").notNull(),
  image: text("image"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const serviceBookings = pgTable("service_bookings", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  vehicleInfo: text("vehicle_info").notNull(),
  serviceType: text("service_type").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, confirmed, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"), // unread, read, responded
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertCarSchema = createInsertSchema(cars).omit({
  id: true,
  createdAt: true,
}).extend({
  price: z.string().min(1, "Price is required"),
  safetyRating: z.string().optional(),
  dealerRating: z.string().optional(),
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertServiceBookingSchema = createInsertSchema(serviceBookings).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  status: true,
  createdAt: true,
});

// Types
export type Car = typeof cars.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type ServiceBooking = typeof serviceBookings.$inferSelect;
export type InsertServiceBooking = z.infer<typeof insertServiceBookingSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Search/Filter schemas
export const carFiltersSchema = z.object({
  make: z.union([z.string(), z.array(z.string())]).optional(),
  model: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  maxMileage: z.number().optional(),
  minMileage: z.number().optional(),
  fuelType: z.array(z.string()).optional(),
  transmission: z.array(z.string()).optional(),
  drivetrain: z.array(z.string()).optional(),
  bodyStyle: z.array(z.string()).optional(),
  color: z.array(z.string()).optional(),
  interiorColor: z.array(z.string()).optional(),
  condition: z.array(z.string()).optional(),
  numberOfSeats: z.number().optional(),
  numberOfDoors: z.number().optional(),
  minMpgCity: z.number().optional(),
  maxMpgCity: z.number().optional(),
  minSafetyRating: z.number().optional(),
  minDealerRating: z.number().optional(),
  maxDaysOnMarket: z.number().optional(),
  vehicleHistory: z.array(z.string()).optional(),
  financing: z.boolean().optional(),
  features: z.array(z.string()).optional(),
  trim: z.string().optional(),
  engine: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.enum(["price_asc", "price_desc", "year_desc", "mileage_asc", "newest", "safety_rating", "dealer_rating"]).optional(),
  page: z.number().default(1),
  limit: z.number().default(12),
});

export type CarFilters = z.infer<typeof carFiltersSchema>;

// Session storage table for database support
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const adminCredentials = pgTable("admin_credentials", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  recoveryCode: text("recovery_code").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAdminCredentialsSchema = createInsertSchema(adminCredentials).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type AdminCredentials = typeof adminCredentials.$inferSelect;
export type InsertAdminCredentials = z.infer<typeof insertAdminCredentialsSchema>;
