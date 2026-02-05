# Mastra Workspaces Workshop

Learn how Mastra workspaces give agents the ability to work with files, execute commands, search content, and follow skills.

## Prerequisites

- Node.js >= 22.13.0
- An Anthropic API key

## Setup

1. Clone this repository

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Edit `.env` and set both variables:
   ```bash
   ANTHROPIC_API_KEY=your-api-key
   WORKSHOP_CONTENT_PATH=/absolute/path/to/workshop-content
   ```

   For example, if you cloned to `~/projects/workspace-workshop-code`:
   ```bash
   WORKSHOP_CONTENT_PATH=/Users/yourname/projects/workspace-workshop-code/workshop-content
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

6. Open Mastra Studio at http://localhost:4111

## Workshop Overview

This workshop demonstrates how workspace configurations control what agents can do. You'll explore 7 agents, each with different capabilities.

## The Agents

| Agent | Capabilities | What to Try |
|-------|--------------|-------------|
| **File Manager** | Filesystem only | "List all files", "Create a file called notes.txt" |
| **Script Runner** | Sandbox only | "Run `ls -la`", "What version of node is installed?" |
| **Skill Guide** | Skills only | "What skills are available?", "Tell me about the mastra skill" |
| **Isolated Runner** | Sandbox + OS isolation | "Run `curl https://example.com`" (blocked), "Run `pwd`" (works) |
| **Docs Assistant** | Filesystem + Skills + Search | "Search for info about sandboxes", "Write a doc following the technical-writing skill" |
| **Diagram Agent** | Full workspace | "Create a mermaid diagram of workspace architecture and render it" |
| **Secure Editor** | Full + Security | "Create a file" (requires approval), "Run a command" (requires approval) |

## Workshop Path

### Part 1: Understanding Isolated Capabilities

Start with the single-capability agents to understand what each workspace feature provides:

**1. File Manager** (Filesystem only)
- Try: "List all files in the docs directory"
- Try: "Read the overview.md file"
- Try: "Create a new file called my-notes.txt with some content"
- Notice: Cannot search or run commands

**2. Script Runner** (Sandbox only)
- Try: "Run `pwd` to see the working directory"
- Try: "Run `ls -la` to list files"
- Try: "Check what node version is installed"
- Notice: Can run commands but cannot read/write files through workspace tools

**3. Skill Guide** (Skills only)
- Try: "What skills do you have access to?"
- Try: "Tell me about the mastra skill"
- Try: "Activate the mastra skill and explain how agents work"
- Notice: Can only see skills in `/skills/common` path

**4. Isolated Runner** (Sandbox with OS isolation)
- Try: "Run `pwd`" - works normally
- Try: "Run `curl https://httpbin.org/get`" - blocked by network isolation
- Try: "Run `cat /etc/passwd`" - blocked by filesystem isolation
- Compare: Same curl command works in Script Runner (no isolation)

### Part 2: Combined Capabilities

**4. Docs Assistant** (Filesystem + Skills + Search)
- Try: "Search for documentation about security"
- Try: "What skills are available to you?"
- Try: "Write a new doc about workspaces following the technical-writing skill"
- Notice: Has writing skills that File Manager doesn't have
- Notice: Cannot execute commands (try asking it to run a script)

### Part 3: Full Workspace

**5. Diagram Agent** (Full workspace)
- Try: "Create a mermaid diagram showing the workspace architecture"
- Try: "Render the diagram to SVG"
- Try: "Search for skills related to diagrams"
- Notice: Has diagram skills and can execute the render script
- Notice: Can also install skills from skills.sh

### Part 4: Security Controls

**6. Secure Editor** (Full + Security)
- Try: "Create a new file" - You'll be prompted to approve
- Try: "Delete a file" - You'll be prompted to approve
- Try: "Run a command" - You'll be prompted to approve
- Notice: Same capabilities as Diagram Agent, but with guardrails

## Key Concepts

### Workspace Components

| Component | What it provides |
|-----------|------------------|
| **Filesystem** | Read, write, list, delete files within a scoped directory |
| **Sandbox** | Execute shell commands in a controlled environment |
| **Search** | BM25 keyword search over indexed content |
| **Skills** | Discoverable SKILL.md files with instructions for agents |

### Skills Paths

Different agents have access to different skills based on their configured paths:

```
workshop-content/skills/
├── common/           # Shared by all skill-enabled agents
│   └── mastra/
├── writing/          # Docs Assistant only
│   └── technical-writing/
└── diagrams/         # Diagram Agent only
    └── beautiful-mermaid/
```

### Sandbox Isolation

The Isolated Runner demonstrates OS-level sandboxing with macOS seatbelt:

```typescript
sandbox: new LocalSandbox({
  workingDirectory: WORKSHOP_DIR,
  isolation: "seatbelt",
  nativeSandbox: {
    allowNetwork: false,        // Block all network access
    allowSystemBinaries: true,  // Allow /usr/bin, /bin, etc.
  },
}),
```

This restricts what commands can access at the OS level - network calls like `curl` and `wget` will fail.

### Security Controls

The Secure Editor demonstrates per-tool configuration:

```typescript
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
}
```

## Project Structure

```
src/mastra/
├── agents/           # Agent definitions
├── workspace/        # Workspace configurations
└── index.ts          # Mastra initialization

workshop-content/
├── docs/             # Documentation (indexed for search)
├── skills/           # Local skills organized by category
│   ├── common/       # Shared skills
│   ├── writing/      # Documentation skills
│   └── diagrams/     # Diagram skills
├── sandbox/          # Working directory for commands
└── .agents/skills/   # Skills installed from skills.sh
```

## Next Steps

After completing the workshop:

1. **Create your own workspace** - Combine capabilities for your use case
2. **Add custom skills** - Create SKILL.md files for your workflows
3. **Explore skills.sh** - Install additional skills from the community
4. **Configure security** - Set up approval workflows for sensitive operations

## Resources

- [Mastra Documentation](https://mastra.ai/docs)
- [Workspace Reference](https://mastra.ai/docs/workspace/overview)
- [Skills Specification](https://agentskills.io)
- [skills.sh Directory](https://skills.sh)
