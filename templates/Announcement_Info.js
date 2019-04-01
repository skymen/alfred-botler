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
      },
      thumbnail: {
        url: `${CONSTANTS.GITHUB.RAW_REPO_URL_PREFIX}/assets/mini/Discordicon.png`,
        icon_url: `${CONSTANTS.GITHUB.RAW_REPO_URL_PREFIX}/assets/mini/AlfredBotlericon.png`,
      },
      description: 'Dedicated to the game development software **Construct**!\n(This server is __not official__ and run by community members!)',
      fields: [{
        name: CONSTANTS.MESSAGE.SEPARATOR,
        value: CONSTANTS.MESSAGE.EMPTY,
      },
      {
        name: 'Our Server Rules:',
        value: 'https://goo.gl/CdiBmK',
      },
      {
        name: 'Our Invitation Link:',
        value: 'https://discord.gg/dZDU7Re',
      },
      {
        name: 'Alfred Botler\'s Commands:',
        value: 'http://bit.ly/botler_source ',
      },
      {
        name: CONSTANTS.MESSAGE.EMPTY,
        value: CONSTANTS.MESSAGE.SEPARATOR,
      },
      {
        name: 'Purchase Construct 3 Now:',
        value: 'https://www.construct.net/',
      },
      {
        name: 'Try Construct 3 Now:',
        value: 'https://editor.construct.net/',
      },
      ],
      footer: {
        text: CONSTANTS.MESSAGE.SCIRRA_FOOTER,
      },
    };
  }
}
