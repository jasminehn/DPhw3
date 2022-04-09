if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //document.getElementById('get-bonus').addEventListener('click', getBonus)
    //var why = document.getElementById('get-bonus')
    /*
    var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    document.getElementsByClassName('place-order')[0].addEventListener('click', purchaseClicked)
    alert("what")
    */
    var quantityInputs = document.getElementsByClassName('quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var placeorderElement = document.getElementsByClassName('place-order')[0]
    if(placeorderElement){
        placeorderElement.addEventListener('click', purchaseClicked)
    }

    var getbonusElement = document.getElementById('get-bonus')
    if(getbonusElement){
        getbonusElement.addEventListener('click', getBonus)
    }
}

var clicks = 1;

function claimBonus() {
    clicks += 1;
    document.getElementById("file").value = clicks;
    if (document.getElementById("file").value == 7) {
        //alert('You\'ve earned this week\'s bonus!!!')
        unlockBonus()
        return
    }
}

function unlockBonus(){
    //document.getElementById("bonus-txt").innerHTML = "Dark Mode UNLOCKED! Click here to claim your bonus."
    document.getElementById('locked').style.display = 'none'
    document.getElementById('unlocked').style.display = 'block'
}

function getBonus() {
    alert('Congrats, you have redeemed dark mode!! Next weeks bonus is: aimbot')
}

//----------------RECHARGE-------------------
var goldbucks = 0;
var silverbucks = 0;
var brassbucks = 0;

function updateBucks(){
    document.getElementsByClassName('goldbucks').textContent = goldbucks
    document.getElementsByClassName('silverbucks').textContent = silverbucks
    document.getElementsByClassName('brassbucks').textContent = brassbucks
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
        document.getElementsByClassName('agree-price')[0].textContent = '$' + total
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
    goldbucks = document.getElementsById('gold-quantity');
    silverbucks = document.getElementsById('gold-quantity');
    brassbucks = document.getElementsById('gold-quantity');
}


function purchaseClicked() {
    alert('Thank you for your purchase!')
    updateBucks()
}