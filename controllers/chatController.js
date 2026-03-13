const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const getChatResponse = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ message: 'Invalid messages format' });
        }

        const systemPrompt = {
            role: 'system',
            content: `You are the EA Coach Assistant, a helpful and professional customer support bot for EA Coach, a bus booking service in East Africa (Uganda, Kenya, Rwanda, Tanzania, South Sudan).
            
            Key Information:
            - Services: Bus bookings, parcels (on select routes), and private hires.
            - Popular Routes: Kampala-Nairobi, Kampala-Kigali, Kampala-Dar es Salaam, Kampala-Juba.
            - Amenities: WiFi (premium/executive), AC (premium/executive), USB charging, reclining seats.
            - Policies: 
                - Cancellations: >24h (full refund), <24h (50% refund), <2h (no refund).
                - Baggage: 1 carry-on (7kg), 1 checked (20kg). Extra is UGX 5,000/kg.
                - Arrival: 1 hour before domestic, 2 hours for international.
            - Payment: MTN MoMo, Airtel Money, Visa, Mastercard.
            - Contact: support@eacoach.com, +256 700 000 000 (Available 24/7).
            
            Guidelines:
            - Be concise, friendly, and professional.
            - Use emojis sparingly where appropriate.
            - If you don't know something, ask them to contact support at support@eacoach.com.
            - Focus on helping them book tickets, check routes, or understand policies.`
        };

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [systemPrompt, ...messages],
            max_tokens: 500,
        });

        res.json({
            message: response.choices[0].message.content,
        });
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ message: 'Failed to get response from AI assistant' });
    }
};

module.exports = {
    getChatResponse,
};
