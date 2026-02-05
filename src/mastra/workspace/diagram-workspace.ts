import { Workspace, LocalFilesystem, LocalSandbox } from "@mastra/core/workspace";

const WORKSHOP_DIR = process.env.WORKSHOP_CONTENT_PATH!;

/**
 * Diagram Workspace (Full Access)
 *
 * Full workspace with all capabilities and no guards.
 * Filesystem + Sandbox + Skills + Search - unrestricted.
 *
 * Has access to common skills, diagram skills, and skills.sh installed skills.
 */
export const diagramWorkspace = new Workspace({
  id: "diagram-workspace",
  name: "Full Workspace",
  filesystem: new LocalFilesystem({ basePath: WORKSHOP_DIR }),
  sandbox: new LocalSandbox({ workingDirectory: WORKSHOP_DIR }),
  skills: ["/skills/common", "/skills/diagrams", "/.agents/skills"],
  bm25: true,
  autoIndexPaths: ["/docs", "/skills"],
});
