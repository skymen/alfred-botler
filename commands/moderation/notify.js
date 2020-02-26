/**
 * Created by Armaldio on 11/12/2017.
 */

import { Command } from 'discord.js-commando';
import { Notify } from '../../templates';
import CONSTANTS from '../../constants';
import { hasPermissions, removeDuplicates } from '../../bot-utils';
import { genericError } from '../../errorManagement';

export default class notify extends Command {
  constructor(client) {
    super(client, {
      name: 'notify',
      memberName: 'notify',
      group: 'moderation',
      description: 'Notify user and waits for their reactions',
      examples: ['notify @user1 @user2 message', 'notify Hello @user1 @user2, can you please ...'],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onError(err, message, args, fromPattern, result) {
    return genericError(err, message, args, fromPattern, result);
  }

  hasPermission(msg) {
    const permissions = {
      roles: [CONSTANTS.ROLES.STAFF],
      channels: [CONSTANTS.CHANNELS.ANY],
    };
    return hasPermissions(this.client, permissions, msg);
  }

  // eslint-disable-next-line
  async run(msg) {
    const mentions = msg.mentions.members.array();

    if (mentions.length < 1) {
      return msg.author.send('You must specify at least one person');
    }

    const ids = removeDuplicates(mentions.map((m) => `<@${m.user.id}>`));

    const notifyEmbed = new Notify({
      message: msg.content.replace(/!notify/gmi, ''),
    });

    const sent = await msg.channel.send(ids.join(', '), {
      embed: notifyEmbed.embed(),
    });
    await sent.react('🆗');
    await sent.awaitReactions((e) => {
      const users = e.users.array();

      const mentionIds = mentions.map((m) => `${m.id}`);
      let count = 0;
      users.forEach((user) => {
        if (mentionIds.includes(user.id)) {
          count += 1;
        }
      });

      if (count === mentionIds.length) {
        sent.delete();
        msg.author.send(`Your message in <#${msg.channel.id}> was accepted by everyone`);
      }
    });
    await msg.delete();
  }
}
