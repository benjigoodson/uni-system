var conn = new Mongo();
db = conn.getDB("shop-system");
db = db.getSiblingDB("shop-system");

var outcome = true;

///////////// DEFAULT VALUES /////////////

// Product names
var productNames = ["Apple","Orange","TV","IPhone","Laptop","Desktop","Wine","Vodka","Pineapple","Yoghurt","Milk","Bread","Chicken Nuggets"];

// Shop locations
var shopLocations = ["London","Manchester","Newcastle","Sunderland","Durham","Liverpool","Peterborough","Glasgow","Edinburgh"];

// Transaction Types
var transactionTypes = ["CASH", "DEBIT_CARD", "CREDIT_CARD","LATE_PAYMENT"];

var NUM_SHOPS = 5;
var NUM_PRODUCTS_PER_SHOP = 8;
var NUM_TRANSACTIONS = 20;
var MAX_PRODUCTS_PER_TRANSACTION = 5;

// Remove all data
db.shop.drop();
print("Dropped shop collection.");

db.product.drop();
print("Dropped product collection.");

db.transaction.drop();
print("Dropped transaction collection.");


print("\nAll existing data has been removed.\n");





//// Products ////
var newProducts = [];

for(var productCount = 0; productCount < productNames.length; productCount++) {
    var newProduct = {};
    newProduct.name = productNames[productCount];
    newProduct.price = getRandomNumber(0.5, 50);

    newProducts.push(newProduct);
};

db.product.insert(newProducts);

var products = db.product.find().toArray();

// Check all products have been inserted
if(productNames.length == products.length) {
    print(productNames.length + " products have been created.");
} else {
    print("Not all products created!");
    outcome = false;
}




//// Shops ////
var newShops = [ ];

for(var shopCount = 0; shopCount < NUM_SHOPS; shopCount++) {
    var newShop = {};

    newShop.name = "shop" + shopCount;
    newShop.location = getRandomValue(shopLocations);
    newShop.numStaff = getRandomNumber(5, 35);

    newShop.products = [];

    for(var shopProdCount = 0; shopProdCount < NUM_PRODUCTS_PER_SHOP; shopProdCount++) {

        var index = getRandomNumber(0, products.length);

        var product = {};
        product._id = products[index]._id;
        product.name = products[index].name;

        newShop.products.push(product);
    }

    newShops.push(newShop);
};

db.shop.insert(newShops);

var shops = db.shop.find().toArray();

// Check all shops have been inserted
if(NUM_SHOPS == shops.length) {
    print(NUM_SHOPS + " shops have been created.");
} else {
    print("Not all shops created!");
    outcome = false;
}




//// Transactions ////
var newTransactions = [ ];

// For each shop
for(var transactionCounter = 0; transactionCounter < shops.length; transactionCounter++) {

    var transactionShop = shops[transactionCounter];

    for(var transactionCount = 0; transactionCount < NUM_TRANSACTIONS; transactionCount++) {
        var newTransaction = {};

        newTransaction.shopName = transactionShop.name;
        newTransaction.shopId = transactionShop._id;
        newTransaction.type = getRandomValue(transactionTypes);

        newTransaction.products = [];

        var numOfProducts = getRandomNumber(1, MAX_PRODUCTS_PER_TRANSACTION);

        var total = 0;

        for(var productCount = 0; productCount < numOfProducts; productCount++) {
            
            var product = getRandomValue(transactionShop.products);

            var quantity = getRandomNumber(1, 20);
            total =+ quantity;

            newTransaction.products.push({name : product.name, id : product._id, quantity : quantity});

        }

        // Generate a random price
        newTransaction.price = (total * getRandomNumber(10, 100));
        
        db.transaction.insert(newTransaction);

    }

}

var transactions = db.transaction.find().toArray();

// Check all transactions have been inserted
print(NUM_TRANSACTIONS + " transactions have been created for each shop.");



//// Private functions ////

// Get a random value
function getRandomValue(passedArray) {
    if(passedArray && passedArray.length > 0) {
        return passedArray[getRandomNumber(0, passedArray.length)];
    } else {
        return null;
    }
};

// Random number generator
function getRandomNumber(lower, upper) {
    return Math.floor((Math.random() * upper) + lower); 
};


print("\nHas it ran correctly? " + outcome);