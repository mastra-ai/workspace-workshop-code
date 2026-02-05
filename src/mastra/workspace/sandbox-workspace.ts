import { Workspace, LocalSandbox } from "@mastra/core/workspace";

const WORKSHOP_DIR = process.env.WORKSHOP_CONTENT_PATH!;

/**
 * Sandbox Only Workspace
 *
 * Only command execution - no filesystem, no skills, no search.
 * The agent can run shell commands but cannot read/write files through workspace tools.
 */
export const sandboxWorkspace = new Workspace({
  id: "sandbox-workspace",
  name: "Sandbox Only Workspace",
  sandbox: new LocalSandbox({ workingDirectory: WORKSHOP_DIR }),
});
