import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. APNI FIREBASE DETAILS YAHAN DALO (Firebase Console se copy karein)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. PRODUCTS LOAD KARNE KA SYSTEM
async function loadProducts(category = 'all') {
    const container = document.getElementById('product-container');
    container.innerHTML = "<p class='text-center p-10'>Loading Products...</p>";
    
    let q = collection(db, "products");
    if (category !== 'all') {
        q = query(collection(db, "products"), where("category", "==", category));
    }

    const querySnapshot = await getDocs(q);
    container.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        container.innerHTML += `
            <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                <img src="${data.image}" class="w-full h-40 object-contain mb-2 rounded-lg">
                <h3 class="font-bold text-gray-800 text-sm h-10 overflow-hidden">${data.name}</h3>
                <div class="flex justify-between items-center mt-2">
                    <p class="text-red-600 font-bold text-lg">₹${data.price}</p>
                </div>
                <button onclick="goToOrderForm('${data.name}')" 
                        class="w-full bg-red-600 hover:bg-red-700 text-white py-3 mt-3 rounded-lg font-bold transition-all shadow-md">
                    Order Karein
                </button>
            </div>
        `;
    });
}

// 3. ORDER FORM KHOLNE KA FUNCTION
window.goToOrderForm = (productName) => {
    // Aapka Form Link (Maine ise 'View' mode mein set kar diya hai)
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfp63T5w_p5q-S9v6M9-NnCart_Order_Form/viewform?entry.1234567=${encodeURIComponent(productName)}`;
    
    // Naya tab khulega jisme customer details bharega
    window.open(formUrl, '_blank');
};

// Global function for filter buttons
window.filterCategory = (cat) => loadProducts(cat);

// Sabse pehle products dikhao
loadProducts();
