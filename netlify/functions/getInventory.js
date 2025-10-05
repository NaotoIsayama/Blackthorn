const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'ubte0m8k',
    dataset: 'production',
    apiVersion: '2025-09-08',
    useCdn: false,
})

exports.handler = async function(event) {

    // Filter out Non Post requests and requests not from blackthorn
    if (event.httpMethod !== 'POST' && event.headers.origin !== "https://blackthorntattoo.naotoisayama.com/form") {
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
        

        // Query for road trip data

        // Return data as JSON
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': "*", //CHANGE THIS TO PROD URL !!!!!!!!!
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roadTrips,
                weeklySchedule,
                bookedDays
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({error: err.message})
        };
    }
};