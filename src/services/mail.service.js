import MailConfig from "../configs/mail.config";
import {transMail} from './../langs/us/notification.us';

const MailService = {};

/**
 * 
 * @param {String} email 
 */
MailService.warning = async (email, opt) => {
    let content =  `<h2> SOAS Security Alert ⚠</h2>
                    <h3> Some one got your password and login in another device </h3>
                    <h3> If you are do that operation please let we know </h3>
                    <h3 style="color: #09ff00;"> Your OTP: ${opt} </h3>
                    `;
    let subject = 'SOAS Security Alert ⚠';

    return await MailConfig(email, subject, content);
}

MailService.winningBid = async (email, product) => {
    let content = `
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://uc18ea8c5bb92c91ac71ba2bda59.previews.dropboxusercontent.com/p/html/ABA6VLx2dMgNuoVtkXIrkQGEoxU51w2MxgpoPs8l_TUDg-q-_oCD-pH3fYrDJkT9dQYoLgnHTQhRFrANhek7wyAoHLqW-dGKkM4BG4lgqAAgeJ3PQlqQsuCwaSL9ShFj6aJTwrVr6U3hG0h3SF1Yp0NHgogwDC-6Yg9qamku3fObv619dxQfv2Fd9AkV8XLPLAKw6YvRxP2cq-nD17PvuUyPTDf6gWbiC0tqrv8yMLlAw6cQ5BsMLM_M-jkFCtzP8x_GgJZG_8qG0BZDetH_Yf5LUbacZxFiKR2VfmNwwblpZozoTtcilLKhzsKwytiH0WBXmvdQbVZrYqkaShjmM1FF/p.html" crossorigin="anonymous">
        <div class="col-lg-12">
                    <div class="shop__cart__table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="cart__product__item">
                                        <img src="${product.image}" alt="" width="100" height="auto">
                                        <div class="cart__product__item__title">
                                            <h3>${product.name}</h3>
                                            <div class="rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="cart__price">$ ${product.price}</td>
                                    <td class="cart__total"></td>
                                    <td class="cart__close"><span class="icon_close"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    `;
    let subject = 'SOAS - WIN';
    console.log(email, product);
    return await MailConfig(email, subject, content);

}

export default MailService;
