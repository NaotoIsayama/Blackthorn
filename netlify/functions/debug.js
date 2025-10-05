// debugConsole.js


exports.handler = async function(event, context) {

    console.log("hello world");
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed. Use POST.",
    };
  }

  try {
    // Parse JSON body
    const data = JSON.parse(event.body);

    // Log the request body to Netlify server logs
    console.log("Received POST request:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Logged successfully!", received: data }),
    };
  } catch (err) {
    console.error("Error parsing request body:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON" }),
    };
  }
}