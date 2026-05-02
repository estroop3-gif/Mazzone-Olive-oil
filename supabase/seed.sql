-- Mazzone Olive Oil — Seed Data
-- ==============================

-- Products
INSERT INTO products (name, slug, description, short_description, price_cents, category, size_ml, origin, harvest_year, tasting_notes, stock_quantity, is_featured) VALUES

('Nocellara Extra Vergine', 'nocellara-extra-vergine',
 'Our flagship single-origin oil from Nocellara del Belice olives grown in the Val di Mazara region of western Sicily. Hand-harvested in early October at peak ripeness, cold-pressed within four hours. This oil embodies the terroir of our family groves — mineral-rich clay soil, Mediterranean breeze, and relentless Sicilian sun.',
 'Single-origin Nocellara del Belice. Peppery finish with notes of green almond.',
 3400, 'oil', 500, 'Val di Mazara, Sicilia', 2025,
 '{"aroma": "Fresh grass, tomato leaf, green almond", "flavor": "Artichoke, green almond, mild bitterness", "finish": "Peppery, lingering warmth with a clean close"}',
 45, TRUE),

('Blend Classico', 'blend-classico',
 'Our signature family blend, perfected over three generations. A harmonious marriage of Nocellara, Cerasuola, and Biancolilla varietals from our groves. Balanced and approachable, this is the everyday oil — equally at home drizzled over bruschetta or finishing a simple pasta.',
 'Our signature family blend. Balanced, fruity, perfect for everyday use.',
 2800, 'oil', 750, 'Sicilia', 2025,
 '{"aroma": "Ripe olive, fresh herbs, hint of banana", "flavor": "Buttery, mild pepper, stone fruit", "finish": "Clean, smooth, pleasantly mild"}',
 120, TRUE),

('Olio Nuovo', 'olio-nuovo',
 'The first press of the season — vibrant, intense, alive. Unfiltered and bottled immediately after pressing, Olio Nuovo captures the raw energy of the harvest. Available only in limited quantities each November. This is olive oil at its most elemental.',
 'First press of the season. Vibrant, intense, unfiltered. Limited edition.',
 4200, 'oil', 500, 'Castelvetrano, Sicilia', 2025,
 '{"aroma": "Freshly cut grass, green banana, eucalyptus", "flavor": "Intense artichoke, bitter greens, green tomato", "finish": "Long peppery kick, robust and commanding"}',
 18, TRUE),

('Olio al Limone', 'olio-al-limone',
 'Fresh Sicilian lemons from our neighbor''s grove, crushed together with our olives in a single press. No extracts, no additives — just the pure marriage of olive and citrus. Extraordinary over grilled fish, salads, or vanilla gelato.',
 'Sicilian lemons pressed with fresh olives. Bright, citrusy, versatile.',
 2400, 'oil', 250, 'Sicilia', 2025,
 '{"aroma": "Lemon zest, fresh olive, bergamot", "flavor": "Bright citrus, mild olive, herbaceous", "finish": "Clean, refreshing, lingering lemon"}',
 60, TRUE),

('Aceto Balsamico di Modena', 'aceto-balsamico-modena',
 'Aged balsamic vinegar sourced from our partners in Modena. Minimum 12 years in successive barrels of oak, chestnut, cherry, and juniper. Dense, complex, and syrupy — a few drops transform any dish.',
 'Aged 12+ years in traditional wooden barrels. Dense and complex.',
 3800, 'vinegar', 250, 'Modena, Emilia-Romagna', 2013,
 '{"aroma": "Dried fruit, oak, dark cherry", "flavor": "Sweet-tart, fig, caramel complexity", "finish": "Long, velvety, warming"}',
 30, FALSE),

('Set Regalo della Famiglia', 'set-regalo-famiglia',
 'The perfect introduction to Mazzone oils. Includes our Nocellara Extra Vergine (250ml), Blend Classico (250ml), and Olio al Limone (250ml), presented in a hand-wrapped gift box with tasting notes and pairing suggestions. A taste of Sicily for someone you love.',
 'Gift set: Nocellara, Classico, and Limone with tasting notes.',
 8900, 'gift_set', NULL, 'Sicilia', 2025,
 NULL,
 25, TRUE);

-- Blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, author_name, is_published, published_at) VALUES

('The Perfect Bruschetta: Let the Oil Shine', 'perfect-bruschetta',
 'Bruschetta is not about the toppings — it''s about the bread and the oil. Start with pane casereccio, day-old if possible, sliced thick and grilled over open flame until charred at the edges but still soft within. While hot, rub with a halved garlic clove — just a whisper. Then the oil. Be generous. Our Nocellara, with its peppery bite, is made for this moment. A pinch of flaky salt. That''s it. The tomato version? Save it for August, when the pomodori are sun-drunk and splitting on the vine.

## The Method

1. Slice rustic bread 2cm thick
2. Grill over high heat, 2 minutes per side
3. Rub immediately with halved garlic
4. Drizzle generously with extra virgin olive oil
5. Finish with flaky sea salt

*Buon appetito.*',
 'The secret to perfect bruschetta isn''t the toppings — it''s the quality of your bread and oil.',
 'recipes', 'Mazzone Family', TRUE, NOW() - INTERVAL '7 days'),

('Harvest Season 2025: A Promise of Exceptional Quality', 'harvest-2025',
 'October in our groves is a symphony of sound and movement. The mechanical rakes sing through the branches, olives cascade onto the nets below, and the press house hums from dawn until well past dark.

This year''s harvest arrived two weeks early — a dry summer pushed the Nocellara to ripen faster, concentrating their polyphenols and delivering an oil of extraordinary intensity. We pressed 12 tons in the first week alone, each batch tasted, graded, and stored within hours.

The 2025 Olio Nuovo is perhaps our finest in a decade. The peppery finish is more pronounced, the green notes more vivid. Nonno would have been proud.

We''ll release the Olio Nuovo in limited quantities this November. Join our mailing list to be notified.',
 'A dry Sicilian summer means concentrated polyphenols and our most intense harvest in a decade.',
 'farm_life', 'Marco Mazzone', TRUE, NOW() - INTERVAL '3 days'),

('Which Oil for Which Dish? A Sicilian Guide to Pairing', 'olive-oil-pairing-guide',
 'Not all olive oils are equal, and choosing the right one transforms a good dish into an unforgettable one. Here''s how we think about pairing in the Mazzone kitchen:

## Nocellara Extra Vergine
**Best for:** Finishing dishes that can stand up to its intensity. Grilled meats, hearty soups, aged cheeses, bruschetta.
**Avoid:** Delicate fish or subtle desserts — it will overpower.

## Blend Classico
**Best for:** Everyday cooking and finishing. Pasta, risotto, roasted vegetables, eggs. This is your workhorse.
**Avoid:** Nothing. It works everywhere.

## Olio al Limone
**Best for:** Seafood (especially crudo), salads, grilled vegetables, vanilla gelato, fresh ricotta.
**Avoid:** Red meat or heavily spiced dishes.

## The Golden Rule
Strong oils for strong flavors. Delicate oils for delicate dishes. And always — *always* — finish with a fresh drizzle at the table.',
 'A guide to matching each Mazzone oil with the dishes that bring out its best.',
 'pairings', 'Mazzone Family', TRUE, NOW() - INTERVAL '14 days');
