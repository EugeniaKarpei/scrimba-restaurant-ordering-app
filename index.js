import { menuArray } from "/data.js";
const orderArray = []
const orderContainer = document.getElementById("order-container")
const paymentForm = document.getElementById("payment-form")
const paymentModal = document.getElementById("checkout-payment-modal")


renderMenu()

function renderMenu(){
    const mainElement = document.getElementById("main-menu")
    let menu = ''
    menuArray.forEach(function(menuItem){
        menu += createMenuItem(menuItem)
    })
    mainElement.innerHTML = menu
}

function createMenuItem(menuItem){
    const menuItemHTML =  
    `<div class="meal-container">
                <div class="meal-description-container">
                <p class="meal-emoji">${menuItem.emoji}</p>
                <div class="meal-description">
                    <p class="meal-name">${menuItem.name}</p>
                    <p class="meal-ingredients">${menuItem.ingredients}</p>
                    <p class="meal-price">$${menuItem.price}</p>
                </div>
                </div>
                <div class="add-meal-btn-container">
                    <button class="add-meal-btn" data-addbtn="${menuItem.id}">+</button>  
                </div>
            </div>`
    return menuItemHTML
}

document.addEventListener("click", function(e){
    if (e.target.dataset.addbtn){
        addMealToOrder(e.target.dataset.addbtn)
    } 
    else if (e.target.dataset.removebtn){
        removeMealFromOrder(e.target.dataset.removebtn)
    } 
    else if (e.target.id === "complete-order-btn"){
        completeOrder()
    }
})

function addMealToOrder(mealId){
    const addedMeal = getSelectedMeal(mealId)
    orderArray.unshift(addedMeal[0])
    renderOrderContainer()
}

function getSelectedMeal(mealId){
    return menuArray.filter(function(menuItem){
        return menuItem.id == mealId
    })
}

function renderOrderContainer(){
    orderContainer.style.display = "block"
    
    let orderHTML = ''
    orderArray.forEach(function(addedMeal){
        orderHTML += createOrderItem(addedMeal)
    })
    
    const order = document.getElementById("order")
    order.innerHTML = orderHTML  
    setTotalPrice()
}

function createOrderItem(addedMeal){
    const orderItemHTML = 
    ` <div class="column-item order-item">
         <div class="order-item-name-box">
             <p class="meal-name">${addedMeal.name}</p>
             <button class="remove-order-item-btn" data-removebtn="${addedMeal.id}">remove</button>
         </div>
         <p class="meal-price">$${addedMeal.price}</p>
      </div>`
    return orderItemHTML
}

function setTotalPrice(){
    document.getElementById("total-meal-price").innerHTML = "$" + getTotalPrice()
}

function getTotalPrice(){
    let totalPrice = 0
    for (const addedMeal of orderArray){
        totalPrice += addedMeal.price
    }
    return totalPrice
}

function removeMealFromOrder(mealId){
    const removedMeal = getSelectedMeal(mealId)
    orderArray.splice(orderArray.indexOf(removedMeal[0]), 1)
    if (orderArray.length > 0){
        renderOrderContainer()
    } else {
        orderContainer.style.display = "none"
    }
    
}

function completeOrder(){
    paymentModal.style.display = "block"
}

paymentForm.addEventListener("submit", function(e){
    const paymentFormData = new FormData(paymentForm)
    e.preventDefault()
    paymentModal.style.display = "none"
    paymentForm.reset()
    orderContainer.style.display = "none"
    showOrderCompleteMsg(paymentFormData.get("fname"))
})

function showOrderCompleteMsg(name){
    document.getElementById("order-complete-msg-box").style.display = "block"
    document.getElementById("order-complete-msg").innerText = 
    `Thanks, ${name}! Your order is on its way!`
}
