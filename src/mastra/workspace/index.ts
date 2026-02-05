// Initialize workspaces with BM25/autoIndexPaths
// Uses top-level await to ensure indexing completes before server handles requests

import { docsWorkspace } from "./docs-workspace";
import { diagramWorkspace } from "./diagram-workspace";
import { secureWorkspace } from "./secure-workspace";

const workspaces = [docsWorkspace, diagramWorkspace, secureWorkspace];

for (const workspace of workspaces) {
  try {
    await workspace.init();
    console.log(`✓ Initialized workspace: ${workspace.id}`);
  } catch (error) {
    console.error(`✗ Failed to initialize workspace ${workspace.id}:`, error);
  }
}

// Export to prevent tree-shaking
export const workspacesInitialized = true;
