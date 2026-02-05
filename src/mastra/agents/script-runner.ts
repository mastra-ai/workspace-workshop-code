import { Agent } from "@mastra/core/agent";
import { sandboxWorkspace } from "../workspace/sandbox-workspace";

/**
 * Script Runner Agent
 *
 * Sandbox only - can execute shell commands.
 * No filesystem tools, no skills, no search.
 */
export const scriptRunner = new Agent({
  id: "script-runner",
  name: "Script Runner",
  instructions: `You are a command execution assistant. Help users run shell commands and scripts.

You can execute commands in the terminal. Use this to run scripts, check system info, or perform shell operations.

Be careful with commands - explain what each command does before running it.`,
  model: "anthropic/claude-sonnet-4-20250514",
  workspace: sandboxWorkspace,
});
