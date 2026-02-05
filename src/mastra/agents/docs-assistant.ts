import { Agent } from "@mastra/core/agent";
import { docsWorkspace } from "../workspace/docs-workspace";

/**
 * Documentation Assistant Agent
 *
 * Filesystem + Skills + Search - no sandbox.
 * Can read/write files, search content, and follow skills.
 * Cannot execute commands.
 */
export const docsAssistant = new Agent({
  id: "docs-assistant",
  name: "Documentation Assistant",
  instructions: `You are a documentation assistant. Help users create and improve documentation.

You can:
- Search through existing docs to find relevant information
- Read and write documentation files
- Follow skills for guidance on documentation standards

When searching, always use mode: "bm25". When creating docs, search for existing content first to maintain consistency.
Use available skills to follow best practices.`,
  model: "anthropic/claude-sonnet-4-20250514",
  workspace: docsWorkspace,
});
