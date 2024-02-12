import { exec } from 'child_process'
import speed from 'performance-now'

let handler = async (m, { conn }) => {
  let thumbnail = 'https://telegra.ph/file/3270d99f0daeee572ca74.jpg'
  let fgg = { key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' }, message: { contactMessage: { displayName: `GURU-BOT`, vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'𝙃𝙊𝙈𝙀𝙇𝘼𝙉𝘿𝙀𝙍'\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`}}}
  let pingMsg = await conn.sendMessage(m.chat, {text: 'Pinging...'}, {quoted: fgg})

  let timestamp = speed()

  await exec('neofetch --stdout', async (error, stdout) => {

    let latency = (speed() - timestamp).toFixed(4)

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: pingMsg.key,
        type: 14,
        editedMessage: {
          conversation: `Pong! Latency: ${latency} ms` 
        }
      }
    }, {})

  })

}

handler.help = ['ping']
handler.tags = ['main']
handler.command = ['ping', 'speed'] 

export default handler
