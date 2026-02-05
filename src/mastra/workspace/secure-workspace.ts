import { Workspace, LocalFilesystem, LocalSandbox, WORKSPACE_TOOLS } from "@mastra/core/workspace";

const WORKSHOP_DIR = process.env.WORKSHOP_CONTENT_PATH!;

/**
 * Secure Editor Workspace
 *
 * Full workspace with security controls.
 * Demonstrates approval workflows and read-before-write protection.
 *
 * Has access to all skill paths (common, writing, diagrams).
 */
export const secureWorkspace = new Workspace({
  id: "secure-workspace",
  name: "Secure Editor Workspace",
  filesystem: new LocalFilesystem({ basePath: WORKSHOP_DIR }),
  sandbox: new LocalSandbox({ workingDirectory: WORKSHOP_DIR }),
  skills: ["/skills/common", "/skills/writing", "/skills/diagrams"],
  bm25: true,
  autoIndexPaths: ["/docs", "/skills"],
  tools: {
    [WORKSPACE_TOOLS.FILESYSTEM.WRITE_FILE]: {
      requireApproval: true,
      requireReadBeforeWrite: true,
    },
    [WORKSPACE_TOOLS.FILESYSTEM.DELETE]: {
      requireApproval: true,
    },
    [WORKSPACE_TOOLS.SANDBOX.EXECUTE_COMMAND]: {
      requireApproval: true,
    },
  },
});
