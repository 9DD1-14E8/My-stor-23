// डेमो यूज़र डेटा
const validUser = { username: "user", password: "1234" };

// लॉगिन फंक्शन
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUser.username && password === validUser.password) {
        localStorage.setItem("loggedIn", "true");
        showStore();
    } else {
        alert("गलत यूज़रनेम या पासवर्ड!");
    }
}

// स्टोर दिखाने का फंक्शन
function showStore() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("store").style.display = "block";
}

// कार्ट सिस्टम
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " कार्ट में ऐड हो गया!");
}

// कार्ट दिखाने का फंक्शन
function viewCart() {
    document.getElementById("store").style.display = "none";
    document.getElementById("cart-page").style.display = "block";

    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    document.getElementById("cart-total").innerText = total;
}

// चेकआउट फंक्शन
function checkout() {
    localStorage.removeItem("cart");
    cart = [];
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("checkout-page").style.display = "block";
}

// स्टोर पर वापस जाने का फंक्शन
function backToStore() {
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("store").style.display = "block";
}

// लॉगआउट फंक्शन
function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("checkout-page").style.display = "none";
    document.getElementById("login-box").style.display = "block";
}

// अगर यूज़र पहले से लॉगिन है, तो स्टोर दिखाएँ
if (localStorage.getItem("loggedIn") === "true") {
    showStore();
}
