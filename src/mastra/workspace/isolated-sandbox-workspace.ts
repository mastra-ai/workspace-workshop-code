import { Workspace, LocalSandbox } from "@mastra/core/workspace";

const WORKSHOP_DIR = process.env.WORKSHOP_CONTENT_PATH!;

/**
 * Isolated Sandbox Workspace
 *
 * Demonstrates sandbox isolation features using macOS seatbelt:
 * - Network access disabled (curl, wget, fetch will fail)
 * - System binaries are available for local operations
 */
export const isolatedSandboxWorkspace = new Workspace({
  id: "isolated-sandbox-workspace",
  name: "Isolated Sandbox Workspace",
  sandbox: new LocalSandbox({
    workingDirectory: WORKSHOP_DIR,
    isolation: "seatbelt",
    nativeSandbox: {
      allowNetwork: false,
      allowSystemBinaries: true,
    },
  }),
});
