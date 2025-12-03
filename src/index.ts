import { AgentMailClient } from 'agentmail'
import { AgentMailToolkit } from 'agentmail-toolkit/mcp'

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export const configSchema = z.object({
    apiKey: z.string().describe('AgentMail API key'),
    tools: z.array(z.string()).optional().describe('Tools to enable'),
})

export default function createServer({ config }: { config: z.infer<typeof configSchema> }) {
    const server = new McpServer({ name: 'AgentMail', version: '1.0.0' })

    const client = new AgentMailClient({ apiKey: config.apiKey })
    const toolkit = new AgentMailToolkit(client)

    for (const tool of toolkit.getTools(config.tools)) server.registerTool(tool.name, tool, tool.cb)

    return server.server
}
