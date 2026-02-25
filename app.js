const firebaseConfig = {
  apiKey: "AIzaSyCHZdi4fAKw8vA00CvB8Mobip9a7Aavsm8",
  authDomain: "nncart.firebaseapp.com",
  projectId: "nncart",
  storageBucket: "nncart.firebasestorage.app",
  messagingSenderId: "662993037031",
  appId: "1:662993037031:web:893e379fe374cb74d26442"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.collection("products").get().then((querySnapshot) => {
    const feed = document.getElementById('video-feed');
    feed.innerHTML = ""; 
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        feed.innerHTML += `
            <div class="video-card">
                <video src="${data.video_url}" autoplay muted loop playsinline></video>
                <div class="info">
                    <h2>${data.name}</h2>
                    <p class="price">₹${data.price}</p>
                    <button class="buy-btn">Buy Now</button>
                </div>
            </div>`;
    });
}).catch(err => {
    document.getElementById('video-feed').innerHTML = "Database error: " + err.message;
});
