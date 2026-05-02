-- Row Level Security Policies
-- ============================

-- Products: public read, service role write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Products are editable by service role"
  ON products FOR ALL USING (auth.role() = 'service_role');

-- Customers: users can read/update own profile
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON customers FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON customers FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role full access to customers"
  ON customers FOR ALL USING (auth.role() = 'service_role');

-- Addresses: users can manage own addresses
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own addresses"
  ON addresses FOR ALL USING (auth.uid() = customer_id);

CREATE POLICY "Service role full access to addresses"
  ON addresses FOR ALL USING (auth.role() = 'service_role');

-- Orders: users can read own, service role all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Service role full access to orders"
  ON orders FOR ALL USING (auth.role() = 'service_role');

-- Order items: accessible through orders
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
  );

CREATE POLICY "Service role full access to order items"
  ON order_items FOR ALL USING (auth.role() = 'service_role');

-- Subscriptions: users can read own
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Service role full access to subscriptions"
  ON subscriptions FOR ALL USING (auth.role() = 'service_role');

-- Blog: public read, service role write
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
  ON blog_posts FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Service role full access to blog"
  ON blog_posts FOR ALL USING (auth.role() = 'service_role');

-- Newsletter: anon can insert, service role read
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Service role full access to newsletter"
  ON newsletter_subscribers FOR ALL USING (auth.role() = 'service_role');

-- Inventory log: service role only
ALTER TABLE inventory_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to inventory log"
  ON inventory_log FOR ALL USING (auth.role() = 'service_role');
