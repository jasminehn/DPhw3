if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    // Hide cart and terms on load.
    var rechargewindow = document.getElementsByClassName('rechargewindow')[0]
    var homewindow = document.getElementsByClassName('gamewindow')[0]
    if(rechargewindow){
        rechargewindow.style.display = 'none'
    }
    
    // Show products, hide cart.
    var showProductsBtn = document.getElementsByClassName('show-recharge')[0]
    if(showProductsBtn){
        showProductsBtn.addEventListener('click', function() {
            if (rechargewindow.style.display != 'block') {
                rechargewindow.style.display = 'block'
            }
            if (homewindow.style.display != 'none') {
                homewindow.style.display = 'none'
            }
        })
    }

    // Show cart, hide products.
    var showCartBtn = document.getElementsByClassName('show-home')[0]
    if(showCartBtn){
        showCartBtn.addEventListener('click', function() {
            if (homewindow.style.display != 'block') {
                homewindow.style.display = 'block'
            }
            if (rechargewindow.style.display != 'none') {
                rechargewindow.style.display = 'none'
            }
        })
    }

    //hide the game
    var notcsgo = document.getElementsByClassName('dagame')[0]
    if(notcsgo){
        notcsgo.style.display = 'none'
    }
    var startbutton = document.getElementsByClassName('startbutton')[0]
    var playgame = document.getElementsByClassName('yuh')[0]
    if(playgame){
        playgame.addEventListener('click', function() {
            if (notcsgo.style.display != 'block') {
                notcsgo.style.display = 'block'
            }
            if (startbutton.style.display != 'none') {
                startbutton.style.display = 'none'
            }
        })
    }

    var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var placeorderElement = document.getElementsByClassName('place-order')[0]
    if(placeorderElement){
        placeorderElement.addEventListener('click', purchaseClicked)
    }

    /*
    var getbonusElement = document.getElementById('get-bonus')
    if(getbonusElement){
        getbonusElement.addEventListener('click', getBonus)
    }
    */

    var collapse = document.getElementsByClassName("collapse")[0]
    //var terms = document.getElementByClassName("terms-content");
    if(collapse){
        collapse.addEventListener('click', function() {
            //this.classList.toggle("active");
            //var content = this.nextElementSibling;
            var terms = document.getElementsByClassName("terms-content")[0]
            if(terms){
                if (terms.style.display === "block") {
                    terms.style.display = "none";
                } else {
                    terms.style.display = "block";
                }
            }
            
        });
    }
    
    var daysuntil = document.getElementById("daysuntil");
    if(daysuntil){
        daysuntil.innerHTML = 7 - clicks;
    }

    //add listener for buy button
    var addItemButtons = document.getElementsByClassName('add-item')
    for (var i = 0; i < addItemButtons.length; i++) {
        var button = addItemButtons[i]
        button.addEventListener('click', buyItem)
    }
}

//CLAIMING BONUS
var clicks = 1;

function claimBonus() {
    clicks += 1;
    document.getElementById("file").value = clicks;
    daysuntil.innerHTML = 7 - clicks;
    
    if (document.getElementById("file").value == 7) {
        alert('You\'ve earned this week\'s bonus!!!')
        unlockBonus()
        return
    }
}

function unlockBonus(){
    //document.getElementById("bonus-txt").innerHTML = "Dark Mode UNLOCKED! Click here to claim your bonus."
    document.getElementById('locked').style.display = 'none'
    document.getElementById('unlocked').style.display = 'block'
}

function validateChecks() {
    if (document.getElementById('checkbox1').checked && document.getElementById('checkbox2').checked) {
        alert('Congrats, you have redeemed dark mode! Next week\'s bonus is: Aimbot')
    } else {
        alert("You must check BOTH checkboxes >:(");
    }
}

/*
function getBonus() {
    alert('Congrats, you have redeemed dark mode! Next week\'s bonus is: Aimbot')
}
*/

//-----------STORE-----------------
function buyItem(event){
    /*
    var storeItems = document.getElementsByClassName('card')
    for (var i = 0; i < storeItems.length; i++) {
        var beep = storeItems[i];
        var itemname = beep.getElementsByClassName('item-title')
        alert('Just purchased ', itemname)
    }
    var beep = storeItems[i];
    var itemname = beep.getElementsByClassName('item-title')
    alert('Just purchased ', itemname)
    */
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    console.log('Just purchased', title, 'for', price)
    alert('Just purchased ' + title + ' for ' + price)
}

//CLICK THROUGH GAME
/*
var myImages1 = new Array();
    myImages1.push("img_01.gif");
    myImages1.push("img_02.gif");
    myImages1.push("img_03.gif");
    myImages1.push("img_04.gif");
    myImages1.push("img_05.gif");
    myImages1.push("img_06.gif");
    myImages1.push("img_07.gif");
    myImages1.push("img_08.gif");
    myImages1.push("img_09.gif");

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickimg2() {
  document.randimg.src = myImages1[getRandomInt(0, myImages1.length - 1)];
}
*/

//----------------RECHARGE-------------------
var goldbucks = 0;
var silverbucks = 0;
var brassbucks = 0;

function updateBucks(){
    document.getElementsByClassName('goldbucks')[0].textContent = goldbucks + 1
    document.getElementsByClassName('silverbucks')[0].textContent = silverbucks
    document.getElementsByClassName('brassbucks')[0].textContent = brassbucks + 69 //nice
}

function updateCartTotal() {
    console.log("Calling updateCartTotal")
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-item')
    var subtotal = 0
    var total = 0
    var failed = false
    // Total price of all elements currently in cart.
    try{
        for (var i=0; i<cartRows.length; i++){
            var cartRow = cartRows[i]

            var priceElement = cartRow.getElementsByClassName('cart-item-price')[0]
            console.log("price elemtn: ",priceElement)
            var price = parseFloat(priceElement.textContent.replace('$', ''))

            var quantityElement = cartRow.getElementsByClassName('quantity')[0]
            var quantity = quantityElement.value

            subtotal = subtotal + (price * quantity)
            subtotal = Math.round(subtotal * 100) / 100
            console.log("subtotal",subtotal)
        }
        total = total + subtotal + 1.00 //$1 for tax
        total = Math.round(total * 100) / 100
        console.log("total",total)
    }catch (error) {
        total = 0
        console.log(error)
        failed = true
    }
    
    // Update total price on page.
    if (!failed) {
        document.getElementsByClassName('cart-subtotal')[0].textContent = '$' + subtotal
        document.getElementsByClassName('cart-total-price')[0].textContent = '$' + total
        //document.getElementsByClassName('agree-price')[0].textContent = '$' + total
    }else{
        document.getElementsByClassName('cart-total-price')[0].textContent = 'ERROR'
    }
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()

    goldbucks = Number(document.getElementById('gold-quantity').value);
    silverbucks = Number(document.getElementById('silver-quantity').value);
    brassbucks = Number(document.getElementById('brass-quantity').value);
}

function purchaseClicked() {
    alert('Thank you for your purchase!')
    updateBucks()
}