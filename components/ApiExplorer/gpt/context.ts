type getConversation = (params: GetConversationBaseParams) => GetConversationResponse

type GetConversationBaseParams = {
  /**
   * Conversation id
   */
  id: string
}

interface GetConversationResponse {
  conversation: Conversation
}

/**
 * The conversation object represents an exchange of messages between one or more users. A [Conversation](#schema_conversation) is always linked to an integration's channels. For example, a Slack channel represents a conversation.
 */
interface Conversation {
  /**
   * Id of the [Conversation](#schema_conversation)
   */
  id: string
  /**
   * Creation date of the [Conversation](#schema_conversation) in the ISO 8601 format
   */
  createdAt: string
  /**
   * Updating date of the [Conversation](#schema_conversation) in the ISO 8601 format
   */
  updatedAt: string
  /**
   * Name of the channel where the [Conversation](#schema_conversation) is happening
   */
  channel: string
  /**
   * Set of [Tags](#tags) that you can attach to a [Conversation](#schema_conversation). The set of [Tags](#tags) available on a [Conversation](#schema_conversation) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
   */
  tags: {
    [k: string]: string
  }

  integration: Integration
}

interface Integration {
  /**
   * Id of the [Integration](#schema_integration)
   */
  id: string
  /**
   * Creation date of the [Integration](#schema_integration) in the ISO 8601 format
   */
  createdAt: string
  /**
   * Updating date of the [Integration](#schema_integration) in the ISO 8601 format
   */
  updatedAt: string
  /**
   * Name of the [Integration](#schema_integration)
   */
  name: string
  /**
   * Version of the [Integration](#schema_integration)
   */
  version: string
  /**
   * Configuration definition
   */
  configuration: {
    schema: {
      [k: string]: unknown
    }
  }
  channels: {
    /**
     * Channel definition
     */
    [k: string]: {
      /**
       * Title of the channel
       */
      title?: string
      /**
       * Description of the channel
       */
      description?: string
      messages: {
        /**
         * Message definition
         */
        [k: string]: {
          schema: {
            [k: string]: unknown
          }
        }
      }
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
            title?: string
            /**
             * Description of the tag
             */
            description?: string
          }
        }
        /**
         * The conversation creation setting determines how to create a conversation through the API directly. The integration will have to implement the functionality to support this setting.
         */
        creation: {
          /**
           * Enable conversation creation
           */
          enabled: boolean
          /**
           * The list of tags that are required to be specified when calling the API directly to create a conversation.
           */
          requiredTags: string[]
        }
      }
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
            title?: string
            /**
             * Description of the tag
             */
            description?: string
          }
        }
      }
    }
  }
  states: {
    /**
     * State definition
     */
    [k: string]: {
      /**
       * Type of the [State](#schema_state)
       */
      type: 'conversation' | 'user' | 'integration'
      /**
       * Schema of the [State](#schema_state) in the is going to be used for validating the state data.
       */
      schema: {
        [k: string]: unknown
      }
    }
  }
  events: {
    /**
     * Event Definition
     */
    [k: string]: {
      /**
       * Title of the event
       */
      title?: string
      /**
       * Description of the event
       */
      description?: string
      schema: {
        [k: string]: unknown
      }
    }
  }
  actions: {
    /**
     * Action definition
     */
    [k: string]: {
      /**
       * Title of the action
       */
      title?: string
      /**
       * Description of the action
       */
      description?: string
      input: {
        schema: {
          [k: string]: unknown
        }
      }
      output: {
        schema: {
          [k: string]: unknown
        }
      }
    }
  }
  /**
   * Indicates if the integration is a development integration; Dev integrations run locally
   */
  dev: boolean
  /**
   * Title of the integration. This is the name that will be displayed in the UI
   */
  title: string
  /**
   * Description of the integration. This is the description that will be displayed in the UI
   */
  description: string
  /**
   * URL of the icon of the integration. This is the icon that will be displayed in the UI
   */
  iconUrl: string
  /**
   * URL of the readme of the integration. This is the readme that will be displayed in the UI
   */
  readmeUrl: string

  user: User
}

/**
 * The user object represents someone interacting with the bot within a specific integration. The same person interacting with a bot in slack and messenger will be represented with two different users.
 */
interface User {
  /**
   * Id of the [User](#schema_user)
   */
  id: string
  /**
   * Creation date of the [User](#schema_user) in the ISO 8601 format
   */
  createdAt: string
  /**
   * Updating date of the [User](#schema_user) in the ISO 8601 format
   */
  updatedAt: string
  /**
   * Set of [Tags](#tags) that you can attach to a [User](#schema_user). The set of [Tags](#tags) available on a [User](#schema_user) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
   */
  tags: {
    [k: string]: string
  }
}

type listConversations = (params: ListConversationsBaseParams) => ListConversationsResponse

type ListConversationsBaseParams = {
  /**
   * Provide the "meta.nextToken" value provided in the last API response to retrieve the next page of results
   */
  nextToken: string
  /**
   * Filter by tags
   */
  tags: object
  /**
   * Filter by participant ids
   */
  participantIds: string[]
}

interface ListConversationsResponse {
  /**
   * List of [Conversation](#schema_conversation) objects ordered by creation date (most recent first)
   */
  conversations: Conversation[]
  meta: {
    /**
     * The token to use to retrieve the next page of results, passed as a query string parameter (value should be URL-encoded) to this API endpoint.
     */
    nextToken?: string
  }
}

type getOrCreateConversation = (params: GetOrCreateConversationBody) => GetOrCreateConversationResponse

interface GetOrCreateConversationBody {
  /**
   * Channel name
   */
  channel: string
  /**
   * Tags for the [Conversation](#schema_conversation)
   */
  tags: {
    [k: string]: string
  }
  /**
   * Name of the integration to which the conversation creation will be delegated
   */
  integrationName?: string
}

interface GetOrCreateConversationResponse {
  conversation: Conversation
}

export const CONSTANT = `type getConversation = (params: GetConversationBaseParams) => GetConversationResponse

type GetConversationBaseParams = {
  /**
   * Conversation id
   */
  id: string
}

interface GetConversationResponse {
  conversation: Conversation
}

/**
 * The conversation object represents an exchange of messages between one or more users. A [Conversation](#schema_conversation) is always linked to an integration's channels. For example, a Slack channel represents a conversation.
 */
interface Conversation {
  /**
   * Id of the [Conversation](#schema_conversation)
   */
  id: string
  /**
   * Creation date of the [Conversation](#schema_conversation) in the ISO 8601 format
   */
  createdAt: string
  /**
   * Updating date of the [Conversation](#schema_conversation) in the ISO 8601 format
   */
  updatedAt: string
  /**
   * Name of the channel where the [Conversation](#schema_conversation) is happening
   */
  channel: string
  /**
   * Set of [Tags](#tags) that you can attach to a [Conversation](#schema_conversation). The set of [Tags](#tags) available on a [Conversation](#schema_conversation) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
   */
  tags: {
    [k: string]: string
  }

  integration: Integration
}

interface Integration {
  /**
   * Id of the [Integration](#schema_integration)
   */
  id: string
  /**
   * Creation date of the [Integration](#schema_integration) in the ISO 8601 format
   */
  createdAt: string
  /**
   * Updating date of the [Integration](#schema_integration) in the ISO 8601 format
   */
  updatedAt: string
  /**
   * Name of the [Integration](#schema_integration)
   */
  name: string
  /**
   * Version of the [Integration](#schema_integration)
   */
  version: string
  /**
   * Configuration definition
   */
  configuration: {
    schema: {
      [k: string]: unknown
    }
  }
  channels: {
    /**
     * Channel definition
     */
    [k: string]: {
      /**
       * Title of the channel
       */
      title?: string
      /**
       * Description of the channel
       */
      description?: string
      messages: {
        /**
         * Message definition
         */
        [k: string]: {
          schema: {
            [k: string]: unknown
          }
        }
      }
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
            title?: string
            /**
             * Description of the tag
             */
            description?: string
          }
        }
        /**
         * The conversation creation setting determines how to create a conversation through the API directly. The integration will have to implement the functionality to support this setting.
         */
        creation: {
          /**
           * Enable conversation creation
           */
          enabled: boolean
          /**
           * The list of tags that are required to be specified when calling the API directly to create a conversation.
           */
          requiredTags: string[]
        }
      }
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
            title?: string
            /**
             * Description of the tag
             */
            description?: string
          }
        }
      }
    }
  }
  states: {
    /**
     * State definition
     */
    [k: string]: {
      /**
       * Type of the [State](#schema_state)
       */
      type: 'conversation' | 'user' | 'integration'
      /**
       * Schema of the [State](#schema_state) in the is going to be used for validating the state data.
       */
      schema: {
        [k: string]: unknown
      }
    }
  }
  events: {
    /**
     * Event Definition
     */
    [k: string]: {
      /**
       * Title of the event
       */
      title?: string
      /**
       * Description of the event
       */
      description?: string
      schema: {
        [k: string]: unknown
      }
    }
  }
  actions: {
    /**
     * Action definition
     */
    [k: string]: {
      /**
       * Title of the action
       */
      title?: string
      /**
       * Description of the action
       */
      description?: string
      input: {
        schema: {
          [k: string]: unknown
        }
      }
      output: {
        schema: {
          [k: string]: unknown
        }
      }
    }
  }
  /**
   * Indicates if the integration is a development integration; Dev integrations run locally
   */
  dev: boolean
  /**
   * Title of the integration. This is the name that will be displayed in the UI
   */
  title: string
  /**
   * Description of the integration. This is the description that will be displayed in the UI
   */
  description: string
  /**
   * URL of the icon of the integration. This is the icon that will be displayed in the UI
   */
  iconUrl: string
  /**
   * URL of the readme of the integration. This is the readme that will be displayed in the UI
   */
  readmeUrl: string

  user: User
}

/**
 * The user object represents someone interacting with the bot within a specific integration. The same person interacting with a bot in slack and messenger will be represented with two different users.
 */
interface User {
  /**
   * Id of the [User](#schema_user)
   */
  id: string
  /**
   * Creation date of the [User](#schema_user) in the ISO 8601 format
   */
  createdAt: string
  /**
   * Updating date of the [User](#schema_user) in the ISO 8601 format
   */
  updatedAt: string
  /**
   * Set of [Tags](#tags) that you can attach to a [User](#schema_user). The set of [Tags](#tags) available on a [User](#schema_user) is restricted by the list of [Tags](#tags) defined previously by the [Bot](#schema_bot). Individual keys can be unset by posting an empty value to them.
   */
  tags: {
    [k: string]: string
  }
}

type listConversations = (params: ListConversationsBaseParams) => ListConversationsResponse

type ListConversationsBaseParams = {
  /**
   * Provide the "meta.nextToken" value provided in the last API response to retrieve the next page of results
   */
  nextToken: string
  /**
   * Filter by tags
   */
  tags: object
  /**
   * Filter by participant ids
   */
  participantIds: string[]
}

interface ListConversationsResponse {
  /**
   * List of [Conversation](#schema_conversation) objects ordered by creation date (most recent first)
   */
  conversations: Conversation[]
  meta: {
    /**
     * The token to use to retrieve the next page of results, passed as a query string parameter (value should be URL-encoded) to this API endpoint.
     */
    nextToken?: string
  }
}

type getOrCreateConversation = (params: GetOrCreateConversationBody) => GetOrCreateConversationResponse

interface GetOrCreateConversationBody {
  /**
   * Channel name
   */
  channel: string
  /**
   * Tags for the [Conversation](#schema_conversation)
   */
  tags: {
    [k: string]: string
  }
  /**
   * Name of the integration to which the conversation creation will be delegated
   */
  integrationName?: string
}

interface GetOrCreateConversationResponse {
  conversation: Conversation
}
`
