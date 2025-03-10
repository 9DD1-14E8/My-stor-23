import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set, push, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// 🔥 Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-5jjDcr013NMcCB_Np1WoE3G113jtdwc",
    authDomain: "stor-room.firebaseapp.com",
    databaseURL: "https://stor-room-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stor-room",
    storageBucket: "stor-room.appspot.com",
    messagingSenderId: "405366574296",
    appId: "1:405366574296:web:9e1140dd75e16c81de9bad",
    measurementId: "G-KGT3KQCHQH"
};

// 🔥 Firebase Init
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

// ✅ रजिस्टर फंक्शन
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("✅ अकाउंट सफलतापूर्वक बनाया गया!");
        })
        .catch(error => {
            alert("❌ " + error.message);
        });
}

// ✅ लॉगिन फंक्शन
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            alert("✅ लॉगिन सफल!");
            showStore();
        })
        .catch(error => {
            alert("❌ " + error.message);
        });
}

// ✅ लॉगआउट फंक्शन
function logout() {
    signOut(auth)
        .then(() => {
            document.getElementById("store").style.display = "none";
            document.getElementById("auth-box").style.display = "block";
            alert("🚪 सफलतापूर्वक लॉगआउट हुआ!");
        })
        .catch(error => {
            alert("❌ " + error.message);
        });
}

// ✅ स्टोर दिखाने का फंक्शन
function showStore() {
    document.getElementById("auth-box").style.display = "none";
    document.getElementById("store").style.display = "block";
}

// ✅ Firebase Auth Change Detection
onAuthStateChanged(auth, (user) => {
    if (user) {
        showStore();
    }
});

// ✅ कार्ट सिस्टम (Firebase में सेव करें)
function addToCart(name, price) {
    const userCartRef = ref(database, "carts/" + auth.currentUser.uid);  
    const newCartItemRef = push(userCartRef);

    set(newCartItemRef, {
        productName: name,
        productPrice: price
    }).then(() => {
        alert("✔ " + name + " कार्ट में ऐड हो गया!");
    }).catch(error => {
        alert("❌ कुछ गलती हुई: " + error.message);
    });
}

// ✅ कार्ट दिखाने का फंक्शन (Firebase से डेटा लोड करें)
function viewCart() {
    document.getElementById("store").style.display = "none";
    document.getElementById("cart-page").style.display = "block";

    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    const userCartRef = ref(database, "carts/" + auth.currentUser.uid);

    get(userCartRef).then(snapshot => {
        if (snapshot.exists()) {
            snapshot.forEach(childSnapshot => {
                const item = childSnapshot.val();
                let li = document.createElement("li");
                li.innerText = `${item.productName} - ₹${item.productPrice}`;
                cartItems.appendChild(li);
                total += item.productPrice;
            });

            document.getElementById("cart-total").innerText = total;
        } else {
            cartItems.innerHTML = "<p>आपका कार्ट खाली है!</p>";
        }
    }).catch(error => {
        alert("❌ डेटा लोड करने में समस्या हुई: " + error.message);
    });
}

// ✅ चेकआउट फंक्शन
function checkout() {
    alert("🎉 आपका ऑर्डर सफलतापूर्वक प्लेस हो गया!");
    document.getElementById("cart-page").style.display = "none";
    document.getElementById("store").style.display = "block";
}
