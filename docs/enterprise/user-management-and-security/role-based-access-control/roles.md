---
id: roles
title: Roles
---

--------------------

**RBAC** (Role-Based Access Control) allows you to control what your collaborators can access.

By default, Botpress ships with three roles in addition to the administrator: developer, content editor, and agent.

![Extra Roles](/assets/rbac-roles.png)

## Adding a New Role

In the `<data>/global/workspaces.json` file, you'll find the `roles` property, which is an array of all the roles you can assign to the collaborators on your workspace. You can add, remove, and edit roles by modifying this array directly.

### Rules

The rules which govern the users' rights are executed sequentially from first to last. For example, you can assign the following rules:

1. `+r-w` on `*`
2. `+w` on `bot.content`
3. `-r` on `bot.flows`

With the rules above, the user will see everything but the flows and won't be able to _change_ anything but content.

### Operations (op)

Below are the access levels which Botpress can configure for a user.

| op    | description  |
| ----- | ------------ |
| `+r`  | Grant read   |
| `-r`  | Revoke read  |
| `+w`  | Grant write  |
| `-w`  | Revoke write |

### Available Resources (res)

Below are the resources and interfaces to which you can give your chatbot studio users access.

| res                       | description                                  |
| ------------------------- | -------------------------------------------- |
| `\_`                      | \_                                           |
| `bot.\* `                 | All bots inside the workspace                |
| `bot.content`             | The CMS elements (what the bot says)         |
| `bot.flows`               | The flow editor                              |
| `bot.ghost_content`       | Access using `bp.ghost` SDK method           |
| `bot.information`         | Information about the bot                    |
| `bot.information.license` | Enterprise licsense key                      |
| `bot.logs `               | The runtime logs                             |
| `bot.logs.archive `       | Package and export logs                      |
| `bot.media`               | File uploads (via the CMS)                   |
| `bot.notifications`       | Notifications                                |
| `bot.skills`              | The flow skills                              |
| `\_`                      | \_                                           |
| `admin.\*`                | The admin dashboard (/admin)                 |
| `admin.bots`              | Creating bots and changing their information |
| `admin.bots.archive`      | Package and export bots                      |
| `admin.collaborators`     | Add new collaborators                        |
| `admin.logs`              | Access server logs                           |
| `admin.roles`             | Assign roles to collaborators                |
| `\_`                      | \_                                           |
| `module.\*`               | Global access to all modules                 |
| `module.analytics`        | Access to the analytics module               |
| `module.basic-skills`     | Access basic skills- choice, API, etc        |
| `module.builtin`          | Access basic content types- text, card, etc  |
| `module.channel-messenger`| Access Messenger config                      |
| `module.channel-slack`    | Access Slack config                          |
| `module.channel-smooch`   | Access Smooch config                         |
| `module.channel-teams`    | Access MS Teams config                       |
| `module.channel-telegram` | Access Telegram config                       |
| `module.channel-web`      | Access Web widget config                     |
| `module.examples`         | Access to the builtin bot templates          |
| `module.hitl`             | Access to the hitl module                    |
| `module.hitlnext`         | Access to the hitl-next module               |
| `module.misunderstood`    | Access to the misunderstood module           |
| `module.nlu`              | Access to Botpress NLU                       |
| `module.qna`              | Access to Botpress QnAs                      |
| `module.MODULE_ID`        | Access any other or custom modules           |

Modules only support a single top-level resource and one operation: `write`. Define as `module.MODULE_ID`, for example, `module.hitl` or `module.code-editor`.

**Example:**

```json
{
  "id": "hitl",
  "name": "Human in the Loop",
  "description": "Can view and respond to users by using the HITL module",
  "rules": [
    {
      "res": "*",
      "op": "+r"
    },
    {
      "res": "module.hitl",
      "op": "+r+w"
    }
  ]
}
```
