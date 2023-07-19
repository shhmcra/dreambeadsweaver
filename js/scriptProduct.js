
updateCartTotal();


document.getElementById("emptycart").addEventListener("click", emptyCart);
var btns = document.getElementsByClassName('addtocart');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function() {addToCart(this);});
}



function addToCart(elem) {

    var sibs = [];
    var getprice;
    var getproductName;
    var cart = [];
     var stringCart;

    while(elem = elem.previousSibling) {
        if (elem.nodeType === 3) continue; 
        if(elem.className == "price"){
            getprice = elem.innerText;
        }
        if (elem.className == "productname") {
            getproductName = elem.innerText;
        }
        sibs.push(elem);
    }

    var product = {
        productname : getproductName,
        price : getprice
    };

    var stringProduct = JSON.stringify(product);

    if(!sessionStorage.getItem('cart')){
  
        cart.push(stringProduct);

        stringCart = JSON.stringify(cart);

        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
    else {
       
       cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push(stringProduct);
        stringCart = JSON.stringify(cart);
        sessionStorage.setItem('cart', stringCart);
        addedToCart(getproductName);
        updateCartTotal();
    }
}


function updateCartTotal(){
 
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {

        var cart = JSON.parse(sessionStorage.getItem('cart'));
   
        items = cart.length;

        for (var i = 0; i < items; i++){

            var x = JSON.parse(cart[i]);

            price = parseFloat(x.price.split('₱')[1]);
            productname = x.productname;

            carttable += "<tr><td>" + productname + "</td><td>	₱" + price.toFixed(2) + "</td></tr>";
            total += price;
        }
        
    }
    document.getElementById("total").innerHTML = total.toFixed(2);

    document.getElementById("carttable").innerHTML = carttable;
 
    document.getElementById("itemsquantity").innerHTML = items;
}

function addedToCart(pname) {
  var message = pname + " was added to the cart";
  var alerts = document.getElementById("alerts");
  alerts.innerHTML = message;
  if(!alerts.classList.contains("message")){
     alerts.classList.add("message");
  }
}

function emptyCart() {
   
    if(sessionStorage.getItem('cart')){
        sessionStorage.removeItem('cart');
        updateCartTotal();
  
      var alerts = document.getElementById("alerts");
      alerts.innerHTML = "";
      if(alerts.classList.contains("message")){
          alerts.classList.remove("message");
      }
    }
}

// Retrieve the cart table body
const cartTableBody = document.getElementById("carttable");

// Retrieve the cart totals
const itemsQuantity = document.getElementById("itemsquantity");
const total = document.getElementById("total");

// Retrieve the "Checkout" button
const checkoutButton = document.getElementById("checkout");

// Event listener for the checkout button
checkoutButton.addEventListener("click", () => {
  // Retrieve the order details from the cart
  const orderItems = [];

  // Iterate over each row in the cart table
  const rows = cartTableBody.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const product = row.cells[0].innerText;
    const price = row.cells[1].innerText;
    orderItems.push({ product, price });
  }

  // Send the order details to your server-side script
  sendOrderToServer(orderItems);
});

// Function to send the order details to the server-side script
function sendOrderToServer(orderItems) {
  // Make an HTTP request to your server-side script
  // You can use methods like fetch, XMLHttpRequest, or Axios to send the data
  // Here's an example using fetch:
  fetch("/sendOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderItems),
  })
    .then(response => {
      if (response.ok) {
        // Order details sent successfully
        // You can show a success message to the user or redirect them to a thank you page
      } else {
        // Order details sending failed
        // Handle the error or show an error message to the user
      }
    })
    .catch(error => {
      // Handle the error or show an error message to the user
    });
}
