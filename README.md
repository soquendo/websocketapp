WebSocket Chat with AI Responses  

Implementation Overview  
This project expands on the Week 7 WebSocket chat demo by adding an AI chatbot using OpenAI's ChatGPT API. The chatbot responds when tagged with "@bot". The chat system uses Socket.io for real-time messaging, allowing multiple users to communicate and see active participants.  

Key Features  
- real-time messaging with WebSockets  
- AI chatbot that responds when tagged  
- typing indicator for chatbot responses  
- session-based chat history  
- active user list updates dynamically  
- distinct bot message styling  

Roadblocks  
1. GitHub push protection blocked commits due to API key exposure. Fixed by removing .env from Git and storing API keys in Render environment variables.  
2. Free-tier OpenAI API exceeded request limits. Fixed by adding a mock chatbot response when requests fail.  

Deployment  
The project is hosted on Render:  
1. GitHub repo is linked to Render  
2. API key is set as an environment variable  
3. Auto-deploys on new commits  

Live Demo: (https://websocketapp-ph45.onrender.com)