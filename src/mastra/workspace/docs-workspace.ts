import { Workspace, LocalFilesystem } from "@mastra/core/workspace";
import { resolve } from "path";

const WORKSHOP_DIR = resolve(process.cwd(), "..", "..", "..", "workshop-content");

/**
 * Documentation Workspace
 *
 * Filesystem + Skills + Search - no sandbox.
 * The agent can read/write files, search content, and follow skills,
 * but cannot execute commands.
 *
 * Has access to common skills and writing skills.
 */
export const docsWorkspace = new Workspace({
  id: "docs-workspace",
  name: "Documentation Workspace",
  filesystem: new LocalFilesystem({ basePath: WORKSHOP_DIR }),
  skills: ["/skills/common", "/skills/writing"],
  bm25: true,
  autoIndexPaths: ["/docs", "/skills"],
});
