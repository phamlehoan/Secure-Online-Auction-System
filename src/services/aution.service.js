import AuctionLogModel from "../models/auctionlog.model";

const AuctionService = {};

/**
 * find all bidding products with newest price
 * @param {String} userId 
 */
AuctionService.findNewestBiddingProducts = async (userId) => {
    let productsWithHighestPrice = await AuctionLogModel.aggregate([
        {
            $match: {
                userId: userId.toString()
            }
        },
        {
            $group: {
                _id: {
                    'productId': "$productId",
                    'productImage': "$productImage",
                    'productName': '$productName',
                    'createAt': '$createAt'
                },
                price: {
                    $max: "$price"
                },
            }
        },
        {
            $sort: {
                createAt: -1
            }
        }
    ]);

    return productsWithHighestPrice;
}

AuctionService.countNumberOfAuctions = async (userId) => {
    let auction = await AuctionLogModel.aggregate([
        {
            $match: {
                userId: userId.toString()
            }
        },
        {
            $group: {
                _id: {
                    'productId': "$productId",
                    'productImage': "$productImage",
                    'productName': '$productName',
                    'createAt': '$createAt'
                },
                price: {
                    $max: "$price"
                },
            }
        },
        {
            $sort: {
                createAt: -1
            }
        }
    ]);
    
    return auction.length;
}

/**
 * 
 * @param {String} productId
 * @returns {Product} Product with highest price
 */
AuctionService.findHighestPrice = async (productId) => {
    return await AuctionLogModel.find({productId}).sort({price: 1}).limit(1);
}

export default AuctionService;
