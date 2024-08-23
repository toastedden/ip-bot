require('dotenv').config();
const os = require('os');
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

// Get the network interfaces
const networkInterfaces = os.networkInterfaces();

// Function to get all IP addresses
function getAllIPAddresses() {
    const ipAddresses = [];

    for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        for (const addressInfo of addresses) {
            const type = addressInfo.family === 'IPv4' ? 'IPv4' : 'IPv6';
            const internalStatus = addressInfo.internal ? ' (Internal)' : ' (External)';
            ipAddresses.push(`${interfaceName} - ${type}: ${addressInfo.address}${internalStatus}`);
        }
    }

    return ipAddresses;
}

// Convert the IPs to a string
const allIPs = getAllIPAddresses();
const ipString = `All IPs:\n${allIPs.join('\n')}`;

// Use environment variables from .env
const token = process.env.TOKEN;
const sendChannel = process.env.SEND_CHANNEL;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; // Optional: Specific guild ID if not global

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Define the slash command
const commands = [
    {
        name: 'ip',
        description: 'Replies with all IP addresses of the server.',
    },
];

// Register the slash command
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log('Bot is online!');

    const channel = client.channels.cache.get(sendChannel);
    if (channel) {
        channel.send(ipString);
    } else {
        console.log('Send channel not found.');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ip') {
        await interaction.reply(ipString);
    }
});

client.login(token);