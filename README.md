# DeepSeek FR MCP Server

> DeepSeek FR | DeepSeek V3 & R1 workflows in French

[![MCP Badge](https://lobehub.com/badge/mcp/rocnubie-deepseekfr-mcp)](https://lobehub.com/mcp/rocnubie-deepseekfr-mcp)
[![smithery](https://smithery.ai/badge/deepseekfr)](https://smithery.ai)
[![Stdio Transport](https://img.shields.io/badge/transport-stdio-6e6e6e)](https://modelcontextprotocol.io/specification)
[![Read Only](https://img.shields.io/badge/server-read--only-2ea44f)](#tools)
[![MCP](https://img.shields.io/badge/MCP-1.0-blue)](https://modelcontextprotocol.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Zero Config](https://img.shields.io/badge/setup-zero--config-7c3aed)](#installation)

<p align="center"><a href="https://deepseekfr.org"><img src="./assets/hero.svg" alt="DeepSeek FR" width="720" /></a></p>

A Model Context Protocol server that exposes the canonical DeepSeek FR knowledge surface — models, prompts, and chat workflows, pricing, FAQ, official links — to MCP-compatible AI clients such as Claude Desktop, Cursor, Windsurf, and Continue. Read-only, no API keys, no quota, ~50 ms cold start.

Official website: https://deepseekfr.org

## 💬 About DeepSeek FR

DeepSeek FR is a French-localized chat interface built around DeepSeek's latest AI models, offering French-speaking users direct access to a capable large language model without needing to navigate an English-first platform. The site provides two model variants — a Pro version aimed at complex reasoning and advanced code tasks, and a Flash version tuned for faster everyday responses — both sharing a one-million-token context window. Users interact through a clean chat interface that supports adjustable reasoning depth, making it practical for everything from quick questions to demanding multi-step analysis. The platform also documents API compatibility with OpenAI and Anthropic conventions, lowering the barrier for developers already familiar with those ecosystems.

## Key Features

- **Two model tiers**: Pro for deep reasoning and code-heavy work; Flash for lower-latency, everyday use — both with a 1M token context window.
- **Three reasoning modes**: Non-think (maximum speed), Think High (balanced precision), and Think Max (deepest analysis), selectable per conversation.
- **Extended context handling**: Processes long documents such as contracts, research papers, and technical manuals in a single session without chunking.
- **API compatibility**: Works with OpenAI- and Anthropic-style API clients, so existing tooling can connect with minimal changes.
- **Benchmark transparency**: The site publishes performance data across knowledge, reasoning, code, math, and agent workflow benchmarks so users can evaluate fit before integrating.
- **Local execution support**: Documentation covers running models locally with encoding specifications for teams that prefer on-premise deployments.

## Use Cases

- **Document review**: Feeding long contracts, compliance documents, or technical manuals into the chat to extract summaries, flag inconsistencies, or answer specific questions.
- **Code assistance**: Reviewing, debugging, or refactoring code across common languages, with the Pro model handling complex architectural questions.
- **Research and reasoning**: Working through multi-step analytical problems — scientific literature, legal arguments, or financial modeling — where depth matters more than speed.
- **Content drafting**: Generating French-language copy, reports, or structured documents for professional or editorial use.
- **API prototyping**: Testing DeepSeek model responses through a familiar chat interface before wiring them into an application via the compatible API.

## Who Is It For

DeepSeek FR is aimed primarily at French-speaking professionals and developers who want a capable AI assistant without switching to an English-language interface. Developers benefit from the API compatibility and local execution options; researchers and analysts value the long context window and adjustable reasoning depth; writers and content teams find the French-native interface reduces friction in day-to-day drafting tasks. The dual-model approach also makes it accessible to non-technical users who need quick answers as well as to technical teams running sustained, resource-intensive workflows — without requiring them to choose a single tool for both.

## Tools

### `list_models`
Return the canonical list of chat models exposed on the site, with capability notes. (DeepSeek FR)

_Input:_ no parameters. _Returns:_ text/markdown.

### `get_pricing`
Return the canonical pricing entry point for DeepSeek FR.

_Input:_ no parameters. _Returns:_ text/markdown.

### `get_official_links`
Return the canonical list of official links for DeepSeek FR (website, support, docs when available).

_Input:_ no parameters. _Returns:_ text/markdown.

## Resources

- `site://deepseekfr/models` — Supported chat models and capability notes.
- `site://deepseekfr/pricing` — Canonical pricing entry point.
- `site://deepseekfr/faq` — Short FAQ generated from public site metadata.
- `site://deepseekfr/links` — Canonical URLs to share with users.

## Prompts

### `tell_me_about_deepseekfr`
Summarize what the site is, who it's for, and how it works. — DeepSeek FR

### `start_chat_session_deepseekfr`
Open a chat-evaluation session against the site's models, with sensible defaults. — DeepSeek FR

## Installation

### Install via Smithery

```bash
npx -y @smithery/cli install deepseekfr-mcp --client claude
```

(Replace `claude` with `cursor`, `windsurf`, or `continue` for those clients.)

### Install from source

```bash
git clone https://github.com/rocnubie/deepseekfr-mcp.git
cd deepseekfr-mcp
pnpm install
```

Then add to your MCP client config (`claude_desktop_config.json` for Claude Desktop, `mcp.json` for Cursor / Windsurf / Continue):

```json
{
  "mcpServers": {
    "deepseekfr-mcp": {
      "command": "node",
      "args": [
        "/absolute/path/to/deepseekfr-mcp/src/index.mjs"
      ]
    }
  }
}
```

### Debug with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node src/index.mjs
```

## Official Links

- Website: https://deepseekfr.org
- Pricing: https://deepseekfr.org/pricing
- Support: support@deepseekfr.org

## Development

```bash
pnpm install
pnpm start                 # run the server over stdio
```

## License

MIT
