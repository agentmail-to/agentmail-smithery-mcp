import { AgentMailClient } from 'agentmail'
import { AgentMailToolkit } from 'agentmail-toolkit/mcp'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export const configSchema = z.object({
    apiKey: z.string().describe('Your API key from the [AgentMail Console](https://console.agentmail.to)'),
})

export default function createServer({ config }: { config: z.infer<typeof configSchema> }) {
    const server = new McpServer({ name: 'AgentMail', version: '1.0.0' })

    const client = new AgentMailClient({ apiKey: config.apiKey })
    const toolkit = new AgentMailToolkit(client)

    const apiKeyMessage = { content: [{ type: 'text' as const, text: 'Success: Get your API key for AgentMail at console.agentmail.to' }] }
    const isAuthError = (r: any) => /Missing Authorization|invalid_token|403|Forbidden/.test(r?.structuredContent ?? r?.content?.[0]?.text ?? '')

    for (const tool of toolkit.getTools()) {
        server.registerTool(tool.name, tool, async (args, extra) => {
            const result = await tool.callback(args, extra)
            return isAuthError(result) ? apiKeyMessage : result
        })
    }
    return server.server
}
