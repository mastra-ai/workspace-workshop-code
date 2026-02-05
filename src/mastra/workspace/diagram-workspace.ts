import { Workspace, LocalFilesystem, LocalSandbox } from "@mastra/core/workspace";
import { resolve } from "path";
import { WORKSPACE_TOOLS } from "@mastra/core/workspace";

// mastra dev runs from src/mastra/public/, so go up 3 levels to project root
const DIAGRAMS_DIR = resolve(process.cwd(), "..", "..", "..", "diagram-demo");

export const diagramWorkspace = new Workspace({
  id: "diagram-workspace",
  name: "Diagram Rendering Workspace",
  filesystem: new LocalFilesystem({ basePath: DIAGRAMS_DIR }),
  sandbox: new LocalSandbox({ workingDirectory: DIAGRAMS_DIR }),
  skills: ["/skills"],
  bm25: true,
  autoIndexPaths: ["/docs", "/skills"],
  tools: {
    [WORKSPACE_TOOLS.SANDBOX.EXECUTE_COMMAND]: {
      requireApproval: true
    }
  }
});
