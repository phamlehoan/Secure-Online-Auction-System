import FeedbackModel from "./../models/feedback.model"
import UserModel from "./../models/user.model"
import ProductService from "./../services/product.service"
const FeedbackService = {}

FeedbackService.listFeedbackProduct = async(id_seller) => {
  return await FeedbackModel.aggregate([
    {
      $project: {
        userId: {
          $toObjectId: '$userId'
        },
        productId: {
          $toObjectId: '$productId'
        },
        content: 1,
        ratingStar: 1,
        sellerId: 1
      }
    },{
      $match: {
        sellerId: id_seller
      }
    },{
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'user'
      }
    },{
      $project: {
        content: 1,
        sellerId: 1,
        ratingStar: 1,
        productId: 1,
        user:{
          username: {
            $arrayElemAt: ['$user.username', 0]
          },
          avatar: {
            $arrayElemAt: ['$user.avatarUrl', 0]
          }
        }
      }
    },{
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },{
      $project: {
        content: 1,
        sellerId: 1,
        ratingStar: 1,
        user: 1,
        product: {
          _id: {
            $arrayElemAt: ['$product._id', 0]
          },
          productName: {
            $arrayElemAt: ['$product.name', 0]
          }
        }
      }
    }
  ]);
}

FeedbackService.statistical = async(id_seller) => {
  let star1 = await FeedbackModel.countByStar(id_seller,1);
  let star2 = await FeedbackModel.countByStar(id_seller,2);
  let star3 = await FeedbackModel.countByStar(id_seller,3);
  let star4 = await FeedbackModel.countByStar(id_seller,4);
  let star5 = await FeedbackModel.countByStar(id_seller,5);
  let allStar = await FeedbackModel.countAllStar(id_seller);
  let data = {
    star1: {
      percentage: Math.round((star1/allStar)*100)
    },
    star2: {
      percentage: Math.round((star2/allStar)*100)
    },
    star3: {
      percentage: Math.round((star3/allStar)*100)
    },
    star4: {
      percentage: Math.round((star4/allStar)*100)
    },
    star5: {
      percentage: Math.round((star5/allStar)*100)
    },
    totalStar: {
      star: allStar,
      percentage: Math.round(((star1*1+star2*2+star3*3+star4*4+star5*5)/allStar)*10)/10
    },
  }
  return data;
}
export default FeedbackService;
