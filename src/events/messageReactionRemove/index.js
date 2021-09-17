const { discord_log } = require('../../discord_log.js');
const { role_channel, role_message, roles } = require("../../config.json");

module.exports = {
    name: 'messageReactionRemove',
    async execute({ message, _emoji }, user) {
        if (user.bot || message.id !== role_message) {
            return;
        }

        const guild = message.guild;
        const member = guild.members.cache.get(user.id);
        const role = guild.roles.cache.find((role) => role.name === roles[_emoji]);

        discord_log(`<@${user.id}> removed reaction ${_emoji}.`);

        if (!role) {
            discord_log(`Role not found for '${_emoji.name}'`);
            return;
        }

        try {
            member.roles.remove(role.id);
        } catch (err) {
            discord_log('Error removing role', err);
            return;
        }
    },
};