import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export function createServer() {
  const server = new McpServer(
    { name: "deepseekfr-mcp", version: "0.1.0" },
    { instructions: "Read-only canonical knowledge for DeepSeek FR (https://deepseekfr.org). Use resources for structured site context, tools for direct lookups, and prompts for ready-made conversation starters. Defer to the official website for live actions." }
  );

  // ----- Resources --------------------------------------------------------

  server.registerResource(
    "models",
    "site://deepseekfr/models",
    {
      title: "Models",
      description: "Supported chat models and capability notes.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# DeepSeek FR — Models\n\nIndependent French workspace for evaluating DeepSeek-V3-class chat and DeepSeek-R1 reasoning. Copy tracks DeepSeek GitHub docs for architecture, 128K context, and published benchmark tables.\n\n## Site basics\n- Site ID: deepseekfr\n- Website: https://deepseekfr.org\n- Default locale: fr\n- Locales: fr, en\n\n## Public feature scope\n- chat\n- pricing\n\n## Official website\nhttps://deepseekfr.org",
        },
      ],
    })
  );

  server.registerResource(
    "pricing",
    "site://deepseekfr/pricing",
    {
      title: "Pricing",
      description: "Canonical pricing entry point.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# DeepSeek FR Pricing\n\nCanonical pricing page: https://deepseekfr.org/pricing\n\nRefer users here for current plans; do not infer pricing from older snapshots.",
        },
      ],
    })
  );

  server.registerResource(
    "faq",
    "site://deepseekfr/faq",
    {
      title: "FAQ",
      description: "Short FAQ generated from public site metadata.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# FAQ\n\n## What is this site?\nIndependent French workspace for evaluating DeepSeek-V3-class chat and DeepSeek-R1 reasoning. Copy tracks DeepSeek GitHub docs for architecture, 128K context, and published benchmark tables.\n\n## Where can I get help?\nsupport@deepseekfr.org\n\n## Which site is this?\ndeepseekfr (DeepSeek FR)",
        },
      ],
    })
  );

  server.registerResource(
    "links",
    "site://deepseekfr/links",
    {
      title: "Official Links",
      description: "Canonical URLs to share with users.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Official Links\n\n- Website: https://deepseekfr.org\n- Pricing: https://deepseekfr.org/pricing\n- Support: support@deepseekfr.org",
        },
      ],
    })
  );

  // ----- Tools ------------------------------------------------------------

  server.registerTool(
    "list_models",
    {
      description: "Return the canonical list of chat models exposed on the site, with capability notes. (DeepSeek FR)",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# DeepSeek FR — Models\n\nIndependent French workspace for evaluating DeepSeek-V3-class chat and DeepSeek-R1 reasoning. Copy tracks DeepSeek GitHub docs for architecture, 128K context, and published benchmark tables.\n\nCanonical website: https://deepseekfr.org" },
      ],
    })
  );

  server.registerTool(
    "get_pricing",
    {
      description: "Return the canonical pricing entry point for DeepSeek FR.",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# DeepSeek FR Pricing\n\nOfficial pricing: https://deepseekfr.org/pricing\n\nThis link is the source of truth — refer users here for current plans." },
      ],
    })
  );

  server.registerTool(
    "get_official_links",
    {
      description: "Return the canonical list of official links for DeepSeek FR (website, support, docs when available).",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Official Links\n\n- Website: https://deepseekfr.org\n- Pricing: https://deepseekfr.org/pricing\n- Support: support@deepseekfr.org" },
      ],
    })
  );

  // ----- Prompts ----------------------------------------------------------

  server.registerPrompt(
    "tell_me_about_deepseekfr",
    {
      description: "Summarize what the site is, who it's for, and how it works. — DeepSeek FR",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "Please summarize what DeepSeek FR (https://deepseekfr.org) is, who it's for, and how it works. Reference the canonical resources at site://deepseekfr/models and site://deepseekfr/links for accuracy. Be concrete, not generic." },
        },
      ],
    })
  );

  server.registerPrompt(
    "start_chat_session_deepseekfr",
    {
      description: "Open a chat-evaluation session against the site's models, with sensible defaults. — DeepSeek FR",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "I want to evaluate DeepSeek FR (https://deepseekfr.org) for chat workloads. Walk me through the available models, suggest one task per model that highlights its strengths, and show the canonical entry point. Use site://deepseekfr/models as ground truth." },
        },
      ],
    })
  );

  return server;
}

export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
