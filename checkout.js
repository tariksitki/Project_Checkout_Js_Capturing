

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
    let quantityP = e.target.parentElement.parentElement.querySelector("#product-quantity"); // bir kez parent dedigimizde olmuyor

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
    



