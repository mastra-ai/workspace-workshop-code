import { Workspace, LocalFilesystem } from "@mastra/core/workspace";
import { resolve } from "path";

const WORKSHOP_DIR = resolve(process.cwd(), "..", "..", "..", "workshop-content");

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
