import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. APNI FIREBASE DETAILS YAHAN DALO
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 2. GOOGLE LOGIN SYSTEM
document.getElementById('loginBtn').onclick = () => {
    signInWithPopup(auth, provider).then((result) => {
        alert("Swagat hai, " + result.user.displayName);
        document.getElementById('loginBtn').innerText = "Logged In";
    }).catch((error) => console.log(error));
};

// 3. PRODUCTS LOAD AUR CATEGORY FILTER
async function loadProducts(category = 'all') {
    const container = document.getElementById('product-container');
    container.innerHTML = "<p class='text-center col-span-2'>Loading...</p>";
    
    let q = collection(db, "products");
    if (category !== 'all') {
        q = query(collection(db, "products"), where("category", "==", category));
    }

    const querySnapshot = await getDocs(q);
    container.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        container.innerHTML += `
            <div class="bg-white p-3 rounded-lg shadow-md border border-gray-100">
                <img src="${data.image}" class="w-full h-40 object-contain mb-2">
                <h3 class="font-bold text-sm">${data.name}</h3>
                <p class="text-red-600 font-bold text-lg">₹${data.price}</p>
                <button onclick="openOrderForm('${data.name}')" 
                        class="w-full bg-red-600 text-white py-2 mt-2 rounded text-sm font-bold active:bg-red-700">
                    Buy Now
                </button>
            </div>
        `;
    });
}

// 4. BUY NOW DABATE HI FORM KHULEGA
window.openOrderForm = (productName) => {
    // Ye aapka banaya hua Form hai
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfp63T5w_p5q-S9v6M9-NnCart_Order_Form/viewform?usp=pp_url&entry.1234567=" + encodeURIComponent(productName);
    window.open(formUrl, '_blank');
};

// Global function for filter buttons
window.filterCategory = (cat) => loadProducts(cat);

// Sabse pehle saare products dikhao
loadProducts();
