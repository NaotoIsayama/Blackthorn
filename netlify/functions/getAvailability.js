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
        const roadTripQuery = `*[_type == "roadTripDocument"]{
        _id,
        trip{
            city,
            startDate,
            endDate
            }
        }`;

        const weeklyScheduleQuery = `*[_type == "weeklyAvailability"]{
        _id,
        scheduleTitle,
        Weekdays
        }`;

        const bookedDaysQuery = `*[_type == "dayBooking"]{
        _id,
        bookingTitle,
        date
        }`;

        // Query for road trip data
        const roadTrips = await client.fetch(roadTripQuery);
        const weeklySchedule = await client.fetch(weeklyScheduleQuery);
        const bookedDays = await client.fetch(bookedDaysQuery);

        // Return data as JSON
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://blackthorntattoo.naotoisayama.com',
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