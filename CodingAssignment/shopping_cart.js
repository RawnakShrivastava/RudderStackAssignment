if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("add");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}

// var cartItems = document.getElementsByClassName("cart-items")[0];
// while (cartItems.hasChildNodes()) {
//   document.getElementsByClassName("btn-purchase").disabled = true;
// }
function purchaseClicked() {
  alert("Your cart was saved successfully");
  var cartItems = document.getElementsByClassName("cart-items")[0];

  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var product = button.parentElement;
  var productName = product.getElementsByClassName("product-name")[0].innerText;
  var productPrice = product.getElementsByClassName("product-price")[0]
    .innerText;
  var productImage = product.getElementsByClassName("product-image")[0].src;

  addToCart(productName, productImage, productPrice);
  updateCartTotal();

  // console.log(productName + ":" + productPrice);
}

function addToCart(productName, productImage, productPrice) {
  var cartRow = document.createElement("div");
  cartRow.innerText = productName;
  cartRow.classList.add("cart-row");
  cartItems = document.getElementsByClassName("cart-items")[0];

  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");

  document.getElementsByClassName("btn-purchase").disabled = false;
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == productName) {
      alert("This Item already exists");
      return;
    }
  }

  cartRowContents = `<div class="cart-item cart-column">
    <img class="cart-item-image" src="${productImage}" width="100" height="100">
    <span class="cart-item-title">${productName}</span>
  </div>
  <span class="cart-price cart-column">${productPrice}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
