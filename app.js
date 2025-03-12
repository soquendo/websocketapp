require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const OpenAI = require("openai");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.static("public"));

const users = new Set();
const chatHistory = []; // stores past messages

io.on("connection", (socket) => {
    console.log("A new user has connected to the server.");

    // shows previous chat history to the new user
    chatHistory.forEach((msg) => {
        socket.emit("chat message", msg);
    });

    socket.on("chat message", async (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);

        let responseMessage = `${socket.username}: ${msg}`;

        if (msg.startsWith("@bot")) {
            io.emit("chat message", "Bot is typing...");

            // **NO FREE API CREDITS, SO IT WON'T WORK**
            setTimeout(() => {
                responseMessage = `🤖 Bot: I'm a mock chatbot! I have exceeded quota and no free credits, but I can still chat.`;
                
                chatHistory.push(responseMessage); // store bot message
                io.emit("chat message", responseMessage);
            }, 1500);
        } else {
            chatHistory.push(responseMessage); // store user message
            io.emit("chat message", responseMessage);
        }
    });

    socket.on("set username", (username) => {
        socket.username = username;
        users.add(username);
        io.emit("user list", Array.from(users));
    });

    socket.on("disconnect", () => {
        console.log("User has disconnected:", socket.username);
        users.delete(socket.username);
        io.emit("user list", Array.from(users));
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("Server running on port ${PORT}");
});