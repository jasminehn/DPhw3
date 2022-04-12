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
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-title')[0].innerText
    
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    console.log('Just purchased', title, 'for', price)
    alert('Just purchased ' + title + ' for ' + price)
}

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
        total = total + subtotal + 20.00 //$1 for tax
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

function freeipod(){
    var message = ["Congrats! You've just earned 6 Silver bucks!\n\nKeep playing to win more free stuff",
                    "Amazing! You just earned 2 Gamma Cases!\n\nKeep playing to win more free stuff",
                    "Well done! You earned 1 Gold Buck!\n\nKeep playing to win more free stuff",
                    "Radical! You earned a SUPER rare skin!\n\nKeep playing to win more free stuff",
                    "Fantastic! You earned a ULTRA rare skin!\n\nKeep playing to win more free stuff",
                    "Congrats! You earned a Graffiti Box!\n\nKeep playing to win more free stuff",
                    "Awesome! You earned 50 Brass Bucks!\n\nKeep playing to win more free stuff",
                    "k̷̼̼̆̅ę̶̖̠̋͗̋e̵̞̼̦͐p̶̧̢̟̌̎ ̴̺͝p̵͕͕̥͋l̷̳̥̒̏̋ạ̴͌̈̕ỳ̵̭̬̃̌̇i̸͖͉̰̊̀̚͝n̷͖̹̎g̴̻̽͛"]

    var a = Math.floor(Math.random() * message.length)

    alert(message[a])
}

//----------------------HWEEEEEEEEEEEEEEEL-----------------------
window.addEventListener('load', (event) => {
    
    const prizes = [
     {
       text: "Chroma Case",
       color: "hsl(197 30% 43%)",
       reaction: "dancing"
     },
     { 
       text: "50 Silver Bucks",
       color: "hsl(173 58% 39%)",
       reaction: "shocked"
     },
     { 
       text: "Gamma Case",
       color: "hsl(43 74% 66%)",
       reaction: "shocked" 
     },
     {
       text: "Bestiary Capsule",
       color: "hsl(27 87% 67%)",
       reaction: "shocked"
     },
     {
       text: "Music Kit Box",
       color: "hsl(12 76% 61%)",
       reaction: "dancing"
     },
     {
       text: "Chicken Capsule",
       color: "hsl(350 60% 52%)",
       reaction: "laughing"
     },
     {
       text: "5 Gold Bucks",
       color: "hsl(91 43% 54%)",
       reaction: "laughing"
     },
     {
       text: "Predators Capsule",
       color: "hsl(140 36% 74%)",
       reaction: "dancing"
     }
   ];
   
   const wheel = document.querySelector(".deal-wheel");
     const spinner = wheel.querySelector(".spinner");
   const trigger = wheel.querySelector(".btn-spin");
     const ticker = wheel.querySelector(".ticker");
     const reaper = wheel.querySelector(".grim-reaper");
     const prizeSlice = 360 / prizes.length;
     const prizeOffset = Math.floor(180 / prizes.length);
     const spinClass = "is-spinning";
     const selectedClass = "selected";
     const spinnerStyles = window.getComputedStyle(spinner);
     let tickerAnim;
     let rotation = 0;
     let currentSlice = 0;
     let prizeNodes;
   
   const createPrizeNodes = () => {
     prizes.forEach(({ text, color, reaction }, i) => {
       const rotation = ((prizeSlice * i) * -1) - prizeOffset;
       
       spinner.insertAdjacentHTML(
         "beforeend",
         `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
           <span class="text">${text}</span>
         </li>`
       );
     });
   };
   
   const createConicGradient = () => {
     spinner.setAttribute(
       "style",
       `background: conic-gradient(
         from -90deg,
         ${prizes
           .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
           .reverse()
         }
       );`
     );
   };
   
   
   const setupWheel = () => {
     createConicGradient();
     createPrizeNodes();
     prizeNodes = wheel.querySelectorAll(".prize");
   };
   
   const spinertia = (min, max) => {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
   };
   
   const runTickerAnimation = () => {
     // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
     const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
     const a = values[0];
     const b = values[1];  
     let rad = Math.atan2(b, a);
     
     if (rad < 0) rad += (2 * Math.PI);
     
     const angle = Math.round(rad * (180 / Math.PI));
     const slice = Math.floor(angle / prizeSlice);
   
     if (currentSlice !== slice) {
       ticker.style.animation = "none";
       setTimeout(() => ticker.style.animation = null, 10);
       currentSlice = slice;
     }
   
     tickerAnim = requestAnimationFrame(runTickerAnimation);
   };
   
   const selectPrize = () => {
     const selected = Math.floor(rotation / prizeSlice);
     prizeNodes[selected].classList.add(selectedClass);
     reaper.dataset.reaction = prizeNodes[selected].dataset.reaction;
   };
   
   trigger.addEventListener("click", () => {
     if (reaper.dataset.reaction !== "resting") {
       reaper.dataset.reaction = "resting";
     }
   
     trigger.disabled = true;
     rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
     prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
     wheel.classList.add(spinClass);
     spinner.style.setProperty("--rotate", rotation);
     ticker.style.animation = "none";
     runTickerAnimation();
   });
   
   spinner.addEventListener("transitionend", () => {
     cancelAnimationFrame(tickerAnim);
     trigger.disabled = false;
     trigger.focus();
     rotation %= 360;
     selectPrize();
     wheel.classList.remove(spinClass);
     spinner.style.setProperty("--rotate", rotation);
   });
   
   setupWheel();
 
 });

 //------------------------SALE------------------------------------
 //this shit is a mess o_0
 (function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
        dd = String(today.getDate()).padStart(2, "0"),
        mm = String(today.getMonth() + 1).padStart(2, "0"),
        yyyy = today.getFullYear(),
        nextYear = yyyy + 1,
        dayMonth = "09/30/",
        birthday = dayMonth + yyyy;
    
    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end



    getCountdown();

    setInterval(function () { getCountdown(); }, 1000);
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = days,
            document.getElementById("hours").innerText = hours,
            document.getElementById("minutes").innerText = minutes,
            document.getElementById("seconds").innerText = seconds;
          //seconds
        }, 0)
    }());

var target_date = new Date().getTime() + (1000*3600*48); // set the countdown date
var days, hours, minutes, seconds; // variables for time units

getCountdown();
//setInterval(function () { getCountdown(); }, 1000);

function getCountdown(){

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	days = pad( parseInt(seconds_left / 86400) );
	seconds_left = seconds_left % 86400;
		 
	hours = pad( parseInt(seconds_left / 3600) );
	seconds_left = seconds_left % 3600;
		  
	minutes = pad( parseInt(seconds_left / 60) );
	seconds = pad( parseInt( seconds_left % 60 ) );

	// format countdown string + set tag value
}

function pad(n) {
	return (n < 10 ? '0' : '') + n;
}

function raffle() {
    let text;
    let person = prompt("Please enter your name for the raffle:", "");
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      text = "Congraturlations " + person + "! You have won 1 Brass Buck! The raffle fee has been added to your total.";
    }
    //document.getElementById("demo").innerHTML = text;
    alert(text)
  }