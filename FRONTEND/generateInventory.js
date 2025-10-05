

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('https://blackthorntattoo.naotoisayama.com/.netlify/functions/getInventory', {
        method: 'POST',
    });

    const data = await response.json();

    console.log(data);

   const inventory = data.inventory

   console.log(inventory);

    // DOM elements
    const cat_1 = document.querySelector(".store__category-1");
    const cat_2 = document.querySelector(".store__category-2");
    const cat_3 = document.querySelector(".store__category-3");

    for (let item of inventory) {
        console.log("item name is: ", item.flashName);

        // create top level a tag
        const product_card = document.createElement("a");
        product_card.classList.add("product-card");
        product_card.href = "productDetails.html";

        const dataAttributes = {
            name: item.flashName,
            description: item.description,
            minSize: item.minSize,
            price: item.price,
            placement: item.placementAreas.toString(),
            image: item.imageUrl,
            //time: item.time
        }

        for (const key in dataAttributes) {
            product_card.dataset[key] = dataAttributes[key];
        }

        // create img tag
        const img = document.createElement("img");
        img.src = item.imageUrl;

        // create h3
        const h3 = document.createElement("h3");
        h3.textContent = item.flashName;
        h3.classList.add("product-card__title", "sc-body", "dark");

        // create price
        const p = document.createElement("p");
        p.textContent = `$${item.price}`;
        p.classList.add("product-price", "sc-body", "dark");

        product_card.append(img, h3, p);

        switch (item.category) {
            case 1:
                cat_1.append(product_card);
                break;

            case 2:
                cat_2.append(product_card);
                break;

            case 3:
                cat_3.append(product_card);
                break;

            default:
                console.warn("Error with category");
                return;
        }
    }

    // Product handler
    const products = document.querySelectorAll(".product-card"); // These are anchor tags <a>

    products.forEach(p => {
        p.addEventListener("click", (e) => {

            console.log("event listener attached");
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

})