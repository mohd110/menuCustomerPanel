// =====================================================
// MENU-DATA.JS — Complete Café Fleur Menu
// =====================================================
// Images: source.unsplash.com with unique ?sig= per item
// so every item gets its own cached, keyword-correct photo.
// Prices shown are REGULAR prices in INR (₹).
// =====================================================

const MENU_DATA = [

  // ══════════════════════════════════════════════════
  // BEVERAGES
  // ══════════════════════════════════════════════════

  // ── Black Coffee & Espresso ──
  {
    name: 'Espresso & Black',
    icon: '☕',
    items: [
      { id: 1,  name: 'Espresso (50ml)',     description: 'Classic short-pull espresso shot',        price: 39,  image: 'assets/images/item-1.jpg' },
      { id: 2,  name: 'Doppi (60ml)',        description: 'Double shot espresso, bold & intense',    price: 59,  image: 'assets/images/item-2.jpg' },
      { id: 3,  name: 'Hot Americano Black', description: 'Espresso diluted with hot water',         price: 79,  image: 'assets/images/item-3.jpg' },
      { id: 4,  name: 'Iced Americano',      description: 'Espresso over ice, refreshingly bold',    price: 129, image: 'assets/images/item-4.jpg' }
    ]
  },

  // ── Brew Coffee (Manual) ──
  {
    name: 'Brew Coffee',
    icon: '🫖',
    items: [
      { id: 5,  name: 'Cold Brew',         description: 'Slow-steeped 12 hrs, smooth & rich',      price: 99,  image: 'assets/images/item-5.jpg' },
      { id: 6,  name: 'French Press',      description: 'Full-bodied manual brew coffee',           price: 99,  image: 'assets/images/item-6.jpg' },
      { id: 7,  name: 'Pour Over Coffee',  description: 'Precision pour for a clean, bright cup',   price: 99,  image: 'assets/images/item-7.jpg' }
    ]
  },

  // ── Cold Coffee & Frappes ──
  {
    name: 'Cold Coffee',
    icon: '🧊',
    items: [
      { id: 8,  name: 'Café Frappe',                description: 'Classic blended iced café frappe',        price: 149, image: 'assets/images/item-8.jpg' },
      { id: 9,  name: 'Hazelnut Frappe',            description: 'Rich hazelnut swirled iced frappe',       price: 149, image: 'assets/images/item-9.jpg' },
      { id: 10, name: 'Cinnamon Frappe',            description: 'Warm cinnamon spice in a cold blend',     price: 149, image: 'assets/images/item-10.jpg' },
      { id: 11, name: 'Caramel Frappe',             description: 'Sweet caramel blended cold coffee',       price: 149, image: 'assets/images/item-11.jpg' },
      { id: 12, name: 'Caramel Popcorn Frappe',     description: 'Caramel popcorn infused cold blend',      price: 149, image: 'assets/images/item-12.jpg' },
      { id: 13, name: 'Peanut Butter Frappe',       description: 'Creamy peanut butter blended frappe',     price: 149, image: 'assets/images/item-13.jpg' },
      { id: 14, name: 'Chocolate Cold Coffee Frappe', description: 'Decadent chocolate cold coffee blend',  price: 149, image: 'assets/images/item-14.jpg' },
      { id: 15, name: 'Non Sugar Cold Coffee',      description: 'Sugar-free iced coffee delight',          price: 129, image: 'assets/images/item-15.jpg' }
    ]
  },

  // ── Flavoured Iced Coffee ──
  {
    name: 'Flavoured Iced Coffee',
    icon: '🍓',
    items: [
      { id: 16, name: 'Cranberry Coffee',  description: 'Tangy cranberry meets bold cold coffee',   price: 149, image: 'assets/images/item-16.jpg' },
      { id: 17, name: 'Orange Coffee',     description: 'Zesty orange blended with iced coffee',   price: 129, image: 'assets/images/item-17.jpg' },
      { id: 18, name: 'Guava Coffee',      description: 'Tropical guava & chilled coffee fusion',  price: 129, image: 'assets/images/item-18.jpg' },
      { id: 19, name: 'Lychee Coffee',     description: 'Exotic lychee with a coffee kick',        price: 129, image: 'assets/images/item-19.jpg' },
      { id: 20, name: 'Apple Coffee',      description: 'Crisp apple flavour with cold coffee',    price: 125, image: 'assets/images/item-20.jpg' }
    ]
  },

  // ── Hot Chocolate Coffee ──
  {
    name: 'Hot Chocolate',
    icon: '🍫',
    items: [
      { id: 21, name: 'Classic Hot Chocolate',     description: 'Velvety smooth cocoa indulgence',         price: 139, image: 'assets/images/item-21.jpg' },
      { id: 22, name: 'Hot Chocolate Next Level',  description: 'Extra rich premium chocolate brew',        price: 179, image: 'assets/images/item-22.jpg' },
      { id: 23, name: 'Nutella Hot Chocolate',     description: 'Creamy Nutella melted into hot cocoa',     price: 179, image: 'assets/images/item-23.jpg' },
      { id: 24, name: 'Caramel Hot Chocolate',     description: 'Hot chocolate drizzled with caramel',      price: 179, image: 'assets/images/item-24.jpg' },
      { id: 25, name: 'Kit-Kat Hot Chocolate',     description: 'Kit-Kat crunch meets steaming cocoa',      price: 179, image: 'assets/images/item-25.jpg' }
    ]
  },

  // ── Hot Coffee ──
  {
    name: 'Hot Coffee',
    icon: '☕',
    items: [
      { id: 26, name: 'Cappuccino Hot',         description: 'Classic espresso with steamed milk foam',   price: 79,  image: 'assets/images/item-26.jpg' },
      { id: 27, name: 'Light Hot Latte',        description: 'Smooth espresso with silky steamed milk',   price: 89,  image: 'assets/images/item-27.jpg' },
      { id: 28, name: 'Hot Chocolate Latte',    description: 'Chocolate-infused espresso latte',          price: 89,  image: 'assets/images/item-28.jpg' },
      { id: 29, name: 'Hot Hazelnut Latte',     description: 'Aromatic hazelnut espresso latte',          price: 109, image: 'assets/images/item-29.jpg' },
      { id: 30, name: 'Caramel Latte Hot',      description: 'Sweet caramel drizzled latte',              price: 109, image: 'assets/images/item-30.jpg' },
      { id: 31, name: 'Peanut Butter Latte Hot',description: 'Nutty peanut butter espresso fusion',       price: 129, image: 'assets/images/item-31.jpg' },
      { id: 32, name: 'Spanish Latte',          description: 'Condensed milk espresso latte',             price: 129, image: 'assets/images/item-32.jpg' },
      { id: 33, name: 'Kashmiri Latte',         description: 'Saffron & cardamom spiced latte',           price: 135, image: 'assets/images/item-33.jpg' }
    ]
  },

  // ── Iced Tea ──
  {
    name: 'Iced Tea',
    icon: '🍋',
    items: [
      { id: 34, name: 'Lemon Ice Tea',      description: 'Classic chilled lemon iced tea',         price: 139, image: 'assets/images/item-34.jpg' },
      { id: 35, name: 'Peach Ice Tea',      description: 'Sweet peachy chilled tea',               price: 139, image: 'assets/images/item-35.jpg' },
      { id: 36, name: 'Blueberry Ice Tea',  description: 'Tangy blueberry brew over ice',          price: 149, image: 'assets/images/item-36.jpg' },
      { id: 37, name: 'Mix Berry Ice Tea',  description: 'Mixed berry medley on crushed ice',      price: 149, image: 'assets/images/item-37.jpg' },
      { id: 38, name: 'Mango Ice Tea',      description: 'Tropical mango chilled tea',             price: 149, image: 'assets/images/item-38.jpg' },
      { id: 39, name: 'Orange Ice Tea',     description: 'Fresh orange citrus iced tea',           price: 149, image: 'assets/images/item-39.jpg' },
      { id: 40, name: 'Masala Ice Tea',     description: 'Spiced masala tea served chilled',       price: 149, image: 'assets/images/item-40.jpg' }
    ]
  },

  // ── Iced Coffee ──
  {
    name: 'Iced Coffee',
    icon: '🥤',
    items: [
      { id: 41, name: 'Iced Cappuccino',       description: 'Chilled cappuccino over ice',               price: 139, image: 'assets/images/item-41.jpg' },
      { id: 42, name: 'Iced Latte',            description: 'Espresso & milk served ice cold',            price: 139, image: 'assets/images/item-42.jpg' },
      { id: 43, name: 'Iced Chocolate Latte',  description: 'Chocolate espresso on crushed ice',          price: 139, image: 'assets/images/item-43.jpg' },
      { id: 44, name: 'Iced Hazelnut Latte',   description: 'Hazelnut espresso chilled to perfection',    price: 139, image: 'assets/images/item-44.jpg' },
      { id: 45, name: 'Iced Caramel Latte',    description: 'Caramel drizzled iced espresso latte',       price: 139, image: 'assets/images/item-45.jpg' }
    ]
  },

  // ── Margherita (Drinks) ──
  {
    name: 'Margherita',
    icon: '🍓',
    items: [
      { id: 46, name: 'Strawberry Margherita', description: 'Fresh strawberry blended margherita',  price: 149, image: 'assets/images/item-46.jpg' },
      { id: 47, name: 'Mango Margherita',      description: 'Tropical mango margherita slush',      price: 149, image: 'assets/images/item-47.jpg' },
      { id: 48, name: 'Pineapple Margherita',  description: 'Tangy pineapple chilled margherita',   price: 149, image: 'assets/images/item-48.jpg' },
      { id: 49, name: 'Blueberry Margherita',  description: 'Blueberry burst margherita slush',     price: 149, image: 'assets/images/item-49.jpg' },
      { id: 50, name: 'Mixed Berry Margherita',description: 'Berry medley margherita delight',       price: 149, image: 'assets/images/item-50.jpg' }
    ]
  },

  // ── Matcha (Cold) ──
  {
    name: 'Matcha',
    icon: '🍵',
    items: [
      { id: 51, name: 'Matcha Latte',          description: 'Premium ceremonial matcha with milk',  price: 199, image: 'assets/images/item-51.jpg' },
      { id: 52, name: 'Matcha Cappuccino',     description: 'Frothy matcha layered cappuccino',     price: 199, image: 'assets/images/item-52.jpg' },
      { id: 53, name: 'Hazelnut Matcha Latte', description: 'Hazelnut-infused cold matcha latte',   price: 225, image: 'assets/images/item-53.jpg' },
      { id: 54, name: 'Caramel Matcha Latte',  description: 'Sweet caramel swirled matcha latte',   price: 225, image: 'assets/images/item-54.jpg' },
      { id: 55, name: 'Cinnamon Matcha Latte', description: 'Warm cinnamon spiced cold matcha',     price: 225, image: 'assets/images/item-55.jpg' }
    ]
  },

  // ── Mojitos ──
  {
    name: 'Mojitos',
    icon: '🍃',
    items: [
      { id: 56, name: 'Virgin Mojito',        description: 'Fresh mint & lime, sparkling cold',      price: 119, image: 'assets/images/item-56.jpg' },
      { id: 57, name: 'Cold Blue Mojito',     description: 'Blue curacao tinted mint mojito',        price: 119, image: 'assets/images/item-57.jpg' },
      { id: 58, name: 'Watermelon Mojito',    description: 'Juicy watermelon & mint soda cooler',    price: 119, image: 'assets/images/item-58.jpg' },
      { id: 59, name: 'Cranberry Mojito',     description: 'Tart cranberry with fresh mint fizz',    price: 129, image: 'assets/images/item-59.jpg' },
      { id: 60, name: 'Passion Fruit Mojito', description: 'Tropical passion fruit mint soda',       price: 119, image: 'assets/images/item-60.jpg' },
      { id: 61, name: 'Mix Berry Mojito',     description: 'Berry medley with lime & mint fizz',     price: 129, image: 'assets/images/item-61.jpg' },
      { id: 62, name: 'Green Apple Mojito',   description: 'Crisp green apple mint sparkler',        price: 119, image: 'assets/images/item-62.jpg' },
      { id: 63, name: 'Blood Orange Mojito',  description: 'Bold blood orange with soda & mint',     price: 119, image: 'assets/images/item-63.jpg' },
      { id: 64, name: 'Pinacolada Mojito',    description: 'Pineapple coconut mint mojito fusion',   price: 119, image: 'assets/images/item-64.jpg' },
      { id: 65, name: 'Tangy Orange',         description: 'Tangy citrus orange cooler with fizz',   price: 69,  image: 'assets/images/item-65.jpg' },
      { id: 66, name: 'Coffee Mojito',        description: 'Cold coffee meets mint lime mojito',      price: 125, image: 'assets/images/item-66.jpg' }
    ]
  },

  // ── Shakes ──
  {
    name: 'Shakes',
    icon: '🥛',
    items: [
      { id: 67, name: 'Chocolate Shake',      description: 'Rich creamy chocolate milkshake',        price: 159, image: 'assets/images/item-67.jpg' },
      { id: 68, name: 'Butter Scotch Shake',  description: 'Sweet butterscotch creamy shake',        price: 159, image: 'assets/images/item-68.jpg' },
      { id: 69, name: 'Mango Shake',          description: 'Fresh mango pulp chilled shake',         price: 159, image: 'assets/images/item-69.jpg' },
      { id: 70, name: 'Pineapple Shake',      description: 'Tropical pineapple chilled shake',       price: 149, image: 'assets/images/item-70.jpg' },
      { id: 71, name: 'Black Currant Shake',  description: 'Deep berry black currant shake',         price: 159, image: 'assets/images/item-71.jpg' },
      { id: 72, name: 'Strawberry Shake',     description: 'Fresh strawberry creamy shake',          price: 179, image: 'assets/images/item-72.jpg' },
      { id: 73, name: 'Oreo Shake',           description: 'Crushed Oreo blended shake',             price: 179, image: 'assets/images/item-73.jpg' },
      { id: 74, name: 'Kit-Kat Shake',        description: 'Kit-Kat chunks blended in milkshake',    price: 179, image: 'assets/images/item-74.jpg' },
      { id: 75, name: 'Kesar Pista Shake',    description: 'Saffron & pistachio rich shake',         price: 179, image: 'assets/images/item-75.jpg' },
      { id: 76, name: 'Banana Shake',         description: 'Creamy banana blended milkshake',        price: 139, image: 'assets/images/item-76.jpg' },
      { id: 77, name: 'Lotus Biscoff Shake',  description: 'Lotus Biscoff cookie cream shake',       price: 199, image: 'assets/images/item-77.jpg' }
    ]
  },

  // ── Soda & Tea ──
  {
    name: 'Soda & Tea',
    icon: '🫧',
    items: [
      { id: 78, name: 'Fresh Lime Soda',  description: 'Freshly squeezed lime with soda',       price: 109, image: 'assets/images/item-78.jpg' },
      { id: 79, name: 'Masala Soda',      description: 'Spiced masala soda with chaat twist',   price: 119, image: 'assets/images/item-79.jpg' },
      { id: 80, name: 'Tea',              description: 'Classic hot chai brewed fresh',          price: 30,  image: 'assets/images/item-80.jpg' },
      { id: 81, name: 'Water Bottle',     description: 'Chilled packaged mineral water',        price: 20,  image: 'assets/images/item-81.jpg' }
    ]
  },

  // ══════════════════════════════════════════════════
  // FOOD MENU
  // ══════════════════════════════════════════════════

  // ── Appetizers ──
  {
    name: 'Appetizers',
    icon: '🍟',
    items: [
      { id: 82,  name: 'Peri Peri Fries',            description: 'Crispy fries tossed in peri peri spice',   price: 99,  image: 'assets/images/item-82.jpg' },
      { id: 83,  name: 'French Fries',               description: 'Golden salted crispy french fries',        price: 99,  image: 'assets/images/item-83.jpg' },
      { id: 84,  name: 'Cheesy French Fries',        description: 'Fries loaded with melted cheese sauce',    price: 99,  image: 'assets/images/item-84.jpg' },
      { id: 85,  name: 'Honey Chilli Potato',        description: 'Crispy potato in honey chilli glaze',      price: 169, image: 'assets/images/item-85.jpg' },
      { id: 86,  name: 'Crispy Potato Wedges',       description: 'Thick-cut seasoned potato wedges',         price: 149, image: 'assets/images/item-86.jpg' },
      { id: 87,  name: 'Chilli Paneer',              description: 'Indo-Chinese style chilli paneer',         price: 199, image: 'assets/images/item-87.jpg' },
      { id: 88,  name: 'Chilli Chicken',             description: 'Crispy chicken in spicy chilli sauce',     price: 219, image: 'assets/images/item-88.jpg' },
      { id: 89,  name: 'Veg Manchurian',             description: 'Fried veg balls in Manchurian sauce',      price: 179, image: 'assets/images/item-89.jpg' },
      { id: 90,  name: 'Malai Chaap',               description: 'Tender soya chaap in malai marinade',      price: 169, image: 'assets/images/item-90.jpg' },
      { id: 91,  name: 'Afghani Chaap',             description: 'Creamy Afghani spiced soya chaap',         price: 169, image: 'assets/images/item-91.jpg' },
      { id: 92,  name: 'Soya Chaap',               description: 'Chargrilled soya chaap classic',           price: 169, image: 'assets/images/item-92.jpg' },
      { id: 93,  name: 'Crispy Corn',              description: 'Fried corn tossed with spices & herbs',    price: 159, image: 'assets/images/item-93.jpg' },
      { id: 94,  name: 'Sweet Corn',               description: 'Buttered sweet corn with spice',           price: 99,  image: 'assets/images/item-94.jpg' },
      { id: 95,  name: 'Honey Chilli Chicken',     description: 'Juicy chicken in honey chilli sauce',      price: 149, image: 'assets/images/item-95.jpg' },
      { id: 96,  name: 'Fried Chicken',            description: 'Golden fried crispy chicken pieces',       price: 299, image: 'assets/images/item-96.jpg' },
      { id: 97,  name: 'Fish & Chips',             description: 'Beer-battered fish with crispy chips',     price: 349, image: 'assets/images/item-97.jpg' },
      { id: 98,  name: 'Veg Spring Roll',          description: 'Crispy veg-stuffed spring rolls',         price: 99,  image: 'assets/images/item-98.jpg' },
      { id: 99,  name: 'Kurkure Spring Roll',      description: 'Extra-crunchy kurkure spring rolls',      price: 199, image: 'assets/images/item-99.jpg' },
      { id: 100, name: 'Kurkure Chicken Spring Roll',description: 'Chicken-filled crispy kurkure rolls',   price: 199, image: 'assets/images/item-100.jpg' },
      { id: 101, name: 'Chicken Spring Roll',      description: 'Classic chicken-stuffed fried rolls',      price: 249, image: 'assets/images/item-101.jpg' }
    ]
  },

  // ── Mains (Rice & Noodles) ──
  {
    name: 'Mains',
    icon: '🍜',
    items: [
      { id: 102, name: 'Fried Rice (Veg)',              description: 'Wok-tossed vegetable fried rice',          price: 149, image: 'assets/images/item-102.jpg' },
      { id: 103, name: 'Fried Rice (Egg)',              description: 'Egg tossed with fried rice & soy',         price: 189, image: 'assets/images/item-103.jpg' },
      { id: 104, name: 'Fried Rice (Non-Veg)',          description: 'Chicken & prawn wok-fried rice',           price: 239, image: 'assets/images/item-104.jpg' },
      { id: 105, name: 'Hakka Noodles (Veg)',           description: 'Wok-tossed veg Hakka noodles',             price: 99,  image: 'assets/images/item-105.jpg' },
      { id: 106, name: 'Hakka Noodles (Egg)',           description: 'Egg-tossed Hakka noodles',                 price: 99,  image: 'assets/images/item-106.jpg' },
      { id: 107, name: 'Hakka Noodles (Non-Veg)',       description: 'Chicken Hakka noodles stir-fried',         price: 249, image: 'assets/images/item-107.jpg' },
      { id: 108, name: 'Chilli Garlic Noodles (Veg)',   description: 'Spicy garlic-infused veg noodles',         price: 119, image: 'assets/images/item-108.jpg' },
      { id: 109, name: 'Chilli Garlic Noodles (Egg)',   description: 'Egg chilli garlic wok noodles',            price: 119, image: 'assets/images/item-109.jpg' },
      { id: 110, name: 'Chilli Garlic Noodles (Non-Veg)',description: 'Chicken chilli garlic noodles',          price: 249, image: 'assets/images/item-110.jpg' },
      { id: 111, name: 'Szechuan Noodles (Veg)',        description: 'Fiery Szechuan-spiced veg noodles',        price: 199, image: 'assets/images/item-111.jpg' },
      { id: 112, name: 'Szechuan Noodles (Egg)',        description: 'Egg-tossed Szechuan noodles',              price: 189, image: 'assets/images/item-112.jpg' },
      { id: 113, name: 'Szechuan Noodles (Non-Veg)',    description: 'Chicken Szechuan noodles, spicy',          price: 269, image: 'assets/images/item-113.jpg' }
    ]
  },

  // ── Momos ──
  {
    name: 'Momos',
    icon: '🥟',
    items: [
      { id: 114, name: 'Paneer Momos',          description: 'Steamed paneer-filled dumplings',        price: 189, image: 'assets/images/item-114.jpg' },
      { id: 115, name: 'Veg Momos',             description: 'Soft steamed vegetable dumplings',       price: 189, image: 'assets/images/item-115.jpg' },
      { id: 116, name: 'Chicken Momos',         description: 'Juicy chicken steamed dumplings',        price: 199, image: 'assets/images/item-116.jpg' },
      { id: 117, name: 'Kurkure Momos',         description: 'Deep-fried crispy veg kurkure momos',    price: 199, image: 'assets/images/item-117.jpg' },
      { id: 118, name: 'Kurkure Chicken Momos', description: 'Crunchy fried chicken kurkure momos',    price: 169, image: 'assets/images/item-118.jpg' }
    ]
  },

  // ── Pasta ──
  {
    name: 'Pasta',
    icon: '🍝',
    items: [
      { id: 119, name: 'White Sauce Pasta',  description: 'Creamy Alfredo sauce penne pasta',     price: 149, image: 'assets/images/item-119.jpg' },
      { id: 120, name: 'Red Sauce Pasta',    description: 'Spicy Arrabiata tomato sauce penne',   price: 149, image: 'assets/images/item-120.jpg' },
      { id: 121, name: 'Pesto Pasta',        description: 'Fresh basil pesto tossed pasta',        price: 149, image: 'assets/images/item-121.jpg' },
      { id: 122, name: 'Spaghetti Aglio e Olio', description: 'Garlic olive oil classic spaghetti', price: 199, image: 'assets/images/item-122.jpg' }
    ]
  },

  // ── Pizza ──
  {
    name: 'Pizza',
    icon: '🍕',
    items: [
      { id: 123, name: 'Margherita Pizza',    description: 'Classic tomato base, mozzarella & basil',   price: 219, image: 'assets/images/item-123.jpg' },
      { id: 124, name: 'Veg Stagione Pizza',  description: 'Four seasons loaded veg pizza',             price: 259, image: 'assets/images/item-124.jpg' },
      { id: 125, name: 'Chicken Fajita Pizza',description: 'Spiced chicken fajita on a pizza',          price: 299, image: 'assets/images/item-125.jpg' },
      { id: 126, name: 'Mushroom Pizza',      description: 'Fresh mushroom & cheese loaded pizza',       price: 269, image: 'assets/images/item-126.jpg' },
      { id: 127, name: 'Sweet Corn Pizza',    description: 'Sweet corn & cheese pizza delight',          price: 269, image: 'assets/images/item-127.jpg' }
    ]
  },

  // ── Salad ──
  {
    name: 'Salad',
    icon: '🥗',
    items: [
      { id: 128, name: 'Caesar Salad',              description: 'Romaine, croutons, parmesan & Caesar dressing', price: 199, image: 'assets/images/item-128.jpg' },
      { id: 129, name: 'Creamy & Crunchy Salad',    description: 'Mixed greens with creamy crunchy toppings',     price: 199, image: 'assets/images/item-129.jpg' },
      { id: 130, name: 'Mix Green Leaves',          description: 'Fresh garden greens lightly dressed',           price: 199, image: 'assets/images/item-130.jpg' },
      { id: 131, name: 'Mix Green with Balsamic',   description: 'Garden greens with balsamic vinaigrette',       price: 199, image: 'assets/images/item-131.jpg' },
      { id: 132, name: 'Mix Fruit Salad',           description: 'Seasonal fresh fruit salad bowl',               price: 199, image: 'assets/images/item-132.jpg' }
    ]
  },

  // ── Sandwich & Burger ──
  {
    name: 'Sandwich & Burger',
    icon: '🍔',
    items: [
      { id: 133, name: 'Plain Sandwich',           description: 'Classic veg plain sandwich',               price: 99,  image: 'assets/images/item-133.jpg' },
      { id: 134, name: 'Veg Burger Lite',          description: 'Light & fresh veg patty burger',           price: 59,  image: 'assets/images/item-134.jpg' },
      { id: 135, name: 'Veg Burger Classic',       description: 'Loaded classic veg burger with sauce',     price: 159, image: 'assets/images/item-135.jpg' },
      { id: 136, name: 'Chicken Burger',           description: 'Crispy chicken fillet burger',             price: 199, image: 'assets/images/item-136.jpg' },
      { id: 137, name: 'Paneer Loaded Sandwich',   description: 'Grilled paneer loaded club sandwich',      price: 199, image: 'assets/images/item-137.jpg' },
      { id: 138, name: 'Veg Club Sandwich',        description: 'Triple-decker classic veg club',           price: 199, image: 'assets/images/item-138.jpg' },
      { id: 139, name: 'Chicken Club Sandwich',    description: 'Grilled chicken triple-decker club',       price: 199, image: 'assets/images/item-139.jpg' },
      { id: 140, name: 'Garlic Bread',             description: 'Toasted garlic herb butter bread',         price: 89,  image: 'assets/images/item-140.jpg' },
      { id: 141, name: 'Cheese Garlic Bread',      description: 'Garlic bread topped with melted cheese',   price: 99,  image: 'assets/images/item-141.jpg' },
      { id: 142, name: 'American Corn Special',    description: 'Loaded American corn sandwich special',    price: 199, image: 'assets/images/item-142.jpg' }
    ]
  },

  // ── Signature Rice Bowls ──
  {
    name: 'Rice Bowls',
    icon: '🍚',
    items: [
      { id: 143, name: 'Grilled Chicken Rice Bowl', description: 'Herb-grilled chicken over seasoned rice', price: 399, image: 'assets/images/item-143.jpg' },
      { id: 144, name: 'Fish Rice Bowl',             description: 'Pan-seared fish over flavoured rice',     price: 399, image: 'assets/images/item-144.jpg' },
      { id: 145, name: 'Cottage Cheese Bowl',        description: 'Paneer & veggies over fragrant rice',     price: 349, image: 'assets/images/item-145.jpg' }
    ]
  },

  // ── Soups ──
  {
    name: 'Soups',
    icon: '🍲',
    items: [
      { id: 146, name: 'Hot & Sour Soup',      description: 'Classic tangy spicy Indo-Chinese soup',   price: 199, image: 'assets/images/item-146.jpg' },
      { id: 147, name: 'Veg Manchow Soup',     description: 'Crispy noodle topped veg Manchow',        price: 149, image: 'assets/images/item-147.jpg' },
      { id: 148, name: 'Sweet Corn Soup',      description: 'Creamy sweet corn soup',                  price: 149, image: 'assets/images/item-148.jpg' },
      { id: 149, name: 'Broccoli Spinach Soup',description: 'Healthy blended broccoli spinach soup',   price: 170, image: 'assets/images/item-149.jpg' }
    ]
  },

  // ── Omelette ──
  {
    name: 'Omelette',
    icon: '🍳',
    items: [
      { id: 150, name: 'Triple Cheese Omelette',    description: 'Three-cheese stuffed fluffy omelette',    price: 120, image: 'assets/images/item-150.jpg' },
      { id: 151, name: 'Greek Omelette',            description: 'Feta, olives & herbs Greek style',        price: 140, image: 'assets/images/item-151.jpg' },
      { id: 152, name: 'Poached Egg with Bread',    description: 'Perfect poached eggs on toasted bread',   price: 120, image: 'assets/images/item-152.jpg' },
      { id: 153, name: 'Scrambled Omelette',        description: 'Fluffy scrambled eggs with toast',        price: 130, image: 'assets/images/item-153.jpg' },
      { id: 154, name: 'Sunny Side Up with Toast',  description: 'Classic sunny side up with buttered toast', price: 150, image: 'assets/images/item-154.jpg' }
    ]
  },

  // ── Maggi ──
  {
    name: 'Maggi',
    icon: '🍜',
    items: [
      { id: 155, name: 'Plain Maggi',      description: 'Classic Maggi cooked to perfection',     price: 99,  image: 'assets/images/item-155.jpg' },
      { id: 156, name: 'Masala Maggi',     description: 'Spicy masala tossed Maggi noodles',      price: 125, image: 'assets/images/item-156.jpg' },
      { id: 157, name: 'Cheese Maggi',     description: 'Maggi smothered in melted cheese',        price: 129, image: 'assets/images/item-157.jpg' },
      { id: 158, name: 'Vegetable Maggi',  description: 'Maggi loaded with fresh veggies',        price: 175, image: 'assets/images/item-158.jpg' }
    ]
  },

  // ── Keema ──
  {
    name: 'Keema',
    icon: '🥘',
    items: [
      { id: 159, name: 'Keema Chicken Pao',   description: 'Spiced chicken keema with soft pao bun', price: 199, image: 'assets/images/item-159.jpg' },
      { id: 160, name: 'Keema Chicken Toast',  description: 'Spiced chicken mince on crispy toast',   price: 199, image: 'assets/images/item-160.jpg' }
    ]
  },

  // ── Pancakes ──
  {
    name: 'Pancakes',
    icon: '🥞',
    items: [
      { id: 161, name: 'Blue Berry Pancake', description: 'Fluffy pancakes with fresh blueberries',   price: 159, image: 'assets/images/item-161.jpg' },
      { id: 162, name: 'Nutella Pancake',    description: 'Soft pancakes drizzled with Nutella',      price: 159, image: 'assets/images/item-162.jpg' },
      { id: 163, name: 'Biscoff Pancake',    description: 'Pancakes with Lotus Biscoff spread',       price: 199, image: 'assets/images/item-163.jpg' }
    ]
  },

  // ── Combos ──
  {
    name: 'Combos',
    icon: '🎁',
    items: [
      { id: 164, name: 'Veg Manchurian + Fried Rice',       description: 'Veg Manchurian (5 Pcs) + Veg Fried Rice',         price: 179, image: 'assets/images/item-164.jpg' },
      { id: 165, name: 'Paneer Chilli + Fried Rice',        description: 'Paneer Chilli (4 Pcs) + Veg Fried Rice',          price: 189, image: 'assets/images/item-165.jpg' },
      { id: 166, name: 'Chicken Chilli + Fried Rice',       description: 'Chicken Chilli (4 Pcs) + Fried Rice',             price: 210, image: 'assets/images/item-166.jpg' },
      { id: 167, name: 'Chicken Manchurian + Chicken Rice', description: 'Chicken Manchurian (4 Pcs) + Chicken Fried Rice', price: 210, image: 'assets/images/item-167.jpg' },
      { id: 168, name: 'Paneer Chilli + Veg Noodles',       description: 'Paneer Chilli (4 Pcs) + Veg Noodles',            price: 189, image: 'assets/images/item-168.jpg' },
      { id: 169, name: 'Chicken Chilli + Sezwan Noodles',   description: 'Chicken Chilli (4 Pcs) + Sezwan Noodles',        price: 210, image: 'assets/images/item-169.jpg' },
      { id: 170, name: 'French Fries + Virgin Mojito',      description: 'Crispy fries paired with fresh mojito',           price: 139, image: 'assets/images/item-170.jpg' }
    ]
  }

];
