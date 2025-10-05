const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'ubte0m8k',
    dataset: 'production',
    apiVersion: '2025-09-08',
    useCdn: false,
})

exports.handler = async function(event) {

    // Filter out Non Post requests and requests not from blackthorn
    if (event.httpMethod !== 'POST' && event.headers.origin !== "https://blackthorntattoo.naotoisayama.com/flashstore") {
        return {
            statusCode: 405,
            headers: {
                'Allow': 'POST'
            },
            body: 'Method not allowed',
        };
    };

    // Main Try-Catch Block
    try {
        // Build GROQ queries here
        const inventoryQuery = `*[_type == "repeatFlash"]{
        _id,
        flashName,
        description,
        category,
        minSize,
        price,
        placementAreas[],
        "imageUrl": flashImage.asset->url
        }`

        const inventory = await client.fetch(inventoryQuery);

        console.log(inventory);

        // Return data as JSON
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': "*", //CHANGE THIS TO PROD URL !!!!!!!!!
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inventory
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: err.message})
        };
    }
};