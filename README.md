# Basic Discord Command Bot
Commands that I use on my server. (For maximum chaos)

## Building Docker Image
Before building the image make a file called ".env" with the following:
```
TOKEN=discord_token_here
```

Build the image by runnning the following:
```
docker build -t discord-command-bot .
```

## Running Docker Image
Run the following to run the application. If everything went alright the bot should connect to discord right at startup.
```
docker run -d --name discord-command-bot --restart=always discord-command-bot
```

## Testing
Starting:
```
node index.js
```