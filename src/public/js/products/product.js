const baseUrl = 'http://localhost:8080/api/v1';

let findItemsByCat = async (category) => {
    let products = await getData(baseUrl + "/products");
    console.log(products);
    let filtered = products.products
    .filter(item => item.categories.name === category);

    return productsRender(filtered);
}

//post product
let onSubmitPostProduct = () => {
    let ckeditorData = CKEDITOR.instances['prd-description'].getData();
    let formData = new FormData();
    formData.append("description", ckeditorData.substring(3, ckeditorData.length - 5));
    const options = {
        mode: 'no-cors',
        method: 'POST',
        body: formData
    }

    getData("/", options)
    .then(console.log('ok'))
    .catch(err => console.log(err));
}

let productsRender = (products) => {
    let list = '';
    products.forEach(product => {
        list+=
        `<div class="col-lg-3 col-md-4 col-sm-6 mix women pb-4">
        <div class="product__item">
            <div class="product__item__pic set-bg" data-setbg="background-image: url('${product.image}');">
                <img src='${product.image}'></img>
                <div class="label new">New</div>
                <div class="auction__hover">
                    <div class="auction__winner"><i class="fa fa-trophy text-warning" aria-hidden="true"></i> ID: <span>435e6r7t8uiyyxc</span></div>
                    <div class="auction__price h1">$ ${product.reservePrice}</div>
                </div>
                <ul class="product__hover">
                    <li><a href="${product.image}" class="image-popup"><span class="arrow_expand"></span></a></li>
                    <li><a href="#"><span class="fa fa-gavel"></span></a></li>
                    <li><a href="/products/${product._id}"><span class="icon_bag_alt"></span></a></li>
                </ul>
            </div>
            <div class="product__item__text">
                <h6><a href="/products/${product._id}">${product.name}</a></h6>
                <div class="rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <div style="position: relative;">
                    <div class="product__price" style="position: absolute; left: 0;"$>$ ${product.reservePrice}</div>
                    <div style="position: absolute; right: 0;">00:00:30</div>
                </div>
            </div>
            </div>
        </div>`
    });

    return document.getElementById('products').innerHTML = list;
}

let getData = async (url, options) => {
    return await fetch(url, options)
        .then(res => res.json());
}
