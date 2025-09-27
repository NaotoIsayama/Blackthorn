const products = document.querySelectorAll(".product-card"); // These are anchor tags <a>

products.forEach(p => {
    p.addEventListener("click", (e) => {
        e.preventDefault(); //Prevent default nav behaviour
        
        // access each products metadata via dataset and save to sessionStorage
        sessionStorage.setItem("name", p.dataset.name);
        sessionStorage.setItem("description", p.dataset.description);
        sessionStorage.setItem("min-size", p.dataset.minSize);
        sessionStorage.setItem("price", p.dataset.price);
        sessionStorage.setItem("placement", p.dataset.placement);
        sessionStorage.setItem("image", p.dataset.image);

        // redirect
        window.location.href = '/productDetails.html';
    });
});