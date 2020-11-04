import CONSTANTS from '../constants';
import Template from './Template';

export default class Info extends Template {
  constructor() {
    super('info', {}, {});
  }

  // eslint-disable-next-line
  embed() {
    return {
      color: 11962861,
      author: {
        name: 'WELCOME IN THE CONSTRUCT COMMUNITY!',
        icon_url: `${CONSTANTS.GITHUB.RAW_REPO_URL_PREFIX}/assets/mini/DiscordNotifyicon.png`,
      },
      thumbnail: {
        url: `${CONSTANTS.GITHUB.RAW_REPO_URL_PREFIX}/assets/mini/Discordicon.png`,
      },
      description: 'Dedicated to the game development software **Construct**!\n(This server is __not official__ and run by Community Members!)',
      fields: [{
        name: CONSTANTS.MESSAGE.SEPARATOR,
        value: CONSTANTS.MESSAGE.EMPTY,
      },
      {
        name: 'Rules & Acknowledgements:',
        value: 'http://bit.ly/CC_rules',
      },
      {
        name: 'Server Invitation Link:',
        value: 'https://discord.gg/dZDU7Re',
      },
      {
        name: 'Alfred Botler\'s Commands:',
        value: 'http://bit.ly/botler_source',
      },
      {
        name: CONSTANTS.MESSAGE.EMPTY,
        value: CONSTANTS.MESSAGE.SEPARATOR,
      },
      {
        name: '<:C3:561134796911280128> Try Construct 3 Now:',
        value: 'https://www.construct.net/',
      },
      {
        name: '<:C3:561134796911280128> Purchase Construct 3 Now:',
        value: 'https://www.construct.net/make-games/buy-construct',
      },
      ],
      footer: {
        text: CONSTANTS.MESSAGE.SCIRRA_FOOTER,
      },
    };
  }
}