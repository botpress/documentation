import { getCompletion } from './gpt'
import { CLIENT_METHODS } from './prompts/client-context.constants'

export async function getResponseFromPrompt(query: string): Promise<string[]> {
  const prompt = `Which category of operations are best suited for this query: "${query}". Respond in a valid JSON of type {categories:string[]}\n ### CATEGORIES: ${Object.keys(
    CLIENT_METHODS
  )}`
  console.log({ query })
  console.log({ prompt1: prompt })
  const completionResponse = await getCompletion(prompt)
  if (completionResponse.success) {
    console.log({ completion: completionResponse.completion })
    return (JSON.parse(completionResponse.completion) as { categories: string[] }).categories
  } else {
    console.log({ completionFailure: completionResponse })
    return []
  }
}

export async function getResponseFromPrompt2(query: string, categories: string[]): Promise<string[]> {
  const methodsNames = categories.reduce(
    (contextMethods, category) => contextMethods.concat(CLIENT_METHODS[category as keyof typeof CLIENT_METHODS]),
    [] as string[]
  )

  const prompt = `Which of the method(s) are best suited to respond for this query - "${query}". Respond in a valid JSON of type {methods:string[]}\n ### Methods: ${methodsNames}`
  console.log({ prompt })
  const completionResponse = await getCompletion(prompt)
  if (completionResponse.success) {
    console.log({ completion: completionResponse.completion })
    return { methods: (JSON.parse(completionResponse.completion) as { methods: string[] })?.methods || [] }.methods
  } else {
    console.log({ completionFailure: completionResponse })
    return []
  }
}

export async function getResponseFromPrompt3(query: string, methods: string[]): Promise<string[]> {
  const prompt = `using the method(s) - ${methods} that are available on the "client" object respond with valid javascript code that answers the query "${query}". Begin with const client = new Client();`
  console.log({ prompt })
  const completionResponse = await getCompletion(prompt)
  if (completionResponse.success) {
    console.log({ completion: completionResponse.completion })
    return [completionResponse.completion]
  } else {
    console.log({ completionFailure: completionResponse })
    return ['']
  }
}

function processFileContent(props: { blockName: string; processedDependencies: string[]; content: string }) {
  const fileName = props.blockName + '.ts'
  const fileContent = files[fileName]
  const { dependencyFileNames, contentWithoutImports } = getContentWithoutImports(fileContent)
  props.processedDependencies.push(props.blockName)

  props.content += contentWithoutImports + '\n'
  for (const dependency of dependencyFileNames) {
    if (props.processedDependencies.includes(dependency)) {
      continue
    }
    props.blockName = dependency
    processFileContent(props)
  }
}

function getContentWithoutImports(content: string): { dependencyFileNames: string[]; contentWithoutImports: string } {
  const dependencyFileNames: string[] = []
  let contentWithoutImports: string = ''
  for (const line of content.split('\n')) {
    if (line.startsWith('import')) {
      const dependencyFileName = line.split('from')[1].split("'")[1].replace('./', '')
      dependencyFileNames.push(dependencyFileName)
    } else {
      contentWithoutImports += line + '\n'
    }
  }
  return { dependencyFileNames, contentWithoutImports }
}

export async function executePromptChain(
  query: string,
  prompts: Array<(...args: any[]) => Promise<string[]>>
): Promise<string[]> {
  let currentArgs: [any, any] = [query, undefined]

  for (let i = 0; i < prompts.length; i++) {
    const prompt = prompts[i]
    const response = await prompt(...currentArgs)
    currentArgs = [query, response as any]
  }

  return currentArgs[1]
}
const bot = `
import { User } from './user'
import { Conversation } from './conversation'
import { Message } from './message'
export interface Bot {
  /**
   * Id of the [Bot](#schema_bot)
   */
  id: string;
  /**
   * Creation date of the [Bot](#schema_bot) in the ISO 8601 format
   */
  createdAt: string;
  /**
   * Updating date of the [Bot](#schema_bot) in the ISO 8601 format
   */
  updatedAt: string;
  /**
   * Signing secret of the [Bot](#schema_bot)
   */
  signingSecret: string;
  /**
   * A mapping of integrations to their configuration
   */
  integrations: {
    [k: string]: {
      enabled: boolean;
      /**
       * Name of the [Integration](#schema_integration)
       */
      name: string;
      /**
       * Version of the [Integration](#schema_integration)
       */
      version: string;
      webhookUrl: string;
      configuration: {
        [k: string]: unknown;
      };
      status:
        | "registration_pending"
        | "registered"
        | "registration_failed"
        | "unregistration_pending"
        | "unregistered"
        | "unregistration_failed";
      statusReason: string;
      /**
       * Id of the [Integration](#schema_integration)
       */
      id: string;
      /**
       * Creation date of the [Integration](#schema_integration) in the ISO 8601 format
       */
      createdAt: string;
      /**
       * Updating date of the [Integration](#schema_integration) in the ISO 8601 format
       */
      updatedAt: string;
      /**
       * Title of the integration. This is the name that will be displayed in the UI
       */
      title: string;
      /**
       * Description of the integration. This is the description that will be displayed in the UI
       */
      description: string;
      /**
       * URL of the icon of the integration. This is the icon that will be displayed in the UI
       */
      iconUrl: string;
    };
  };
  /**
   * A mapping of states to their definition
   */
  states: {
    [k: string]: {
      /**
       * Type of the [State](#schema_state) (conversation, user or bot)
       */
      type: "conversation" | "user" | "bot";
      /**
       * Schema of the [State](#schema_state) in the JSON schema format. This JSON schema is going to be used for validating the state data.
       */
      schema: {
        [k: string]: unknown;
      };
      /**
       * Expiry of the [State](#schema_state) in milliseconds. The state will expire if it is idle for the configured value. By default, a state doesn't expire.
       */
      expiry?: number;
    };
  };
  /**
   * Configuration of the bot
   */
  configuration: {
    /**
     * Configuration data
     */
    data: {
      [k: string]: unknown;
    };
    /**
     * Schema of the configuration in the JSON schema format. The configuration data is validated against this JSON schema.
     */
    schema: {
      [k: string]: unknown;
    };
  };
  /**
   * Events definition
   */
  events: {
    /**
     * Event Definition
     */
    [k: string]: {
      /**
       * Title of the event
       */
      title?: string;
      /**
       * Description of the event
       */
      description?: string;
      schema: {
        [k: string]: unknown;
      };
    };
  };
  /**
   * Recurring events
   */
  recurringEvents: {
    [k: string]: {
      schedule: {
        cron: string;
      };
      type: string;
      payload: {
        [k: string]: unknown;
      };
    };
  };
  /**
   * Name of the [Bot](#schema_bot)
   */
  name: string;
  /**
   * Last deployment date of the [Bot](#schema_bot) in the ISO 8601 format
   */
  deployedAt?: string;
  /**
   * Indicates if the [Bot](#schema_bot) is a development bot; Development bots run locally and can install dev integrations
   */
  dev: boolean;
  /**
   * Id of the user that created the bot
   */
  createdBy?: string;
  /**
   * Media files associated with the [Bot](#schema_bot)
   */
  medias: {
    /**
     * URL of the media file
     */
    url: string;
    /**
     * Name of the media file
     */
    name: string;
    [k: string]: unknown;
  }[];

  user: User;
  conversation: Conversation;
  message: Message;
}`
const user = `/**
* The user object represents someone interacting with the bot within a specific integration. The same person interacting with a bot in slack and messenger will be represented with two different users.
*/
export interface User {
 /**
  * Id of the [User](#schema_user)
  */
 id: string;
 /**
  * Creation date of the [User](#schema_user) in the ISO 8601 format
  */
 createdAt: string;
 /**
  * Updating date of the [User](#schema_user) in the ISO 8601 format
  */
 updatedAt: string;
 /**
  * Set of [Tags](#tags) that you can attach to a [User](#schema_user). The set of [Tags](#tags) available on a [User](#schema_user) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
  */
 tags: {
   [k: string]: string;
 };

}`
const conversation = `import { Integration } from './integration'
/**
 * The conversation object represents an exchange of messages between one or more users. A [Conversation](#schema_conversation) is always linked to an integration's channels. For example, a Slack channel represents a conversation.
 */
export interface Conversation {
  /**
   * Id of the [Conversation](#schema_conversation)
   */
  id: string;
  /**
   * Creation date of the [Conversation](#schema_conversation) in the ISO 8601 format
   */
  createdAt: string;
  /**
   * Updating date of the [Conversation](#schema_conversation) in the ISO 8601 format
   */
  updatedAt: string;
  /**
   * Name of the channel where the [Conversation](#schema_conversation) is happening
   */
  channel: string;
  /**
   * Set of [Tags](#tags) that you can attach to a [Conversation](#schema_conversation). The set of [Tags](#tags) available on a [Conversation](#schema_conversation) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
   */
  tags: {
    [k: string]: string;
  };

  integration: Integration;
}`

const integration = `import { User } from './user'
export interface Integration {
  /**
   * Id of the [Integration](#schema_integration)
   */
  id: string;
  /**
   * Creation date of the [Integration](#schema_integration) in the ISO 8601 format
   */
  createdAt: string;
  /**
   * Updating date of the [Integration](#schema_integration) in the ISO 8601 format
   */
  updatedAt: string;
  /**
   * Name of the [Integration](#schema_integration)
   */
  name: string;
  /**
   * Version of the [Integration](#schema_integration)
   */
  version: string;
  /**
   * Configuration definition
   */
  configuration: {
    /**
     * Schema of the configuration in the .
     */
    schema: {
      [k: string]: unknown;
    };
  };
  channels: {
    /**
     * Channel definition
     */
    [k: string]: {
      /**
       * Title of the channel
       */
      title?: string;
      /**
       * Description of the channel
       */
      description?: string;
      messages: {
        /**
         * Message definition
         */
        [k: string]: {
          schema: {
            [k: string]: unknown;
          };
        };
      };
      /**
       * Conversation object configuration
       */
      conversation: {
        tags: {
          /**
           * Definition of a tag that can be provided on the object
           */
          [k: string]: {
            /**
             * Title of the tag
             */
            title?: string;
            /**
             * Description of the tag
             */
            description?: string;
          };
        };
        /**
         * The conversation creation setting determines how to create a conversation through the API directly. The integration will have to implement the  functionality to support this setting.
         */
        creation: {
          /**
           * Enable conversation creation
           */
          enabled: boolean;
          /**
           * The list of tags that are required to be specified when calling the API directly to create a conversation.
           */
          requiredTags: string[];
        };
      };
      /**
       * Message object configuration
       */
      message: {
        tags: {
          /**
           * Definition of a tag that can be provided on the object
           */
          [k: string]: {
            /**
             * Title of the tag
             */
            title?: string;
            /**
             * Description of the tag
             */
            description?: string;
          };
        };
      };
    };
  };
  states: {
    /**
     * State definition
     */
    [k: string]: {
      /**
       * Type of the [State](#schema_state) 
       */
      type: "conversation" | "user" | "integration";
      /**
       * Schema of the [State](#schema_state) in the is going to be used for validating the state data.
       */
      schema: {
        [k: string]: unknown;
      };
    };
  };
  events: {
    /**
     * Event Definition
     */
    [k: string]: {
      /**
       * Title of the event
       */
      title?: string;
      /**
       * Description of the event
       */
      description?: string;
      schema: {
        [k: string]: unknown;
      };
    };
  };
  actions: {
    /**
     * Action definition
     */
    [k: string]: {
      /**
       * Title of the action
       */
      title?: string;
      /**
       * Description of the action
       */
      description?: string;
      input: {
        schema: {
          [k: string]: unknown;
        };
      };
      output: {
        schema: {
          [k: string]: unknown;
        };
      };
    };
  };
  /**
   * Indicates if the integration is a development integration; Dev integrations run locally
   */
  dev: boolean;
  /**
   * Title of the integration. This is the name that will be displayed in the UI
   */
  title: string;
  /**
   * Description of the integration. This is the description that will be displayed in the UI
   */
  description: string;
  /**
   * URL of the icon of the integration. This is the icon that will be displayed in the UI
   */
  iconUrl: string;
  /**
   * URL of the readme of the integration. This is the readme that will be displayed in the UI
   */
  readmeUrl: string;

  user: User;
}`

const message = `/**
* The Message object represents a message in a [Conversation](#schema_conversation) for a specific [User](#schema_user).
*/
export interface Message {
 /**
  * Id of the [Message](#schema_message)
  */
 id: string;
 /**
  * Creation date of the [Message](#schema_message) in the ISO 8601 format
  */
 createdAt: string;
 /**
  * Type of the [Message](#schema_message) represents the resource type that the message is related to
  */
 type: string;
 /**
  * Payload is the content type of the message. Accepted payload options: Text, Image, Choice, Dropdown, Card, Carousel, File, Audio, Video, Location
  */
 payload: {
   [k: string]: unknown;
 };
 /**
  * Direction of the message
  */
 direction: "incoming" | "outgoing";
 /**
  * ID of the [User](#schema_user)
  */
 userId: string;
 /**
  * ID of the [Conversation](#schema_conversation)
  */
 conversationId: string;
 /**
  * Set of [Tags](#tags) that you can attach to a [Conversation](#schema_conversation). The set of [Tags](#tags) available on a [Conversation](#schema_conversation) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
  */
 tags: {
   [k: string]: string;
 };

}`

const files: Record<string, string> = {
  'bot.ts': bot,
  'user.ts': user,
  'conversation.ts': conversation,
  'message.ts': message,
  'integration.ts': integration,
}
