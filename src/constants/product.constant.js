const PRODUCT_CONSTANTS = {
    categories: [
        {name: "REAL ESTATE", code: "1", value:"Real Estate"},
        {name: "CLOTHES", code: "2", value:"Clothes"},
        {name: "VEHICLES", code: "3", value:"Vehicles"},
        {name: "ELECTRONIC", code: "4", value:"Electronic"},
        {name: "FURNITURES", code: "5", value:"Furnitures"},
        {name: "KID & TOYS", code: "6", value:"Kid & Toys"},
        {name: "FASHION", code: "7", value:"Fashion"},
        {name: "TRAVEL", code: "8", value:"Travel"},
        {name: "SPORT", code: "9", value:"Sport"},
        {name: "TOOLS", code: "10", value:"Tools"},
        {name: "GROCERIES", code: "11", value:"Groceries"}
        
    ],
    priceMethod: [
        {name: "INCR", code: "1"},
        {name: "DECR", code: "2"},
    ],
    productStatus: [
        {name: "PENDING", code: "1", value: "Pending"},
        {name: "BANNED", code: "2", value: "Banned"},
        {name: "VERIFIED", code: "3", value: "Verify"},
    ]
} 

module.exports = PRODUCT_CONSTANTS;
