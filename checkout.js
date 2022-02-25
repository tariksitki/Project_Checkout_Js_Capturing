

const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener("load", () => {
    localStorage.setItem("TaxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);
    sessionStorage.setItem("TaxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
    calculateCardTotal()
})


let productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click", (e) => {
    const quantityP = e.target.parentElement.parentElement.querySelector("#product-quantity"); // bir kez parent dedigimizde olmuyor

    if (e.target.className == "fas fa-plus" || e.target == quantityP.parentElement.lastElementChild) {
        // classname de "" icinde html de yazanlar aynen yazilmali
        quantityP.innerText++;
        calculateProductTotal(quantityP);

    }   else if (e.target.classList.contains("fa-minus") || e.target == quantityP.parentElement.firstElementChild) {
        if (quantityP.innerText > 1) {
            quantityP.innerText--;
            calculateProductTotal(quantityP);
        } else {
            confirm("Are You Sure to remove this Product?") ? quantityP.parentElement.parentElement.parentElement.remove() : null;
            calculateCardTotal();
        }

    }   else if (e.target.className == "remove-product") {
        confirm("Are You Sure to remove this Product?") ? e.target.parentElement.parentElement.parentElement.remove() : null;
        // burada e.target yerine quantityP de yazilabilir
        calculateCardTotal();
    }
})




    //////////////  functions:

    function calculateProductTotal(quantityP) {
        let productPrice = quantityP.parentElement.parentElement.querySelector("strong");
        // console.log(productPrice.innerText);

        let productTotalDiv = quantityP.parentElement.parentElement.querySelector(".product-line-price");
        // console.log(productTotalDiv.innerText);

        productTotalDiv.innerText = (productPrice.innerText * quantityP.innerText).toFixed(2);
        /// carpma isleminde stringler direkt sayi olur ama toplama da olmaz

        calculateCardTotal();
    }




    function calculateCardTotal() {
        let productTotalDivs = document.querySelectorAll(".product-line-price");
        let subtotal = 0;
        productTotalDivs.forEach(eachProductTotal => {
            subtotal += parseFloat(eachProductTotal.innerText);
        })
        
        let taxPrice = subtotal * localStorage.getItem("TaxRate");
        let shippingPrice = subtotal ? (subtotal > 300 ? 0 : 15) : 0;
        let cardTotal = subtotal + taxPrice + shippingPrice;

        document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);

        document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);

        document.querySelector("#cart-shipping p:nth-child(2)").innerText = shippingPrice.toFixed(2);

        document.querySelector("#cart-total").lastElementChild.innerText = cardTotal.toFixed(2);

    }






    /////  add Product


    let form = document.getElementById("customer-form");
    let addButton = form.lastElementChild;
    let inputName = document.getElementById("name");
    let inputPrice = document.getElementById("price");
    let inputQuantity = document.getElementById("quantity");

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        let productTitles = document.querySelectorAll(".product-info > h2");
        let TitleArray = [];
        let vintage_backbag = "";
        let levi_shoes = "";
        let antique_clock = "";

        productTitles.forEach(h2 => {
            TitleArray.push(h2.innerText.toLocaleLowerCase());

            if (h2.innerText == "Vintage Backbag") {
                vintage_backbag = h2.parentElement;

            }  else if (h2.innerText == "Levi Shoes") {
                levi_shoes = h2.parentElement;

            } else if (h2.innerText == "Antique Clock") {
                antique_clock = h2.parentElement;
            }
        })
        
        // console.log(vintage_backbag);
        // console.log(levi_shoes);
        // console.log(antique_clock);

        if (inputName.value.toLocaleLowerCase().includes("vintage backbag")) {
            if (TitleArray.includes("vintage backbag")) {
                vintage_backbag.querySelector("#product-quantity").innerText++;
                inputName.value = "";
                inputName.focus();

                vintage_backbag.querySelector(".product-line-price").innerText = (vintage_backbag.querySelector("#product-quantity").innerText * vintage_backbag.querySelector("strong").innerText).toFixed(2);
                calculateCardTotal();
            
            } else if (!TitleArray.includes("vintage backbag")) {
                productsDiv.innerHTML += `
                <div class="product">
                        <img src="img/photo1.png" alt="">
                        <div class="product-info">
                            <h2>Vintage Backbag</h2>
                            <div class="product-price">
                                <p><strong>25.98</strong> <span class="line-through">34.99</span></p>
                            </div>
                            <div class="quantity-controller">
                                <button>
                                    <i class="fas fa-minus"></i>
                                </button>
                                <p id="product-quantity">1</p> 
                                <button>
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="product-removal">
                                <button class="remove-product">
                                    Remove
                                </button>
                            </div>
                            <div class="product-line-price">25.98</div>
                        </div>
                    </div>`
                    inputName.value = "";
                    inputName.focus();
                    calculateCardTotal();
            }

        } else if (inputName.value.toLocaleLowerCase().includes("levi shoes")){ 
                if (TitleArray.includes("levi shoes")) {
                    levi_shoes.querySelector("#product-quantity").innerText++;

                    levi_shoes.querySelector(".product-line-price").innerText = (levi_shoes.querySelector("#product-quantity").innerText * levi_shoes.querySelector("strong").innerText).toFixed(2);
                    inputName.value = "";
                    inputName.focus();
                    calculateCardTotal();

                } else {
                    productsDiv.innerHTML += `
                    <div class="product">
                    <img src="img/photo2.png" alt="">
                    <div class="product-info">
                        <h2>Levi Shoes</h2>
                        <div class="product-price">
                            <p><strong>45.99</strong> <span class="line-through">54.99</span></p>
                        </div>
                        <div class="quantity-controller">
                            <button>
                                <i class="fas fa-minus"></i>
                            </button>
                            <p id="product-quantity">1</p>
                            <button>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="product-removal">
                            <button class="remove-product">
                                Remove
                            </button>
                        </div>
                        <div class="product-line-price">45.99</div>
                    </div>
                </div>`

                inputName.value = "";
                inputName.focus();
                calculateCardTotal();
}

            } else if (inputName.value.toLocaleLowerCase().includes("antique clock")) {
                 if (TitleArray.includes("antique clock")) {
                     antique_clock.querySelector("#product-quantity").innerText++;
                
                     antique_clock.querySelector(".product-line-price").innerText = (antique_clock.querySelector("#product-quantity").innerText * antique_clock.querySelector("strong").innerText).toFixed(2);
                     calculateCardTotal();
                     inputName.value = "";
                     inputName.focus();
                 
                } else {
                    productsDiv.innerHTML += `
                    <div class="product">
                    <img src="img/photo3.jpg" alt="">
                    <div class="product-info">
                        <h2>Antique Clock</h2>
                        <div class="product-price">
                            <p><strong>74.99</strong> <span class="line-through">94.99</span></p>
                        </div>
                        <div class="quantity-controller">
                            <button>
                                <i class="fas fa-minus"></i>
                            </button>
                            <p id="product-quantity">1</p>
                            <button>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="product-removal">
                            <button class="remove-product">
                                Remove
                            </button>
                        </div>
                        <div class="product-line-price">74.99</div>
                    </div>
                </div>`
                calculateCardTotal();
                inputName.value = "";
                inputName.focus();
} 
    }
    })
    

    inputName.addEventListener("keydown", (e) => {
        if (e.key == "Enter") {
            addButton.click();
        }
    })
