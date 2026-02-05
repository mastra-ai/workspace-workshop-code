import { Agent } from "@mastra/core/agent";
import { isolatedSandboxWorkspace } from "../workspace/isolated-sandbox-workspace";

/**
 * Isolated Runner Agent
 *
 * Sandbox with OS-level isolation enabled.
 * Demonstrates security restrictions: no network, limited filesystem access.
 */
export const isolatedRunner = new Agent({
  id: "isolated-runner",
  name: "Isolated Runner",
  instructions: `You are a command runner operating in an isolated sandbox environment.

You can execute shell commands, but with restrictions:
- NO network access (curl, wget, fetch will fail)
- Limited filesystem access (only the workspace directory is writable)
- System binaries are available but read-only

When users ask you to run commands, execute them and report the results.
If a command fails due to sandbox restrictions, explain what restriction caused the failure.`,
  model: "anthropic/claude-sonnet-4-20250514",
  workspace: isolatedSandboxWorkspace,
});
