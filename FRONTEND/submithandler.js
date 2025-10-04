// Stripe
const stripe = Stripe("pk_test_51SE7jcPgU86ABlPi3gxvW8t3gTCMpyknODB8fWg47qx79VEpB2CkKILty5xIfXy1AmmJbEcDWUBPgZqEygdgD5jw00sD2BUVRa");

// DOM elements
const form = document.querySelector('form');
const message = document.querySelector('#submit-message');
const submit = document.getElementById('submit-button')

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await fetch('https://blackthorntattoo.naotoisayama.com/.netlify/functions/getAvailability', {
        method: 'POST',
    });

    const data = await response.json();

    console.log(data);

    //window.location.href = data.url;
}); 