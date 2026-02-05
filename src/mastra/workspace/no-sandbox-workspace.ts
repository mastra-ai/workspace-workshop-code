import { Workspace, LocalFilesystem } from "@mastra/core/workspace";
import { resolve } from "path";

// mastra dev runs from src/mastra/public/, so go up 3 levels to project root
const DIAGRAMS_DIR = resolve(process.cwd(), "..", "..", "..", "diagram-demo");

export const noSandboxWorkspace = new Workspace({
  id: "no-sandbox-workspace",
  name: "No Sandbox Workspace (Skills Only)",
  filesystem: new LocalFilesystem({ basePath: DIAGRAMS_DIR }),
  // Can read and write files, but can't run scripts so can't execute render script
  // sandbox: new LocalSandbox({ workingDirectory: DIAGRAMS_DIR }),
  skills: ["/skills"],
  bm25: true,
  autoIndexPaths: ["/docs", "/skills"],
});
