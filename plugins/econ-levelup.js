import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/6deffaa1d3a902ef09afe.jpg');
    let user = global.db.data.users[m.sender];
    let background = 'https://telegra.ph/file/df97fbaf643c9b3743fd8.jpg'; // Fixed background URL

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
┌───⊷ *LEVEL*
▢ Number : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Role : *${user.role}*
└──────────────

Hey there, ${name}! You're not quite ready to level up just yet. It looks like you need to gobble up *${max - user.exp}* more XP to ascend to the next level and reach new heights! Keep pushing forward, and soon enough, the mortals will be singing your praises as you soar to greatness! 🚀
`.trim();

        try {
            let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let str = `
┌─⊷ *LEVEL UP*
▢ Previous level : *${user.level - 1}*
▢ Current level : *${user.level}*
▢ Role : *${user.role}*
└──────────────

, You've ascended to new heights and unlocked a level of power.${name} revel in your success! Let the mere thought of your strength strike fear into the hearts of trolls, and watch as the these mortals kneel before your command! Keep up the remarkable work, for the world is yours for the taking! 🌟 ${user.level}! 
`.trim();

        try {
            let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`;
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
        } catch (e) {
            m.reply(str);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['economy'];
handler.command = ['lvl', 'levelup', 'level'];

export default handler
