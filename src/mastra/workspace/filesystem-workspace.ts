import { Workspace, LocalFilesystem } from "@mastra/core/workspace";

const WORKSHOP_DIR = process.env.WORKSHOP_CONTENT_PATH!;

/**
 * Filesystem Only Workspace
 *
 * Filesystem only - no search, no skills, no sandbox.
 * The agent can read, write, list, and delete files but nothing else.
 */
export const filesystemWorkspace = new Workspace({
  id: "filesystem-workspace",
  name: "Filesystem Only Workspace",
  filesystem: new LocalFilesystem({ basePath: WORKSHOP_DIR }),
});
