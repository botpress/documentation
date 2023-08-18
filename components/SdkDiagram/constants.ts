import { Edge, Node } from 'reactflow'
import {
  BOTPRESS_NODE,
  BotpressNodeData,
  EXTERNAL_API_NODE,
  ExternalApiNodeData,
  getSourceHandleId,
  getTargetHandleId,
} from './Node'
import { EdgeData, SMOOTH_STEP_WITH_LABEL_EDGE } from './SmoothStepLabelEdge'
import { IntegrationIcon } from './IntegrationIcon'
import { BotIcon } from './BotIcon'
const INTEGRATION_SOURCE_MARKER_ID = 'source-marker-integration'
const BOT_SOURCE_MARKER_ID = 'source-marker-bot'

export const INITIAL_NODES: Node<ExternalApiNodeData | BotpressNodeData>[] = [
  {
    id: '1',
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
  {
    id: '2',
    type: BOTPRESS_NODE,
    position: { x: 175, y: 250 },
    data: {
      label: 'Gmail',
      icon: IntegrationIcon,
      defaultCurrentColorClass: 'text-fuchsia-200 dark:text-fuchsia-200/25',
      labelColorClass: 'text-fuchsia-800 dark:text-fuchsia-100',
      infoCardTitleClass: 'text-fuchsia-600 dark:text-fuchsia-200',
      headerBgClass: 'bg-fuchsia-50/50 dark:bg-fuchsia-50/10',
      sourceMarkerId: INTEGRATION_SOURCE_MARKER_ID,
      subNodes: [
        {
          title: 'channels.message.text',
          value: 'sendEmail',
          hasSource: true,
          hasTarget: true,
          details: {
            title: 'Handler',
            bodyMarkDown: `Whenever the connected Gmail account receives a new email, the webhook registered with this is called.
    `,
            actionLinks: [
              { label: 'Code', link: 'https://github.com', isExternal: true },
              { label: 'Documentation', link: 'https://botpress.com/docs' },
            ],
          },
        },
        {
          title: 'handler',
          value: 'onNewEmail',
          hasSource: true,
          hasTarget: true,
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
  {
    id: '3',
    type: BOTPRESS_NODE,
    position: { x: 500, y: 520 },
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
          title: 'Send message to user',
          value: 'sendEmail',
          hasTarget: true,
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
]

export const INITIAL_EDGES: Edge<EdgeData>[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    targetHandle: 't1',
    type: SMOOTH_STEP_WITH_LABEL_EDGE,
    markerStart: 'external',
    animated: true,
  },
  {
    id: 'e2-1',
    source: '2',
    target: '1',
    sourceHandle: getSourceHandleId(0),
    type: SMOOTH_STEP_WITH_LABEL_EDGE,
    markerStart: INTEGRATION_SOURCE_MARKER_ID,
    data: { color: '#f0abfc' },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: getSourceHandleId(1),
    targetHandle: getTargetHandleId(1),
    type: SMOOTH_STEP_WITH_LABEL_EDGE,
    markerStart: INTEGRATION_SOURCE_MARKER_ID,
    data: { color: '#f0abfc', hasLabel: false },
  },
  {
    id: 'e3-2',
    source: '3',
    target: '2',
    type: SMOOTH_STEP_WITH_LABEL_EDGE,
    targetHandle: getTargetHandleId(0),
    sourceHandle: getSourceHandleId(1),
    data: { color: '#93c5fd' },
    markerStart: BOT_SOURCE_MARKER_ID,
  },
]
