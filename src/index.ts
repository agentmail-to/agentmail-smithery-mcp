import { AgentMailClient } from 'agentmail'
import { AgentMailToolkit } from 'agentmail-toolkit/mcp'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export const configSchema = z.object({
    apiKey: z.string().optional().describe('Your API key from the [AgentMail Console](https://console.agentmail.to)'),
})

export default function createServer({ config }: { config: z.infer<typeof configSchema> }) {
    const server = new McpServer({ name: 'AgentMail', version: '1.0.0' })

    const client = new AgentMailClient({ apiKey: config.apiKey })
    const toolkit = new AgentMailToolkit(client)

    const apiKeyMessage = { content: [{ type: 'text' as const, text: 'Please set your API key for AgentMail. You can get it at console.agentmail.to' }] }

    for (const tool of toolkit.getTools()) {
        server.registerTool(tool.name, tool, async (args, extra) => {
            if (!config.apiKey) return apiKeyMessage
            return tool.callback(args, extra)
        })
    }
    return server.server
}
