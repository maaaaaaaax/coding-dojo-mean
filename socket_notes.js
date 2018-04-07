// Perhaps the most tantalizing thing of Node.js is the ability to use web sockets - a live connection between client and server.

// Think about the concept of a chatroom:
//
// You log on to the chatroom, all current chatroom users are notified.
// Each time you post a message, everyone in the chatroom receives your message.
// Each time a different user posts a message, their message appears on your screen.
// If a user disconnects, you get a notification.

// Try mapping out this process using HTTP requests with AJAX. You'll find the standard request/response lifecycle just can't quite handle it effectively. Why? Because in steps 3 and 4, you'll realize there is a need for the server to directly interact with the client, which is backwards compared to our standard model (which is always the client making the initial request and the server simply responding).

// We need a persistent connection, meaning we need our client and server to always be connected instead of just sending requests back and forth. We don't want to send Morse code; we want something like a phone call. By 'like a phone call' we mean the ability for the client and the server to engage each other at the same time. On a call, data can pass both ways at all time: I can talk and transmit data to you while you talk and transmit data to me. This is called non-blocking communication.

// Sockets

// With Node.js, making this connection is simple. We can set up a real-time connection between each client and the server that is always listening for events from any of the clients. This is called a web socket connection. A very important facet of this connection is that it is not performed using HTTP. The other important fact is that socket connections are event-driven.

// Events

// Just like jQuery, sockets are event-driven. That means that the code we write for sockets will happen only as the events we tie to the code are triggered.

// Sockets require both client-side and server-side code. Both sides will have the ability to emit events (send events) and listen for them.

// Listening

// A socket event is very much like a jQuery event: a click, a hover, a form submission, etc. The difference is that in jQuery, we were given a particular set of events and wrote code for them. With sockets, we write our own events, therefore all events are defined by the user. Both the server and the client can listen for events.

// Emitting

// Emitting an event is the act of signaling to either a client or server: "HEY! I'm doing something!" Clients emit to the server, not other clients!

// Let's go back to the chatroom example: if I type some text into my chat box and I enter it, my text should appear on the screens of the other users (as well as mine). What is the process that's happening here? Let's walk through this:

// I enter text and submit it. This should trigger a client-side emit: "new_text"
// The server is listening for an event called "new_text", and it is triggered by the client. This gets triggered.
// When the server gets the "new_text" event, in turn, it is programmed to emit to all the clients an event called "updated_chat" and pass the new chat text to the clients.
// The clients are all listening for an event called "updated_chat" and when they get that event, the new message appends to the chat box on their screen.

// Server Event Types

// 1. Emit: The standard emit is used after an event is triggered on the server. That is after the client emits a particular event that the server is listening for. In our chat room, what this means is that when a user first connects via the socket connection, we could capture that event on the server and emit back to that particular user and only that particular user!

// 2. Broadcast: Sending out of an event to all of the sockets except for the socket connection that triggered the event is called a broadcast. In our chat room, after we emit from the server to the particular client that just joined, we might want to emit to all the other users that a new user joined the chat room

// 3. Full Broadcast: The full broadcast goes to every connected socket. Any client who has a connection to the server via web sockets will get the event emitted by a full broadcast.
