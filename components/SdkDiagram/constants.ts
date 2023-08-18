import { Edge } from 'reactflow'
import { BotIcon } from './BotIcon'
import { BOTPRESS_NODE, EXTERNAL_API_NODE } from './Node'
import { NodeCreator, getHandleBuilder } from './Node/Node'
import { EdgeData } from './SmoothStepLabelEdge'
const INTEGRATION_SOURCE_MARKER_ID = 'source-marker-integration'
const BOT_SOURCE_MARKER_ID = 'source-marker-bot'

export const gmailNode = new NodeCreator(
  {
    position: { x: 10, y: 10 },
    type: EXTERNAL_API_NODE,
    data: {
      label: 'Google API',
      link: {
        url: 'https://developers.google.com/gmail/api/reference/rest',
        title: '(via Google APIs)',
      },
      subNodes: [
        {
          title: 'webhook',
          value: 'users/{userId}/watch',
          details: {
            title: 'Webhook',
            bodyMarkDown: `Whenever the connected Gmail account receives a new email, the webhook **previously registered** with Gmail account is called.`,
            actionLinks: [
              {
                label: 'Gmail API Reference',
                isExternal: true,
                link: 'https://developers.google.com/gmail/api/reference/rest/v1/users/watch',
              },
            ],
          },
        },
        {
          title: 'POST',
          value: 'users/{userId}/messages/send',
          details: {
            title: 'Send an email',
            bodyMarkDown: `When the integration wants to send a new email **on behalf** of the registered Gmail account, it calls this endpoint.`,
            actionLinks: [
              {
                label: 'Gmail API Reference',
                isExternal: true,
                link: 'https://developers.google.com/gmail/api/reference/rest/v1/users.messages/send?hl=fr',
              },
            ],
          },
        },
      ],
    },
  },
  getHandleBuilder('p1').appendHandle('p2'),
  getHandleBuilder('d2').appendHandle('d1')
)
export const botNode = new NodeCreator(
  {
    position: { x: 500, y: 10 },
    type: BOTPRESS_NODE,
    data: {
      label: 'Mail Shrimp',
      icon: BotIcon,
      defaultCurrentColorClass: 'text-blue-200 dark:text-blue-200/25',
      labelColorClass: 'text-blue-800 dark:text-blue-100',
      infoCardTitleClass: 'text-blue-600 dark:text-blue-200',
      headerBgClass: 'bg-blue-50/50 dark:bg-blue-50/10',
      sourceMarkerId: BOT_SOURCE_MARKER_ID,
      subNodes: [
        {
          title: 'Event',
          value: 'OnNewEmail',
          hasTarget: true,
          details: {
            title: 'Handler',
            bodyMarkDown: `When the Gmail integration receives a new message it passes it over to the bot where it's received as an *event trigger*. The uses can use the event triggers to start a series of node to process and react on the incoming event, in this case, a new incoming email.`,
            actionLinks: [
              { label: 'Code', link: 'https://github.com', isExternal: true },
              { label: 'Documentation', link: 'https://botpress.com/docs/integration/concepts/events/' },
            ],
          },
        },
        {
          title: 'Trigger',
          value: 'createMessage',
          hasSource: true,
          details: {
            title: 'Handler',
            bodyMarkDown: `The handler function is used to handle the incoming requests from the integration. Which means that this
              function will be called every time the telegram integration sends a request to the webhook url set in the
              register function.\n\nIn this case, when the Gmail API has a new email it calls the webhook url we’ve registered with it. The
              request is parsed by the handler which in turn calls the onNewEmail function defined in the integration
              implementation.
    `,
            actionLinks: [
              { label: 'Code', link: 'https://github.com', isExternal: true },
              { label: 'Documentation', link: 'https://botpress.com/docs' },
            ],
          },
        },
      ],
    },
  },
  getHandleBuilder('p1').appendHandle('p2'),
  getHandleBuilder('d2').appendHandle('d1')
)
