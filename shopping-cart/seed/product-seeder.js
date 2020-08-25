var Product = require("../models/product");

var mongoose = require("mongoose");
const { exists } = require("../models/product");

var products = [
  new Product({
    imagePath:
      "http://media.istockphoto.com/photos/handsome-man-wearing-jeans-and-white-tshirt-picture-id503220886?k=6&m=503220886&s=612x612&w=0&h=2ewOfLZdBr_txaMpE9_Yv-RbCXYVvswvENNDmZ0S6gY=",
    title: "Tshirt",
    description: "Van Huesem Tshirt!! On Offer",
    price: 10,
  }),
  new Product({
    imagePath:
      "https://assets.myntassets.com/h_1440,q_90,w_1080/v1/assets/images/8375271/2019/1/7/582995a9-d9c8-4129-8538-bf6492edc0191546853353174-Ives-Women-Olive-Green-Solid-Shirt-Style-Top-342154685335233-1.jpg=",
    title: "Tshirt",
    description: "Van Huesem Tshirt!! On Offer",
    price: 10,
  }),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function (err, result) {
    done++;

    if (done.length === products.length) {
      exit();
    }
  });
}
function exit() {
  mongoose.disconnect();
}
