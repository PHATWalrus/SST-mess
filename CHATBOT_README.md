# Chatbot Feature - Mess Assistant

## Overview
An AI-powered chatbot that helps students get information about mess vendors, their menus, and prices using Google's Gemini AI.

## Features
- 🤖 AI-powered responses using Gemini Pro
- 💬 Real-time chat interface
- 🍽️ Information about vendor menus and prices
- 💰 Price comparisons and recommendations
- 🎯 Smart suggestions based on user preferences

## Setup

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd server
   npm install @google/generative-ai
   ```

2. **Configure Environment Variables**
   The Gemini API key has been added to `server/.env`:
   ```
   GEMINI_API_KEY=AIzaSyBscbO7-HHmAl9o86Glc5TNr27CQ71_Syc
   ```

3. **Files Added**
   - `server/controllers/chatbot.controller.js` - Chatbot logic and Gemini AI integration
   - `server/routes/chatbot.route.js` - API route for chatbot
   - Updated `server/index.js` - Added chatbot route

### Frontend Setup

1. **Configure Environment Variables**
   Created `client/.env.local`:
   ```
   NEXT_PUBLIC_SERVER_URL=http://localhost:5000
   ```

2. **Files Added**
   - `client/components/features/chatbot/Chatbot.tsx` - Chatbot UI component
   - Updated `client/app/(pages)/(student)/student/layout.tsx` - Added chatbot to student layout

## Usage

### Starting the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the Application**
   - Navigate to `http://localhost:3000`
   - Log in as a student
   - You'll see a floating "Ask AI" button in the bottom-right corner

### Using the Chatbot

1. Click the **"Ask AI"** button to open the chatbot
2. Ask questions about:
   - Available vendors
   - Menu items
   - Prices
   - Recommendations based on preferences
   - Comparisons between vendors

### Example Questions

- "What vendors are available?"
- "Show me the cheapest option"
- "What's on the menu at Uniworld?"
- "I want vegetarian food, what do you recommend?"
- "Compare prices of all vendors"
- "What's the most expensive meal?"

## API Endpoint

### POST `/chatbot/chat`

**Request Body:**
```json
{
  "message": "What vendors are available?"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "Based on the current vendors...",
  "vendors": 3
}
```

## Features Implemented

### Backend
- ✅ Gemini AI integration
- ✅ Context-aware responses using vendor data from MongoDB
- ✅ Error handling
- ✅ CORS configuration

### Frontend
- ✅ Modern chat UI with animations
- ✅ Floating chat button
- ✅ Message history
- ✅ Loading states
- ✅ Responsive design
- ✅ Keyboard shortcuts (Enter to send)

## Architecture

```
Client (Next.js)
    ↓
Chatbot Component
    ↓
API Request to Backend
    ↓
Chatbot Controller
    ↓
Fetch Vendor Data from MongoDB
    ↓
Send to Gemini AI with Context
    ↓
Return AI Response
    ↓
Display in Chat UI
```

## Security Notes

⚠️ **Important**: The API key has been hardcoded for development. For production:
1. Use environment variables on your hosting platform
2. Never commit API keys to version control
3. Rotate keys regularly
4. Consider implementing rate limiting
5. Add authentication to the chatbot endpoint

## Troubleshooting

### Chatbot not responding
- Check if the backend server is running
- Verify `GEMINI_API_KEY` in `server/.env`
- Check browser console for errors
- Ensure MongoDB has vendor data

### CORS errors
- Verify `CLIENT_URL` in `server/.env` matches your frontend URL
- Check CORS configuration in `server/index.js`

### API Key issues
- Verify the Gemini API key is valid
- Check quota limits in Google AI Studio
- Ensure the key has proper permissions

## Future Enhancements

- 💾 Save chat history
- 📱 Better mobile responsiveness
- 🎨 Theme customization
- 🔔 Notifications for new messages
- 📊 Analytics on popular queries
- 🌐 Multi-language support
- 🖼️ Image support for menu items
- ⭐ User feedback on responses

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini Pro
- **Database**: MongoDB
- **Icons**: Lucide React
