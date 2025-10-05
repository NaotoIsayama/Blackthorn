

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('https://blackthorntattoo.naotoisayama.com/.netlify/functions/getInventory', {
        method: 'POST',
    });

    const data = await response.json();
    console.log(data);
})