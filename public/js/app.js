$(document).ready(function() {
  const shoppingCart = [];

  $(document).on("click", "#placeOrder", placeOrder);
  $(document).on("click", ".submitQuant", checkStock);
  $(document).on("click", ".shoppingTrig", viewCart);

  getProducts();

  //Getting all products to display on the page
  function getProducts() {
    $.get("/api/products", function(data) {
      $("#tableBody").empty();
      data.forEach(product => {
        $("#tableBody").append(
          `<tr>   
            <td class="product"> ${product.product_name} </td>
            <td class="price">  $${product.price} </td>
            <td class="quantity">  ${product.stock_quantity} </td>
            <td class="addtocart">
              <input id="quantInput${product.id}" type="number" size="20">
              <button class="submitQuant" data-name="${product.product_name}" data-price="${product.price}" data-quantity="${product.stock_quantity}" data-id="${product.id}" size="20">Add To Cart</button> 
          </tr>`
        );
      });
    });
  }
  let productID;
  let quant;
  let name;
  let stockQuantity;
  let price;

  // Will check to see if the user quantity is less than the current stock
  function checkStock() {
    productID = $(this).attr("data-id");
    quant = $("#quantInput" + productID).val();
    name = $(this).attr("data-name");
    price = $(this).attr("data-price");
    stockQuantity = $(this).attr("data-quantity");

    if (parseInt(stockQuantity) < parseInt(quant)) {
      alert("Not Enough Quantity to place your order");
    } else {
      const product = {
        id: productID,
        product_name: name,
        price: price,
        stock_quantity: quant
      };
      shoppingCart.push(product);
      alert("Item added to cart");
      console.log(shoppingCart);
      console.log(product);
    }
  }

  let updating = false;

  // Modal to display what's in the shopping cart
  function viewCart() {
    $(".modal-body").empty();
    shoppingCart.forEach(product => {
      $(".modal-body").append(
        `<div data-name="${product.product_name}">${product.product_name}</div>
        <div data-quantity="${product.stock_quantity}">${product.stock_quantity}</div>`
      );
    });

    const total = getTotal();

    $(".modal-body").append(`<div><hr>$${total}</div>`);
  }

  // Function to calculate the total amount of purchase
  function getTotal() {
    let total = 0;

    shoppingCart.forEach(product => {
      total += product.price * product.stock_quantity;
    });
    console.log("this is the total", total);
    return total;
  }

  //Function to place order
  function placeOrder() {
    updating = true;
    updateQuantity();
  }

  //Updating the product's quantity in the database
  function updateQuantity() {
    if (updating) {
      console.log(quant);
      console.log("Stock quantity: " + stockQuantity);
      let newStockQuantity = stockQuantity - quant;
      console.log("Remaining stock: " + quant);

      let updatedProduct = {
        id: productID,
        stock_quantity: newStockQuantity
      };
      console.log(updatedProduct);
      updateProducts(updatedProduct).then(function(res) {
        console.log(res);
      });
    }
  }
  function updateProducts(updatedProduct) {
    return $.ajax({
      method: "PUT",
      url: "/api/products",
      data: updatedProduct
    });
  }
});
