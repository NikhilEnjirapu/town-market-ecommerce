package com.example.backend.config;

import com.example.backend.model.Category;
import com.example.backend.model.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        seedCategories();
        seedProducts();
    }

    private void seedCategories() {
        if (categoryRepository.count() > 0) {
            return;
        }

        Category produce = createCategory(
                "cat-produce",
                "Fresh Produce",
                "Handpicked fruits & vegetables sourced daily",
                "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg"
        );

        Category essentials = createCategory(
                "cat-essentials",
                "Daily Essentials",
                "Everything for your morning ritual",
                "https://images.pexels.com/photos/3737697/pexels-photo-3737697.jpeg"
        );

        Category snacks = createCategory(
                "cat-snacks",
                "Snacks & Beverages",
                "Artisan munchies and refreshing drinks",
                "https://images.pexels.com/photos/6419744/pexels-photo-6419744.jpeg"
        );

        categoryRepository.saveAll(List.of(produce, essentials, snacks));
    }

    private void seedProducts() {
        if (productRepository.count() > 0) {
            return;
        }

        Product mangoBox = createProduct(
                "prod-mango",
                "Alphonso Mango Box",
                "Sweet, premium Alphonso mangoes (3kg)",
                999,
                "https://images.pexels.com/photos/5945665/pexels-photo-5945665.jpeg",
                "cat-produce",
                25,
                true
        );

        Product microgreens = createProduct(
                "prod-microgreens",
                "Organic Microgreens Mix",
                "Chef-style garnish pack (4 varieties)",
                349,
                "https://images.pexels.com/photos/1435893/pexels-photo-1435893.jpeg",
                "cat-produce",
                40,
                false
        );

        Product breakfastCombo = createProduct(
                "prod-breakfast",
                "Breakfast Essentials Combo",
                "Sourdough loaf + farm butter + jam",
                799,
                "https://images.pexels.com/photos/4686354/pexels-photo-4686354.jpeg",
                "cat-essentials",
                30,
                true
        );

        Product dairySet = createProduct(
                "prod-dairy",
                "Craft Dairy Set",
                "A2 milk, almond milk and probiotic yogurt",
                649,
                "https://images.pexels.com/photos/6207481/pexels-photo-6207481.jpeg",
                "cat-essentials",
                20,
                false
        );

        Product snackCrate = createProduct(
                "prod-snackcrate",
                "Gourmet Snack Crate",
                "Imported crisps, dips and dark chocolate",
                1199,
                "https://images.pexels.com/photos/4109237/pexels-photo-4109237.jpeg",
                "cat-snacks",
                15,
                true
        );

        Product coldPress = createProduct(
                "prod-coldpress",
                "Cold-Pressed Juice Trio",
                "Detox, Glow and Immunity blend (250ml x 3)",
                459,
                "https://images.pexels.com/photos/594708/pexels-photo-594708.jpeg",
                "cat-snacks",
                45,
                false
        );

        Product cheeseBoard = createProduct(
                "prod-cheese",
                "Artisan Cheese Board",
                "Truffle brie, aged cheddar, olives and crackers",
                1349,
                "https://images.pexels.com/photos/1872881/pexels-photo-1872881.jpeg",
                "cat-snacks",
                12,
                true
        );

        Product teaCeremony = createProduct(
                "prod-tea",
                "Evening Tea Ceremony Set",
                "Assorted herbal teas with honey & biscotti",
                599,
                "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg",
                "cat-essentials",
                35,
                false
        );

        Product midnightDessert = createProduct(
                "prod-dessert",
                "Midnight Dessert Medley",
                "Mini cheesecakes, macarons and tiramisu jars",
                899,
                "https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg",
                "cat-snacks",
                18,
                true
        );

        Product cleaningHamper = createProduct(
                "prod-cleaning",
                "Eco Cleaning Hamper",
                "Plant-based cleaners, microfiber cloths and reusable wipes",
                549,
                "https://images.pexels.com/photos/4197149/pexels-photo-4197149.jpeg",
                "cat-essentials",
                28,
                false
        );

        Product avocadoBox = createProduct(
                "prod-avocado",
                "Premium Avocado Box",
                "Ripe Hass avocados (6 pieces)",
                399,
                "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg",
                "cat-produce",
                50,
                true
        );

        Product berriesMix = createProduct(
                "prod-berries",
                "Mixed Berries Pack",
                "Fresh strawberries, blueberries, raspberries (500g)",
                299,
                "https://images.pexels.com/photos/4065878/pexels-photo-4065878.jpeg",
                "cat-produce",
                35,
                false
        );

        Product saladGreens = createProduct(
                "prod-salad",
                "Organic Salad Greens",
                "Mixed lettuce, spinach, arugula (1kg)",
                199,
                "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
                "cat-produce",
                60,
                false
        );

        Product tropicalFruits = createProduct(
                "prod-tropical",
                "Tropical Fruits Basket",
                "Pineapple, papaya, passion fruits, dragon fruit",
                599,
                "https://images.pexels.com/photos/1128350/pexels-photo-1128350.jpeg",
                "cat-produce",
                25,
                true
        );

        Product heirloomTomatoes = createProduct(
                "prod-tomatoes",
                "Heirloom Tomatoes",
                "Colorful heirloom tomatoes (500g)",
                249,
                "https://images.pexels.com/photos/1344087/pexels-photo-1344087.jpeg",
                "cat-produce",
                40,
                false
        );

        Product artisanBread = createProduct(
                "prod-bread",
                "Artisan Bread Collection",
                "Sourdough, ciabatta, rye (3 loaves)",
                449,
                "https://images.pexels.com/photos/326432/pexels-photo-326432.jpeg",
                "cat-essentials",
                20,
                false
        );

        Product honeyJar = createProduct(
                "prod-honey",
                "Raw Honey Collection",
                "Wildflower, manuka, and clover honey (3 jars)",
                799,
                "https://images.pexels.com/photos/1356433/pexels-photo-1356433.jpeg",
                "cat-essentials",
                30,
                true
        );

        Product coffeeBeans = createProduct(
                "prod-coffee",
                "Single-Origin Coffee Beans",
                "Ethiopian, Colombian, Guatemalan (3x250g)",
                1299,
                "https://images.pexels.com/photos/982629/pexels-photo-982629.jpeg",
                "cat-essentials",
                15,
                true
        );

        Product pastaSet = createProduct(
                "prod-pasta",
                "Artisan Pasta Set",
                "Handmade fettuccine, pappardelle, gnocchi",
                349,
                "https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg",
                "cat-essentials",
                45,
                false
        );

        Product oliveOil = createProduct(
                "prod-oil",
                "Premium Olive Oil Set",
                "Extra virgin, infused, and aged olive oils",
                899,
                "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg",
                "cat-essentials",
                25,
                true
        );

        Product nutsBox = createProduct(
                "prod-nuts",
                "Gourmet Nuts Collection",
                "Almonds, cashews, pistachios, walnuts (1kg)",
                699,
                "https://images.pexels.com/photos/1593838/pexels-photo-1593838.jpeg",
                "cat-snacks",
                40,
                false
        );

        Product chocolateBox = createProduct(
                "prod-chocolate",
                "Artisan Chocolate Box",
                "Belgian dark, milk, and white chocolates (500g)",
                549,
                "https://images.pexels.com/photos/1998648/pexels-photo-1998648.jpeg",
                "cat-snacks",
                30,
                true
        );

        Product sparklingWater = createProduct(
                "prod-water",
                "Premium Sparkling Water",
                "Imported sparkling water with natural flavors (12 bottles)",
                399,
                "https://images.pexels.com/photos/3109452/pexels-photo-3109452.jpeg",
                "cat-snacks",
                80,
                false
        );

        Product proteinBars = createProduct(
                "prod-bars",
                "Protein Energy Bars",
                "Chocolate peanut butter, almond, berry flavors (12 bars)",
                449,
                "https://images.pexels.com/photos/1514994/pexels-photo-1514994.jpeg",
                "cat-snacks",
                50,
                false
        );

        Product kombuchaSet = createProduct(
                "prod-kombucha",
                "Craft Kombucha Variety",
                "Ginger, berry, citrus flavors (6 bottles)",
                599,
                "https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg",
                "cat-snacks",
                35,
                true
        );

        productRepository.saveAll(List.of(
                mangoBox,
                microgreens,
                breakfastCombo,
                dairySet,
                snackCrate,
                coldPress,
                cheeseBoard,
                teaCeremony,
                midnightDessert,
                cleaningHamper,
                avocadoBox,
                berriesMix,
                saladGreens,
                tropicalFruits,
                heirloomTomatoes,
                artisanBread,
                honeyJar,
                coffeeBeans,
                pastaSet,
                oliveOil,
                nutsBox,
                chocolateBox,
                sparklingWater,
                proteinBars,
                kombuchaSet
        ));
    }

    private Category createCategory(String id, String name, String description, String imageUrl) {
        Category category = new Category();
        category.setId(id);
        category.setName(name);
        category.setDescription(description);
        category.setImage_url(imageUrl);
        category.setCreated_at(String.valueOf(System.currentTimeMillis()));
        return category;
    }

    private Product createProduct(String id, String name, String description, double price, String imageUrl,
                                  String categoryId, int stock, boolean featured) {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImage_url(imageUrl);
        product.setCategory_id(categoryId);
        product.setStock(stock);
        product.setFeatured(featured);
        product.setCreated_at(String.valueOf(System.currentTimeMillis()));
        return product;
    }
}
