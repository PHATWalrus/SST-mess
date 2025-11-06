import Vendor from "../models/vendor.model.js";

export const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        // Check if API key is available
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not set in environment variables");
            return res.status(500).json({ 
                error: "Server configuration error",
                details: "API key not configured" 
            });
        }

        // Fetch all vendors with their menu and prices
        const vendors = await Vendor.find({}).select('name menu price description');

        if (vendors.length === 0) {
            return res.json({
                success: true,
                reply: "I'm sorry, but there are no vendors available in the system right now. Please check back later or contact the administrator.",
                vendors: 0
            });
        }

        // Prepare context for the AI
        const vendorContext = vendors.map(vendor => 
            `**${vendor.name}**\n- Price: ₹${vendor.price}\n- Menu Link: ${vendor.menu}\n- Description: ${vendor.description || 'Not available'}`
        ).join('\n\n');

        const fullPrompt = `You are a helpful mess (cafeteria) assistant chatbot. Your job is to help students find information about food vendors, their menus, and prices.

Here is the current vendor information:

${vendorContext}

IMPORTANT FORMATTING RULES:
1. Always use Markdown formatting in your responses
2. Use **bold** for vendor names
3. Use bullet points (-) for listing information
4. Format prices as ₹X,XXX
5. When showing menu links, format them as: [View Menu](URL)
6. Create clean, well-structured responses with proper spacing
7. Use headings (###) when appropriate
8. Never duplicate URLs or information

Please answer questions about:
- Available vendors and their menus
- Prices of meals
- Descriptions of what vendors offer
- Help students choose based on their preferences (vegetarian, non-vegetarian, price range, etc.)

Be friendly, concise, and helpful. Format your response in clean markdown. If a student asks something not related to the mess/cafeteria, politely redirect them to ask about menus and prices.

Student's question: ${message}

Your response (in Markdown):`;

        // Use REST API directly with v1beta and gemini-2.5-flash
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Gemini API error:', errorData);
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const botReply = data.candidates[0].content.parts[0].text;

        res.json({
            success: true,
            reply: botReply,
            vendors: vendors.length
        });

    } catch (error) {
        console.error("Chatbot error:", error);
        console.error("Error stack:", error.stack);
        
        // Provide more specific error messages
        let errorMessage = "Failed to process your request";
        let errorDetails = error.message;

        if (error.message?.includes("API key")) {
            errorMessage = "API key error";
            errorDetails = "Please check if the API key is valid";
        } else if (error.message?.includes("quota")) {
            errorMessage = "API quota exceeded";
            errorDetails = "Please try again later";
        }

        res.status(500).json({ 
            error: errorMessage,
            details: errorDetails 
        });
    }
};
