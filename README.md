# Twitch Chat Games

Make sure to add the .env with the information needed to run the twitch chatbot [docs](https://dev.twitch.tv/docs/irc).

# Intro
This project provides a node server with a twitch chatbot to play games with your friends. 


It runs on node with [Socket.io](https://socket.io/) to connect all the moving parts. I probably could have gotten it to run in one process without using web sockets, but I learned how to setup a [Socket.io](https://socket.io/) project in TypeScript. 

# Ideology
There are 4 main components to this. 
- Twitch chatbot
    - Talks to and receives commands from Twitch chat. 
    - Relays the commands to the server.
- Web controller
    - Buttons to send commands to the server.
    - Used mostly in testing manually.
- Canvas 
    - Displays the game
    - Receives commands from the server
    - Runs game instance to display game.
- Server
    - Directs communication between the endpoints.
    - Runs game instance.
    - Sends updates on intervals and on canvas load to canvas to make sure the canvas' game instance is correct.

# Extendability 
It is quite easy to create a new game if you follow the pattern set in the existing games. 

I built this with one game, then extracted and decoupled the dependencies to facilitate extendability. As that resulted in a complete mess, I am still working on cleaning up the code. 

# Things I've learned
I was told to put a section like this in my projects to show recruiters I'm interested in learning new things. 

This is my second project using TypeScript. I enjoy it more than Javascript, though it is quite tedious to use initially. It may have helped me save hours on debugging. I probably wouldn't recommend it for short scripts, (I'd probably use [AlpineJS](https://alpinejs.dev/)). 

I learned a lot about using [Socket.io](https://socket.io/), which sort of uses web sockets. It was a lot easier than I anticipated. 