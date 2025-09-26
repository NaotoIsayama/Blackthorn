// Attach a event listener to each button, clear all displays
// then use the data-attribute of each button to show the right one


categoryBtns = document.querySelectorAll('button');
categories = document.querySelectorAll('.store__category-1, .store__category-2, .store__category-3');
categoriesArray = Array.from(categories);

categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        clearActive(); //function to clear all categories of the '.active' css class

        console.log('categoriesArray is: ', categoriesArray);
        console.log('one of the btnCategories is: ', btn.dataset.btnCategory);

        selectedCategory = categoriesArray.find(
            c => c.classList.contains(btn.dataset.btnCategory)
        ); 
        
        console.log('Selected Category is: ', selectedCategory);

        selectedCategory.classList.add('active'); //Add the '.active' css class to selected category
        btn.classList.add('category-active'); //Add underline to selected category
    })
})

function clearActive() {
    categoriesArray.forEach(cat => cat.classList.remove('active')); // Set all categories to display none
    categoryBtns.forEach(btn => btn.classList.remove('category-active')); // Remove underline from each
}