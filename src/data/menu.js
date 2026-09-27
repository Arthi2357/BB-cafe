// Brew Blue Cafe - Menu Data
// NOTE: Prices are currently set to "Price available at cafe" as requested.
// Once actual menu pricing is confirmed, update the price strings below.

export const MENU_CATEGORIES = [
  { id: "all", name: "All Items", icon: "UtensilsCrossed", count: 48 },
  { id: "signature", name: "Signature Brews", icon: "Sparkles", count: 3 },
  { id: "beverages", name: "Shakes & Beverages", icon: "Coffee", count: 21 },
  { id: "pizza", name: "Artisan Pizza", icon: "Flame", count: 6 },
  { id: "toast", name: "Toast Bar", icon: "Sandwich", count: 6 },
  { id: "snacks", name: "Fries & Snacks", icon: "Popcorn", count: 7 },
  { id: "bowls", name: "Bowls & Pasta", icon: "Soup", count: 7 },
  { id: "small-plates", name: "Small Plates", icon: "Salad", count: 1 },
];

export const MENU_ITEMS = [
  // Signature Brews
  {
    id: "sig-1",
    name: "Caramel Cappuccino",
    category: "signature",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "House Signature",
    description: "Espresso steeped with silky microfoam milk, folded with golden buttery caramel drizzle.",
    modelType: "coffee",
    color: "#E59866"
  },
  {
    id: "sig-2",
    name: "Brew Blue Iced Coffee",
    category: "signature",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Must Try",
    description: "Our signature cold extraction poured over crystal ice with subtle condensed creaminess.",
    modelType: "coffee",
    color: "#2E86C1"
  },
  {
    id: "sig-3",
    name: "Affogato",
    category: "signature",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Artisan Dessert",
    description: "Velvety vanilla bean gelato drowned in a piping hot shot of freshly extracted espresso.",
    modelType: "coffee",
    color: "#884EA0"
  },

  // Artisan Pizza
  {
    id: "pz-1",
    name: "Margherita Pizza",
    category: "pizza",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Classic",
    description: "San Marzano style tomato reduction, melted fresh mozzarella, and fragrant basil glaze.",
    modelType: "pizza",
    color: "#E74C3C"
  },
  {
    id: "pz-2",
    name: "Cheese Pizza",
    category: "pizza",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Crowd Favorite",
    description: "Indulgent triple-cheese blend with golden caramelized crust edges and herb seasoning.",
    modelType: "pizza",
    color: "#F39C12"
  },
  {
    id: "pz-3",
    name: "Paneer Pizza",
    category: "pizza",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Popular",
    description: "Tender spiced paneer cubes, roasted bell peppers, red onions, and melted mozzarella.",
    modelType: "pizza",
    color: "#D35400"
  },
  {
    id: "pz-4",
    name: "Chicken Pizza",
    category: "pizza",
    price: "Price available at cafe",
    isVeg: false,
    isSignature: false,
    badge: "Chef's Special",
    description: "Herb-marinated grilled chicken breast, smoky barbecue glaze, onions, and stringy cheese.",
    modelType: "pizza",
    color: "#C0392B"
  },
  {
    id: "pz-5",
    name: "Jalapeño Pizza",
    category: "pizza",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Spicy",
    description: "Pickled Mexican jalapeños, sweet corn, cheddar-mozzarella blend, and chili flakes.",
    modelType: "pizza",
    color: "#27AE60"
  },
  {
    id: "pz-6",
    name: "Fries on Pizza",
    category: "pizza",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Unique",
    description: "Crispy salted French fries layered over molten cheesy pizza base with garlic mayo swirl.",
    modelType: "pizza",
    color: "#F1C40F"
  },

  // Shakes & Beverages
  {
    id: "bev-1",
    name: "Coffee Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Top Rated",
    description: "Chilled robust espresso whipped with thick ice cream and dark cocoa swirl.",
    modelType: "shake",
    color: "#6E2C00"
  },
  {
    id: "bev-2",
    name: "Oreo Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Bestseller",
    description: "Crushed Oreo biscuits blended into creamy vanilla milk with chocolate cookie crumbs.",
    modelType: "shake",
    color: "#2C3E50"
  },
  {
    id: "bev-3",
    name: "Biscoff Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Trending",
    description: "Lotus Biscoff spread whipped into caramelized spiced biscuit thick shake.",
    modelType: "shake",
    color: "#BA4A00"
  },
  {
    id: "bev-4",
    name: "Brownie Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Decadent",
    description: "Warm fudgy brownie blended into rich Belgian chocolate milkshake.",
    modelType: "shake",
    color: "#4A235A"
  },
  {
    id: "bev-5",
    name: "Vanilla Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Classic",
    description: "Silky Madagascar vanilla bean whipped with fresh chilled milk.",
    modelType: "shake",
    color: "#FDFEFE"
  },
  {
    id: "bev-6",
    name: "Strawberry Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Fruity",
    description: "Real strawberry compote blended into smooth pink creamy milkshake.",
    modelType: "shake",
    color: "#E91E63"
  },
  {
    id: "bev-7",
    name: "Alphonso Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Tropical",
    description: "Ripe golden Alphonso mango puree swirled with thick sweet milk.",
    modelType: "shake",
    color: "#FFA000"
  },
  {
    id: "bev-8",
    name: "Belgian Chocolate Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Rich",
    description: "Deep dark 70% Belgian cocoa ganache infused with velvety ice cream.",
    modelType: "shake",
    color: "#3E2723"
  },
  {
    id: "bev-9",
    name: "Blackcurrant Shake",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Tangy Sweet",
    description: "Wild blackcurrant berry blitzed with creamy ice cream for a vibrant purple treat.",
    modelType: "shake",
    color: "#8E24AA"
  },
  {
    id: "bev-10",
    name: "Espresso",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Intense",
    description: "Single or double shot extracted with rich golden crema and nutty notes.",
    modelType: "coffee",
    color: "#212F3D"
  },
  {
    id: "bev-11",
    name: "Americano",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Bold",
    description: "Double espresso pulled over hot water for a crisp, clean aromatic brew.",
    modelType: "coffee",
    color: "#34495E"
  },
  {
    id: "bev-12",
    name: "Cappuccino",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Barista Favorite",
    description: "Equal balance of dark espresso, steamed milk, and velvety frothy cap.",
    modelType: "coffee",
    color: "#D35400"
  },
  {
    id: "bev-13",
    name: "Coffee",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "All-Day",
    description: "Traditional wholesome milk coffee prepared with premium Arabica roast.",
    modelType: "coffee",
    color: "#795548"
  },
  {
    id: "bev-14",
    name: "Madras Chai",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "South Indian Classic",
    description: "Authentic strong steeped tea decoction aerated with rich boiling milk and cardamom.",
    modelType: "coffee",
    color: "#D4AC0D"
  },
  {
    id: "bev-15",
    name: "Lemon Tea",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Refreshing",
    description: "Golden brewed black tea scented with fresh squeezed lime and honey warmth.",
    modelType: "coffee",
    color: "#F4D03F"
  },
  {
    id: "bev-16",
    name: "Boost",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Nostalgic",
    description: "Malted energy chocolate drink frothed with piping hot fresh milk.",
    modelType: "coffee",
    color: "#E67E22"
  },
  {
    id: "bev-17",
    name: "Horlicks",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Comfort",
    description: "Warm soothing malted cereal milk with gentle caramel sweetness.",
    modelType: "coffee",
    color: "#F9E79F"
  },
  {
    id: "bev-18",
    name: "House Hot Chocolate",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Winter Warmth",
    description: "Thick melted cocoa infused with steamed whole milk and chocolate dust.",
    modelType: "coffee",
    color: "#4E342E"
  },
  {
    id: "bev-19",
    name: "Classic Mojito",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Chilled",
    description: "Muddled fresh mint leaves, zesty lime wedges, simple syrup, and sparkling soda.",
    modelType: "shake",
    color: "#2ECC71"
  },
  {
    id: "bev-20",
    name: "Iced Peach Lemon Tea",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Cooler",
    description: "Fragrant sweet peach nectar blended with iced Ceylon tea and citrus slices.",
    modelType: "shake",
    color: "#EDBB99"
  },
  {
    id: "bev-21",
    name: "Coke – 250 ml",
    category: "beverages",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Chilled Can",
    description: "Served ice cold with lemon wedge upon request.",
    modelType: "shake",
    color: "#C0392B"
  },

  // Toast Bar
  {
    id: "tst-1",
    name: "Garlic Cheese Toast",
    category: "toast",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "House Favorite",
    description: "Toasted artisan sourdough rubbed with roasted garlic butter and crusted with golden cheddar.",
    modelType: "pizza",
    color: "#F39C12"
  },
  {
    id: "tst-2",
    name: "Cheese Corn Toast",
    category: "toast",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Cozy",
    description: "Sweet golden American corn kernels smothered with herbs and melting mozzarella.",
    modelType: "pizza",
    color: "#F7DC6F"
  },
  {
    id: "tst-3",
    name: "Tandoori Paneer Toast",
    category: "toast",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Zesty",
    description: "Smoky tandoori marinated cottage cheese, crunchy onions, and spicy mint mayo on sourdough.",
    modelType: "pizza",
    color: "#E67E22"
  },
  {
    id: "tst-4",
    name: "Jalapeño Cheese Toast",
    category: "toast",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Fiery",
    description: "Spicy pickled jalapeños baked over thick aged cheese on crusty rustic bread.",
    modelType: "pizza",
    color: "#27AE60"
  },
  {
    id: "tst-5",
    name: "Crispy Chicken Toast",
    category: "toast",
    price: "Price available at cafe",
    isVeg: false,
    isSignature: true,
    badge: "Savory Crunch",
    description: "Crispy seasoned chicken strips, house burger dressing, and melted cheese on toast.",
    modelType: "pizza",
    color: "#D35400"
  },
  {
    id: "tst-6",
    name: "Egg Toast",
    category: "toast",
    price: "Price available at cafe",
    isVeg: false,
    isSignature: false,
    badge: "Protein Rich",
    description: "Farm fresh eggs pan-folded with onions, green chilies, and melted pepper cheese.",
    modelType: "pizza",
    color: "#F9E79F"
  },

  // Fries & Snacks
  {
    id: "snk-1",
    name: "Classic Fries",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Crispy",
    description: "Golden fried potato batons seasoned with sea salt crystals and served with dipping sauce.",
    modelType: "fries",
    color: "#F1C40F"
  },
  {
    id: "snk-2",
    name: "Peri Peri Fries",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Spicy Crunch",
    description: "Crisp fries tossed generously in African Bird's eye chili spice rub.",
    modelType: "fries",
    color: "#E74C3C"
  },
  {
    id: "snk-3",
    name: "Truffle Fries",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Gourmet",
    description: "Shoestring fries drizzled with black truffle essence, fresh parsley, and parmesan.",
    modelType: "fries",
    color: "#B7950B"
  },
  {
    id: "snk-4",
    name: "Jalapeño Cheese Balls",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Molten Center",
    description: "Golden breaded spheres filled with oozy melted cheddar and spicy diced jalapeño.",
    modelType: "fries",
    color: "#F5B041"
  },
  {
    id: "snk-5",
    name: "Onion Rings",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Crisp Batter",
    description: "Thick cut sweet Spanish onion slices dipped in beer-style batter and fried golden.",
    modelType: "fries",
    color: "#DC7633"
  },
  {
    id: "snk-6",
    name: "Potato Wedges",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Rustic",
    description: "Skin-on thick potato wedges tossed with garlic, rosemary, and paprika.",
    modelType: "fries",
    color: "#BA4A00"
  },
  {
    id: "snk-7",
    name: "Chicken Popcorn",
    category: "snacks",
    price: "Price available at cafe",
    isVeg: false,
    isSignature: true,
    badge: "Bite Sized",
    description: "Tender chicken morsels encased in extra-crispy seasoned batter with garlic dip.",
    modelType: "fries",
    color: "#C0392B"
  },

  // Small Plates
  {
    id: "sml-1",
    name: "Corn Chaat",
    category: "small-plates",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Zesty & Fresh",
    description: "Steamed sweet corn kernels tossed with lemon butter, chaat masala, diced red onions, and fresh coriander.",
    modelType: "fries",
    color: "#27AE60"
  },

  // Bowls & Pasta
  {
    id: "bwl-1",
    name: "Masala Maggi",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Comfort Bowl",
    description: "Soul-satisfying noodles cooked with roasted aromatic spices, diced peas, and carrots.",
    modelType: "pizza",
    color: "#F39C12"
  },
  {
    id: "bwl-2",
    name: "Cheese Maggi",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Cheesy Delight",
    description: "Piping hot spiced Maggi folded with double processed cheese for ultimate comfort.",
    modelType: "pizza",
    color: "#F4D03F"
  },
  {
    id: "bwl-3",
    name: "Burn Baby Bowl",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Extra Hot",
    description: "Fiery spicy noodles loaded with chili oil, toasted sesame, and crisp spring onions.",
    modelType: "pizza",
    color: "#922B21"
  },
  {
    id: "bwl-4",
    name: "Brew Blue Buldak",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Korean Fusion",
    description: "Smoky spicy Korean fire noodle bowl balanced with sweet corn and melted cheese.",
    modelType: "pizza",
    color: "#B03A2E"
  },
  {
    id: "bwl-5",
    name: "White Sauce Pasta",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Creamy Alfredo",
    description: "Penne pasta simmered in rich garlic parmesan bechamel sauce with sautéed mushrooms.",
    modelType: "pizza",
    color: "#EBEDEF"
  },
  {
    id: "bwl-6",
    name: "Masala Pasta",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: false,
    badge: "Desi Fusion",
    description: "Penne tossed in a tangy spicy Indian onion-tomato sauce with bell peppers.",
    modelType: "pizza",
    color: "#D35400"
  },
  {
    id: "bwl-7",
    name: "Mac & Cheese",
    category: "bowls",
    price: "Price available at cafe",
    isVeg: true,
    isSignature: true,
    badge: "Rich & Baked",
    description: "Elbow macaroni enveloped in velvety cheddar cheese sauce baked with herb breadcrumb crust.",
    modelType: "pizza",
    color: "#F5B041"
  }
];

// Highlight showcase items for 3D interactive stage
export const FEATURED_SHOWCASE = [
  {
    id: "sig-1",
    title: "Caramel Cappuccino",
    tagline: "Slow-poured artisanal roast with golden caramel crest",
    modelType: "coffee",
    color: "#D4AC0D",
    category: "Signature Brews",
    tag: "Aroma of the Day"
  },
  {
    id: "pz-6",
    title: "Fries on Pizza",
    tagline: "Crisp potato batons over molten mozzarella base",
    modelType: "pizza",
    color: "#E67E22",
    category: "Artisan Pizza",
    tag: "Cafe Original"
  },
  {
    id: "bev-3",
    title: "Biscoff Shake",
    tagline: "Thick caramelized biscuit shake with crushed crumble",
    modelType: "shake",
    color: "#BA4A00",
    category: "Shakes & Beverages",
    tag: "Trending Indulgence"
  },
  {
    id: "snk-2",
    title: "Peri Peri Fries",
    tagline: "Tossed in fiery African spice rub with cooling dip",
    modelType: "fries",
    color: "#C0392B",
    category: "Fries & Snacks",
    tag: "Crispy Obsession"
  }
];
