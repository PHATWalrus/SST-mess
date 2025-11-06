export const testGemini = async (req, res) => {
    try {
        console.log("Testing Gemini API...");
        console.log("API Key available:", !!process.env.GEMINI_API_KEY);
        console.log("API Key (first 10 chars):", process.env.GEMINI_API_KEY?.substring(0, 10));

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ 
                error: "GEMINI_API_KEY not found in environment" 
            });
        }

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
                        text: "Say hello!"
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('Gemini API error:', data);
            return res.status(500).json({ 
                error: data.error?.message || "API request failed",
                details: data
            });
        }

        const text = data.candidates[0].content.parts[0].text;

        res.json({
            success: true,
            message: "Gemini API is working!",
            response: text
        });

    } catch (error) {
        console.error("Gemini test error:", error);
        res.status(500).json({ 
            error: error.message,
            stack: error.stack
        });
    }
};
