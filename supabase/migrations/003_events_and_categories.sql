-- Migration 003: Events table + expanded product categories
-- ===========================================================

-- Expand product category CHECK constraint
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE products ADD CONSTRAINT products_category_check
  CHECK (category IN ('oil', 'vinegar', 'pantry', 'wellness', 'home', 'gift_set'));

-- Expand blog_posts category CHECK for journal categories
ALTER TABLE blog_posts DROP CONSTRAINT IF EXISTS blog_posts_category_check;
ALTER TABLE blog_posts ADD CONSTRAINT blog_posts_category_check
  CHECK (category IN ('recipes', 'italian_culture', 'from_the_grove', 'local'));

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  date DATE NOT NULL,
  time TIME,
  end_time TIME,
  location TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('wine_tasting', 'cooking_class', 'language_class', 'private_event', 'market', 'other')),
  image_url TEXT,
  capacity INTEGER,
  price_cents INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_active ON events(is_active) WHERE is_active = TRUE;

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Add subcategory/tags to products for finer filtering
ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[];
