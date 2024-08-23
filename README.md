# Discord Bot for Displaying Local IP Addresses

This is a simple Discord bot that retrieves and displays all local IP addresses of the server it is running on. The bot is designed to work within a Docker container with `network_mode: host` to ensure it retrieves the correct IP addresses.

## Features

- **Slash Command `/ip`:** Returns all IP addresses of the server, including both IPv4 and IPv6, and whether they are internal or external.
- **Automatic IP Reporting:** The bot automatically sends the IP addresses to a specified Discord channel upon startup.

## Prerequisites

- Node.js (for development and testing outside Docker)
- Docker and Docker Compose
- A Discord bot token

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/toastedden/IPBot.git
cd IPBot
```

### 2. Create a `.env` File

Create a `.env` file in the root directory of the project and add the following variables:

```plaintext
TOKEN=your-discord-bot-token
SEND_CHANNEL=your-discord-channel-id
CLIENT_ID=your-discord-client-id
GUILD_ID=your-discord-guild-id (optional for specific guild commands)
```

### 3. Build and Run with Docker Compose

```bash
sudo docker compose up -d
```

This will build the Docker container and start the bot.

### 4. Use the Bot

- **View IPs:** Type `/ip` in any channel where the bot is active to see all IP addresses of the server.

## Development

### Running Locally

To run the bot locally without Docker:

1. Install dependencies:

    ```bash
    npm install
    ```

2. Start the bot:

    ```bash
    node .
    ```

### Building Docker Image Manually

If you prefer to build the Docker image manually:

```bash
sudo docker build -t ip-bot .
```

Then run it with:

```bash
sudo docker run --network host --env-file .env ip-bot
```

## Contributing

Feel free to submit issues or pull requests if you have any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
