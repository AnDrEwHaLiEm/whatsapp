const { Client } = require('whatsapp-web.js');

const client = new Client();



client.on('qr', async (qr) => {
    console.log(qr);
})


client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage("201275770953@c.us", "Hi Andrew \n *It Still Working*");
});


client.initialize();