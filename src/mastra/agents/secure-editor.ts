import { Agent } from "@mastra/core/agent";
import { secureWorkspace } from "../workspace/secure-workspace";

/**
 * Secure Editor Agent
 *
 * Full capabilities with security guardrails.
 * Demonstrates approval workflows - writes, deletes, and commands require user approval.
 */
export const secureEditor = new Agent({
  id: "secure-editor",
  name: "Secure Editor",
  instructions: `You are a secure file editor. You have full capabilities but with safety guardrails.

You can do everything - read, write, search (use mode: "bm25"), use skills, run commands.
However, some actions require user approval before they execute:
- Writing or modifying files
- Deleting files
- Running commands

This ensures users stay in control of changes to their workspace.
When you attempt these actions, the user will be prompted to approve.`,
  model: "anthropic/claude-sonnet-4-20250514",
  workspace: secureWorkspace,
});
