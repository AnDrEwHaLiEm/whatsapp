const { Client } = require('whatsapp-web.js');
const { MessageMedia } = require('whatsapp-web.js');
var cors = require('cors')
const express = require('express');
const app = express()
const fs = require('fs')

app.use(cors());
app.use(express.json())


async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}
// client.on('ready', async () => {
//     console.log('Client is ready!');
//     let x = 0;
//     for (element of data) {
//         await sleep(60000);
//         const index = parseInt(x);
//         const mediaPath = mediaMessageData[index % 3];
//         const otherMedia = await MessageMedia.fromFilePath(mediaPath);
//         const message = caption[index % 3];
//         const messageInfo = await client.sendMessage(element.phone + '@c.us', otherMedia, { caption: message });
//         x++;
//         datamessage += `<tr>
//         <td style="border: 1px solid;">${element.phone}</td>
//         <td style="border: 1px solid;"><img src="${mediaPath}" width="100" height="100"> </td>
//         <td style="border: 1px solid;">${message}</td>
//         </tr>`
//         //const media = await MessageMedia.fromUrl('https://systemha.com/_next/static/media/logo.305a471a.png');
//     };


//     datamessage += `</tbody>
// </table>
// </body>
// </html>`;
// console.log("all message sent Mr. Andrew Haliem 4000 of world")
//     fs.writeFile('output.html', datamessage, (err) => {
//         if (err) throw err;
//     });

// });
let qrCode;
const client = new Client({ puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] } });
client.on('qr', async (qr) => {
  console.log('QR RECEIVED', qr);
  qrCode = qr;
})
let phoneNumbers = [];
let messages = [];
let photo = [];
app.post('/send-message', async (req, res) => {
  const { message, phoneNumber, images } = req.body;
  phoneNumbers = phoneNumber;
  messages = message;
  photo = images;
  client.on('qr', async (qr) => {
    return res.json({ qr });
  })
  client.initialize();
})

client.on('ready', async () => {
  console.log('client is ready !');
  let x = 0;
  for (element of phoneNumbers) {
    await sleep(10000);
    const index = parseInt(x);
    const mediaPath = photo[index % 3];
    const media = await MessageMedia.fromUrl(mediaPath);
    const caption = messages[index % 3];
    await client.sendMessage(element + '@c.us', media, { caption });
    x++;
  }
})

app.get('/', (req, res) => {
  res.send("Hello World");
});



app.listen(process.env.PORT || 4000, async () => {
  console.log("server is running");
});
