// 1. Sahi Firebase Config (Sirf ek baar)
const firebaseConfig = {
  apiKey: "AIzaSyCHZdi4fAKw8vA00CvB8Mobip9a7Aavsm8",
  authDomain: "nncart.firebaseapp.com",
  projectId: "nncart",
  storageBucket: "nncart.firebasestorage.app",
  messagingSenderId: "662993037031",
  appId: "1:662993037031:web:893e379fe374cb74d26442",
  measurementId: "G-MT1YPB9M90"
};

// 2. Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const videoFeed = document.getElementById('video-feed');

// 3. Products load karne ka function
function loadProducts() {
    // "products" collection se data lena
    db.collection("products").get().then((querySnapshot) => {
        videoFeed.innerHTML = ""; 
        
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            
            // HTML structure jo video dikhayega
            videoFeed.innerHTML += `
                <div class="video-card" style="margin-bottom: 20px; border: 1px solid #ddd; padding: 10px; border-radius: 8px;">
                    <video src="${data.video_url}" autoplay muted loop style="width: 100%; border-radius: 8px;"></video>
                    <div class="product-info">
                        <h2 style="font-size: 18px; margin: 10px 0;">${data.name}</h2>
                        <p style="color: #2ecc71; font-weight: bold;">Price: ₹${data.price}</p>
                        <button class="buy-btn" style="background: #ff4757; color: white; border: none; padding: 10px; width: 100%; border-radius: 5px;" 
                        onclick="alert('Order Placed for ${data.name}!')">Buy Now</button>
                    </div>
                </div>
            `;
        });
    }).catch((error) => {
        console.error("Error getting documents: ", error);
        videoFeed.innerHTML = "Data load nahi ho raha. Rules check karein.";
    });
}

loadProducts();
