# AgentMail MCP Server (Smithery)

An [AgentMail](https://agentmail.to) MCP server built for [Smithery](https://smithery.ai) — connect any MCP-compatible AI client to email.

## What it does

Gives AI agents (Claude, Cursor, Windsurf, etc.) the ability to create email inboxes, send/receive messages, manage threads, and handle attachments — all through the Model Context Protocol.

## Setup

### Install via Smithery

```bash
npx @smithery/cli@latest install agentmail-smithery-mcp
```

### Configuration

Set your AgentMail API key:
- Get a free key at [console.agentmail.to](https://console.agentmail.to)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Deploy to Smithery at [smithery.ai/new](https://smithery.ai/new).

## Links

- [AgentMail](https://agentmail.to) — The email API for AI agents
- [AgentMail MCP Server (standalone)](https://github.com/agentmail-to/agentmail-mcp)
- [Smithery](https://smithery.ai)
- [MCP Protocol](https://modelcontextprotocol.io)
