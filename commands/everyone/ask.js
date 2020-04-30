import { Command } from 'discord.js-commando';
import Ask from '../../templates/Announcement_Ask';
import CONSTANTS from '../../constants';
import { hasPermissions } from '../../bot-utils';
import { genericError } from '../../errorManagement';

export default class ask extends Command {
  constructor(client) {
    super(client, {
      name: 'ask',
      memberName: 'ask',
      group: 'everyone',
      description: 'Help you getting started asking questions',
      examples: ['ask'],
      deleteCmd: true,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onError(err, message, args, fromPattern, result) {
    return genericError(err, message, args, fromPattern, result);
  }

  hasPermission(msg) {
    const permissions = {
      roles: [CONSTANTS.ROLES.ANY],
      channels: [CONSTANTS.CHANNELS.ANY],
    };
    return hasPermissions(this.client, permissions, msg);
  }

  // eslint-disable-next-line
  async run(msg) {
    try {
      await msg.channel.send({
        embed: new Ask().embed(),
      });

      await msg.delete();
    } catch (e) {
      console.error(e);
    }
  }
}