import data from './data.js'
const itemsContainer = document.getElementById('items')
const itemList = document.getElementById('item-list')
//itemList.innerHTML = '<li>Hello World </li>';
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    let newDiv = document.createElement('div');
      newDiv.className = 'item'
    // display the image
    let img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)
  
    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)
    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)
  
    let button = document.createElement('button')
    button.id = data[i].name
  
    // creates a custom attribute called data-price.
    // That will hold the price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
   
    }
 //queryselectorall
 const all_items_button = Array.from(document.querySelectorAll("button"))
 all_items_button.forEach(elt => elt.addEventListener('click', () => {
     addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
     showItems()
   }))
// declare cart array
const cart = [ ];
// handle on change event for update input
itemList.onchange = function(e){
    if(e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}
// handle clicks on list
itemList.onclick = function(e) {
    // console.log("clicked list!!!!!")
    // console.log(e.target)
    if(e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name
        removeItem(name)
    } else if (e.target && e.target.classList.contains('add-one')) {
        const name = e.target.dataset.name
        addItem(name)
    } else if (e.target && e.target.classList.contains('remove-one')) {
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}

// define function addItem
function addItem(name, price) {
    for (let i = 0; i < cart.length; i ++) {
        if (cart[i].name === name) {
            cart[i].qty += 1;
            showItems()
            return
        }
    }
    const item = { name, price, qty: 1 };
    cart.push(item);
}
//define function showItems
function showItems() {
    const qty = getQty();
    const total = getTotal();

    //console.log(`You have ${qty} items in your cart`)
    cartQty.innerHTML = `You have ${qty} items in your cart`
    let itemStr=''
    for (let i = 0; i < cart.length ; i++ ) {
        // const name = cart[i].name
        // const price = cart[i].price
        // const qty = cart[i].qty

        const { name, price, qty } = cart[i]

        itemStr += `<li>
        ${name} $${price} x ${qty} = $${qty * price} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}">+</button>
        <button class="remove-one" data-name="${name}">-</button>
        <input class = "update" type="number" data-name="${name}">
        </li>`
    }
    itemList.innerHTML = itemStr

    //console.log(`Total in cart: $${total}`)
    cartTotal.innerHTML = `Total in cart: $${total}`
}
//get qty function
function getQty(){
    let qty = 0
    for (let i = 0; i < cart.length; i ++){
        qty += cart[i].qty; 
    }
    return qty;
}
//get total function
function getTotal(){
    let total = 0;
    for (let i =0; i < cart.length; i ++) {
        total += cart[i].price * cart[i].qty;
    }
    return total.toFixed(2);
}
//remove item function
function removeItem(name, qty = 0){
    for (let i = 0; i < cart.length; i ++) {
        if (cart[i].name === name) {
            if (qty > 0){
                cart[i].qty -= qty
            }
            if (cart[i].qty < 1 || qty === 0){
                cart.splice(i, 1);
            }
            showItems()
            return
        }
    }
}
//updatecart function
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i++)
        if (cart[i].name === name) {
            if (qty < 1){
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
}

// add items to cart and display them
// addItem('Apple', 0.99);
// addItem('Orange', 1.29);
// addItem('Opinion', 0.02);
// addItem('Orange', 1.29);
// addItem('Apple', 0.99);
// addItem('Frisbee', 9.92);
// addItem('Apple', 0.99);
// showItems();
// removeItem('Frisbee');
// removeItem('Apple', 1);
// showItems();
// console.log(itemList)
