//EventListener can disappear. Most onclick events are written to only be used for one thing only.
//these days it is a matter of preference.
let total = 0;
let totalPrice = 0;

function displayCartTotal(){
  total = localStorage.getItem('checkout');
  localStorage.setItem('checkout', total);
  document.querySelector('#checkout').innerHTML = total;
}

//all this actually does is send the user back to the top. Might be annoying if it was a longer page, but it should be fine for now.
function displayAddtoCart(){
    const popup = document.createElement('div');
    popup.textContent = 'Added to Cart';
    popup.classList.add('popup');
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 2000);
}
//all this does is empty the cart after check out.
function checkOut(){
  localStorage.getItem('checkout');
  total = 0;
  localStorage.setItem('checkout', total);
  document.querySelector('#checkout').innerHTML = total;
  clearCart();
}


// function to add items to the cart. I had to totally rewrite this with some help from a friend, so ty king.
function addToCart(productName, productPrice) 
{
  total = localStorage.getItem('checkout');
  total++;
  localStorage.setItem('checkout', total);
  document.querySelector('#checkout').innerHTML=total;
  
  const cart = getCartItems();

  cart.push({ name: productName, price: productPrice });

  // Update the cart in localStorage.
  updateCartItems(cart);

//i thought about having the website tell the user that something's been add to the cart but it doesn't seem necessary
//lots of long standing websites like Amazon and Playasia don't really tell you its ben added unless you go an check, where the user will see their cart anyway.
}


// Function to get the cart items from localStorage
function getCartItems() 
{
  const userCartItems = localStorage.getItem('cart');
  return userCartItems ? JSON.parse(userCartItems) : [];
}

// Function to update the cart items in localStorage
function updateCartItems(cart) 
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*This is everything to do with the cart retrieval and display*/

 // Display the items in the cart.
 function displayCartItems() 
 {
    const cart = getCartItems();
    const cartContainer = document.querySelector('.cart-item');
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    //this runs through each of the items in the cart.
    cart.forEach((userItem) => 
    {
      const userCartDiv = document.createElement('div');
      //all the class names are from bootstrap
      userCartDiv.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');

      // Display the details for items in the cart.
      const productName = userItem.name;
      const productPrice = userItem.price;
      totalPrice += productPrice;

      //this will display in a box each product and its associated price
      userCartDiv.innerHTML = 
      `
          <div>
              <h5>${productName}</h5>
              <span>€${(productPrice / 100).toFixed(2)}</span>
          </div>
      `;

      cartContainer.appendChild(userCartDiv);
    });

    // Display the total price. I wanted this in the checkout box, but so be it.
    const totalPriceDisplay = document.getElementById('totalPrice');
    totalPriceDisplay.textContent = `€${(totalPrice / 100).toFixed(2)}`;

    // This depends if something is in the cart or not, but it will hide particular features if so.
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const totalPriceText = document.getElementById('totalPriceText');

    // An empty cart should display the empty cart message and 0.00 for the price. though i think this hides the total price in general.
    if (cart.length > 0) 
    {
      // d-none is from bootstrap.
        emptyCartMessage.classList.add('d-none');
        totalPriceText.classList.remove('d-none');
    } 
    // Removes the empty cart message and shows the total price as of the moment
    else 
    {
        emptyCartMessage.classList.remove('d-none');
        totalPriceText.classList.add('d-none');
    }
  }

  // Clearing the cart. this is used in conjunction with the Checkout() function
  function clearCart() 
  {
    localStorage.removeItem('cart');
    displayCartItems(); // Clear cart items from display
    document.getElementById('totalPrice').textContent = ''; // Clear total price
  }

  // Call displayCartItems and displayCartTotal when the page loads.
  document.addEventListener('DOMContentLoaded', displayCartItems);
  document.addEventListener('DOMContentLoaded', displayCartTotal); // it took me embarassingly long to figure this one out.