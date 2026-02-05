import { Workspace, LocalSandbox } from "@mastra/core/workspace";
import { resolve } from "path";

const WORKSHOP_DIR = resolve(process.cwd(), "..", "..", "..", "workshop-content");

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
