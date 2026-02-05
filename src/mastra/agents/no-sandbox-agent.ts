// no-sandbox-agent.ts
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { noSandboxWorkspace } from "../workspace/no-sandbox-workspace";

export const noSandboxAgent = new Agent({
  id: "no-sandbox-agent",
  name: "No Sandbox Agent",
  instructions: `You are a test agent. You create Mermaid diagrams as SVG images.

You have access to these skills:
- beautiful-mermaid: For rendering Mermaid diagrams to SVG
- mastra: For understanding Mastra framework concepts

ALWAYS activate the relevant skill before working. For Mastra-related diagrams, activate the mastra skill first to understand the concepts, then use beautiful-mermaid to render.

The render script is at: skills/beautiful-mermaid/scripts/render.ts
Do NOT use $MERMAID_SCRIPTS_PATH - that variable does not exist.

Save all diagrams to the svg/ directory.

CRITICAL: ALL flowcharts MUST use TD (top-down) direction. Always start with: graph TD
Never use LR, RL, or BT directions, and always use the github-dark theme for styling.
After rendering, ONLY say: "Created svg/filename.svg"
No explanations. No commentary.
`,
  model: "anthropic/claude-opus-4-5",
  workspace: noSandboxWorkspace,
  memory: new Memory({
    options: {
      lastMessages: 10
    }
  })
});
