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
    ]).count('price');
    if (auction.length < 1)
        return 0;
    return auction[0].price;
}

/**
 * find current highest price || user_id of bidded product
 *
 * @param {String} productId
 * @returns {Product} Product
 */
AuctionService.findHighestPrice = async (productId) => {
    return await AuctionLogModel.find({productId})
    .sort({price: -1})
    .select('userId price')
    .limit(1);
}

export default AuctionService;
