-- Users table
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) UNIQUE NOT NULL,
  name        VARCHAR(255) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  phone       VARCHAR(50),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Car listings table
CREATE TABLE IF NOT EXISTS car_listings (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  price       FLOAT NOT NULL,
  year        INT NOT NULL,
  make        VARCHAR(100) NOT NULL,
  model       VARCHAR(100) NOT NULL,
  mileage     INT NOT NULL,
  condition   VARCHAR(50) NOT NULL,
  images      TEXT NOT NULL DEFAULT '[]',
  status      VARCHAR(50) NOT NULL DEFAULT 'active',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "userId"    INT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE
);

-- Car inquiries table
CREATE TABLE IF NOT EXISTS car_inquiries (
  id          SERIAL PRIMARY KEY,
  message     TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "listingId" INT NOT NULL,
  "buyerId"   INT NOT NULL,
  FOREIGN KEY ("listingId") REFERENCES car_listings(id) ON DELETE NO ACTION,
  FOREIGN KEY ("buyerId")   REFERENCES users(id)        ON DELETE NO ACTION
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id           SERIAL PRIMARY KEY,
  text         TEXT NOT NULL,
  "createdAt"  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "senderId"   INT NOT NULL,
  "receiverId" INT NOT NULL,
  FOREIGN KEY ("senderId")   REFERENCES users(id) ON DELETE NO ACTION,
  FOREIGN KEY ("receiverId") REFERENCES users(id) ON DELETE NO ACTION
);

-- Sample users (skip if already present)
INSERT INTO users (email, name, password, phone) VALUES
('john@example.com', 'John Seller', 'hashedpass123', '555-0001'),
('jane@example.com', 'Jane Buyer',  'hashedpass456', '555-0002')
ON CONFLICT (email) DO NOTHING;

-- Sample car listings
INSERT INTO car_listings (title, description, price, year, make, model, mileage, condition, "userId") VALUES
('2022 Honda Civic - Excellent Condition', 'Beautiful Honda Civic with low mileage, fully maintained', 18000, 2022, 'Honda', 'Civic',     25000, 'excellent', 1),
('2020 Toyota Camry - Good Condition',     'Reliable Toyota Camry, regular service, great for family',  22000, 2020, 'Toyota','Camry',    35000, 'good',      1),
('2019 BMW 3 Series - Like New',           'Luxury BMW with premium features, clean title',              28000, 2019, 'BMW',   '3 Series', 42000, 'like-new',  1)
ON CONFLICT DO NOTHING;

-- Sample message
INSERT INTO messages (text, "senderId", "receiverId") VALUES
('Hi, I am interested in the Honda Civic!', 2, 1)
ON CONFLICT DO NOTHING;
