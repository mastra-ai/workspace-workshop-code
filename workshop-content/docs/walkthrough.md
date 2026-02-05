# Workshop Walkthrough

A detailed, step-by-step guide for completing the Mastra Workspaces Workshop.

## Before You Start

1. Make sure you've completed the setup from the README:
   ```bash
   pnpm install
   cp .env.example .env
   ```

2. Edit `.env` and set both required variables:
   ```bash
   ANTHROPIC_API_KEY=your-api-key
   WORKSHOP_CONTENT_PATH=/absolute/path/to/workshop-content
   ```

   The `WORKSHOP_CONTENT_PATH` must be the absolute path to the `workshop-content` directory. For example:
   ```bash
   WORKSHOP_CONTENT_PATH=/Users/yourname/workspace-workshop-code/workshop-content
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open Mastra Studio at http://localhost:4111

5. You should see 6 agents listed in the sidebar

## Part 1: Single-Capability Agents

These agents each have exactly one workspace capability, helping you understand what each feature provides in isolation.

---

### Exercise 1.1: File Manager (Filesystem Only)

**Workspace capabilities:** Filesystem only (no search, no skills, no sandbox)

**Agent location:** Click "File Manager" in the Mastra Studio sidebar

#### Task 1: List files

**Prompt:**
```
List all files in the docs directory
```

**Expected behavior:**
- Agent uses the `workspace_list_directory` tool
- Returns a list of markdown files: overview.md, filesystem.md, sandbox.md, search.md, skills.md

**What to notice:** The agent has read access to the filesystem and can navigate directories.

#### Task 2: Read a file

**Prompt:**
```
Read the overview.md file and summarize it
```

**Expected behavior:**
- Agent uses `workspace_read_file` tool
- Reads the content and provides a summary

**What to notice:** The agent can read file contents, not just list them.

#### Task 3: Create a file

**Prompt:**
```
Create a new file called notes.txt in the sandbox directory with the content "Workshop notes go here"
```

**Expected behavior:**
- Agent uses `workspace_write_file` tool
- Creates the file at `/sandbox/notes.txt`

**What to notice:** The agent can write files within the workspace root.

#### Task 4: Test the boundaries

**Prompt:**
```
Use the search tool to find documents mentioning "workspace"
```

**Expected behavior:**
- Agent does NOT have a search tool
- Will say it cannot search, or creatively browse files manually to help

**What to notice:** Agents may work around missing capabilities. This is a learning moment - see how it handles the limitation.

**Prompt:**
```
Execute this command and show the output: node -e "console.log(process.version)"
```

**Expected behavior:**
- Agent does NOT have sandbox/execute capability
- Will clearly say it cannot execute commands

**What to notice:** Explicit tool requests make boundaries clearer than vague asks like "run ls".

---

### Exercise 1.2: Script Runner (Sandbox Only)

**Workspace capabilities:** Sandbox only (can execute commands, but no filesystem tools)

**Agent location:** Click "Script Runner" in the Mastra Studio sidebar

#### Task 1: Run a basic command

**Prompt:**
```
Run pwd to show the current working directory
```

**Expected behavior:**
- Agent uses `workspace_execute_command` tool
- Returns the path (should be the `workshop-content` directory)

**What to notice:** The sandbox has a configured working directory.

#### Task 2: List files via command

**Prompt:**
```
Run ls -la to list all files
```

**Expected behavior:**
- Agent executes the command
- Shows directory listing including docs/, skills/, sandbox/

**What to notice:** Can see files through commands even without filesystem tools.

#### Task 3: Check system info

**Prompt:**
```
What version of node is installed?
```

**Expected behavior:**
- Agent runs `node --version`
- Returns the installed Node.js version

#### Task 4: Test the boundaries

**Prompt:**
```
Read the contents of docs/overview.md
```

**Expected behavior:**
- Agent might try to use `cat docs/overview.md` via sandbox
- This will work! Commands can read files
- But agent doesn't have dedicated `workspace_read_file` tool

**What to notice:** The sandbox can do a lot, but filesystem tools provide structured file operations with better error handling and atomic operations.

---

### Exercise 1.3: Skill Guide (Skills Only)

**Workspace capabilities:** Skills only (can discover and activate skills, nothing else)

**Agent location:** Click "Skill Guide" in the Mastra Studio sidebar

#### Task 1: Discover available skills

**Prompt:**
```
What skills do you have access to?
```

**Expected behavior:**
- Agent uses `workspace_skills_list` tool
- Returns: `mastra` skill (from `/skills/common` path)

**What to notice:** This agent only sees skills in the `/skills/common` path, not `/skills/writing` or `/skills/diagrams`.

#### Task 2: Get skill details

**Prompt:**
```
Tell me about the mastra skill
```

**Expected behavior:**
- Agent uses `workspace_skills_get` to read the skill's SKILL.md
- Explains what the mastra skill does

#### Task 3: Activate a skill

**Prompt:**
```
Activate the mastra skill and explain how agents work in Mastra
```

**Expected behavior:**
- Agent reads the skill content
- Uses the skill's instructions to explain Mastra agents
- May reference the skill's documentation lookup strategy

**What to notice:** The skill provides guidance but the agent can't actually read files or execute commands to follow the skill's workflows.

#### Task 4: Test the boundaries

**Prompt:**
```
List the files in the docs directory
```

**Expected behavior:**
- Agent should NOT have filesystem capability
- Will say it cannot access files

**Prompt:**
```
Activate the technical-writing skill
```

**Expected behavior:**
- Skill should NOT be found
- The Skill Guide only has access to `/skills/common`, not `/skills/writing`

**What to notice:** Skill paths control which skills are visible to each agent.

---

## Part 2: Combined Capabilities

Now we explore agents with multiple capabilities working together.

---

### Exercise 2.1: Docs Assistant (Filesystem + Skills + Search)

**Workspace capabilities:** Filesystem, Skills, BM25 Search (no sandbox)

**Agent location:** Click "Documentation Assistant" in the Mastra Studio sidebar

#### Task 1: Search documentation

**Prompt:**
```
Search for "LocalFilesystem" using bm25 mode
```

**Expected behavior:**
- Agent uses `workspace_search` tool with `mode: "bm25"`
- Returns results from `/docs/search.md` and other relevant files
- Shows relevance scores for each result

**What to notice:** Search finds content across all indexed paths (`/docs` and `/skills`). The explicit `bm25 mode` ensures keyword search is used.

#### Task 2: Check available skills

**Prompt:**
```
What skills do you have access to?
```

**Expected behavior:**
- Agent uses `workspace_skills_list`
- Returns: `mastra` (from common), `technical-writing` (from writing)

**What to notice:** Different skill paths than Skill Guide - has writing skills.

#### Task 3: Use a skill to write documentation

**Prompt:**
```
Using the technical-writing skill, write a short document about workspace security and save it to docs/security.md
```

**Expected behavior:**
- Agent reads the technical-writing skill
- Follows the skill's structure guidelines
- Creates a new file with proper structure (title, overview, content, examples)

**What to notice:** The combination of skills + filesystem allows the agent to learn HOW to write docs and then actually write them.

#### Task 4: Test the boundaries

**Prompt:**
```
Execute this shell command: echo "hello"
```

**Expected behavior:**
- Agent should NOT have sandbox capability
- Will clearly say it cannot execute commands or doesn't have that tool

**What to notice:** Docs Assistant can't run commands - that's what Diagram Agent is for. The explicit command request makes the limitation clear.

---

## Part 3: Full Workspace

Agents with all capabilities enabled.

---

### Exercise 3.1: Diagram Agent (Full Workspace)

**Workspace capabilities:** Filesystem, Sandbox, Skills, Search - unrestricted

**Agent location:** Click "Diagram Agent" in the Mastra Studio sidebar

#### Task 1: List available skills

**Prompt:**
```
What skills are available?
```

**Expected behavior:**
- Returns: `mastra`, `beautiful-mermaid`
- May also show skills.sh installed skills from `/.agents/skills` path

**What to notice:** Has access to diagram skills that other agents don't.

#### Task 2: Activate the mermaid skill

**Prompt:**
```
Activate the beautiful-mermaid skill
```

**Expected behavior:**
- Agent reads the SKILL.md
- Understands how to render diagrams

#### Task 3: Create and render a diagram

**Prompt:**
```
Create a mermaid diagram showing the relationship between Agent, Workspace, and Tools. Then render it to SVG.
```

**Expected behavior:**
1. Agent creates mermaid code (should use `graph TD` for flowcharts)
2. Runs the render script: `npx tsx skills/beautiful-mermaid/scripts/render.ts --code "..." --output svg/diagram --theme github-dark`
3. Reports success with filename

**What to notice:**
- The agent combines skills (learning the syntax) with sandbox (running the script) with filesystem (saving output)
- The svg/ directory should now contain the rendered diagram

#### Task 4: Verify the output

**Prompt:**
```
List the files in the svg directory
```

**Expected behavior:**
- Shows the newly created SVG file

#### Task 5: Search within skills

**Prompt:**
```
Search for information about mermaid themes
```

**Expected behavior:**
- Uses BM25 search
- Finds content in the beautiful-mermaid skill's references

---

### Exercise 3.2: Installing Skills from skills.sh

**Workspace capabilities:** The Diagram Agent's workspace includes `/.agents/skills` path, which enables installing community skills from skills.sh

**Location:** Workspaces > Full Workspace (Diagram Agent) > Skills tab

#### Task 1: Open the Workspace Skills page

1. Click **Workspaces** in the Mastra Studio sidebar
2. Select **Full Workspace (Diagram Agent)** from the dropdown
3. Click the **Skills** tab

**What to notice:** You should see the existing skills (mastra, beautiful-mermaid) and an **Add Skill** button.

#### Task 2: Browse available skills

1. Click **Add Skill**
2. Browse the **Popular Skills** list

**What to notice:** skills.sh is a community repository of skills. Each skill shows its download count and source repository.

#### Task 3: Search and preview a skill

1. In the search box, type `pdf`
2. Click on **pdf** from **anthropics/skills**
3. Review the preview panel

**Expected behavior:**
- Preview shows skill name, description, and documentation
- Shows install count and GitHub link
- Install and Cancel buttons appear

**What to notice:** You can preview skill documentation before installing to understand what it provides.

#### Task 4: Install a skill

1. With the pdf skill selected, click **Install**
2. Wait for the success message

**Expected behavior:**
- Toast appears: "Skill 'pdf' installed successfully (X files)"
- The skill now appears in the Skills list

**What to notice:** Skills are installed to the `/.agents/skills` directory within the workspace.

#### Task 5: Verify the agent can use the skill

1. Navigate to **Agents > Diagram Agent**
2. Send the message: `What skills are available?`

**Expected behavior:**
- Agent lists skills including the newly installed **pdf** skill
- The skill is immediately available without restarting

**What to notice:** Installed skills are dynamically loaded and immediately available to agents whose workspace includes the `/.agents/skills` path.

#### Task 6: Test the installed skill

**Prompt:**
```
Activate the pdf skill and explain what it can help with
```

**Expected behavior:**
- Agent reads the pdf skill's SKILL.md
- Explains PDF processing capabilities (reading, extracting, merging, etc.)

**What to notice:** Community skills follow the same SKILL.md format as local skills.

---

## Part 4: Security Controls

How workspace security features work.

---

### Exercise 4.1: Secure Editor (Full + Approval Workflow)

**Workspace capabilities:** All capabilities, but writes/deletes/commands require approval

**Agent location:** Click "Secure Editor" in the Mastra Studio sidebar

#### Task 1: Read without approval

**Prompt:**
```
Read the overview.md file
```

**Expected behavior:**
- Works immediately, no approval needed
- Read operations are unrestricted

#### Task 2: Write with approval

**Prompt:**
```
Create a file called test-secure.txt with the content "Testing secure workspace"
```

**Expected behavior:**
- Agent attempts to use `workspace_write_file`
- **You should see an approval prompt** in Mastra Studio
- The write only completes after you approve

**What to notice:** The `requireApproval: true` setting on the write tool triggers the approval flow.

#### Task 3: Delete with approval

**Prompt:**
```
Delete the test-secure.txt file you just created
```

**Expected behavior:**
- Agent attempts to use `workspace_delete` tool
- **Approval prompt appears**
- Only deletes after approval

#### Task 4: Command with approval

**Prompt:**
```
Run the command: echo "Hello from secure workspace"
```

**Expected behavior:**
- Agent attempts `workspace_execute_command`
- **Approval prompt appears**
- Only executes after approval

#### Task 5: Deny an action

**Prompt:**
```
Create a file called should-not-exist.txt
```

**Expected behavior:**
- When the approval prompt appears, click **Deny**
- Agent should report that the action was not approved

**What to notice:** Users maintain control over sensitive operations.

---

## Part 5: Exploration Challenges

Try these open-ended tasks to deepen your understanding.

### Challenge 1: Cross-agent comparison

Use File Manager to create a file, then verify it exists using Script Runner's `ls` command. What are the trade-offs between filesystem tools and shell commands?

### Challenge 2: Skill-guided documentation

With Docs Assistant, use both the `mastra` skill and `technical-writing` skill together to create documentation about Mastra agents. Does the agent effectively combine guidance from multiple skills?

### Challenge 3: Complex diagram workflow

Ask Diagram Agent to:
1. Search for existing documentation about workspaces
2. Create a diagram visualizing the workspace architecture
3. Render it with the tokyo-night theme
4. Read the generated SVG to verify it was created

### Challenge 4: Security workflow design

Think about: If you were building a production agent, which operations would you require approval for? Consider:
- File writes in certain directories only?
- Specific shell commands?
- External API calls?

---

## Troubleshooting

### Agent says "I don't have that capability"

This is expected behavior when testing boundaries. The agent correctly understands its limitations.

### Search returns no results

- Check that `pnpm dev` is running (indexes are built on startup)
- The search indexes `/docs` and `/skills` directories
- Use specific terms that appear in the docs (e.g., "LocalFilesystem", "workspace", "autoIndexPaths")
- Always specify `bm25 mode` in your prompt - hybrid mode requires vector configuration

### Render script fails

- Make sure you're using the Diagram Agent (has sandbox capability)
- Check the script path: `skills/beautiful-mermaid/scripts/render.ts`
- The svg/ directory should exist (or will be created)

### Approval prompts don't appear

- Make sure you're using Secure Editor, not Diagram Agent
- Check the browser - prompts appear in Mastra Studio UI

### Add Skill button doesn't appear

- Only workspaces with `/.agents/skills` in their skill paths show the Add Skill button
- The Diagram Agent's workspace has this configured; other workspaces don't
- Check `src/mastra/workspace/diagram-workspace.ts` to see the configuration

### Installed skill not showing for agent

- Make sure the agent's workspace includes `/.agents/skills` in its skill paths
- Skills are installed to the workspace's `/.agents/skills` directory
- Only agents with that path configured will see installed skills

---

## Key Takeaways

1. **Workspace capabilities are composable** - Mix filesystem, sandbox, skills, and search as needed

2. **Skills provide instructions, not capabilities** - A skill tells an agent HOW to do something, but the agent needs the underlying tools to actually do it

3. **Skill paths control access** - Different agents can see different skills based on their configured paths

4. **Security is per-tool** - You can require approval for specific operations while leaving others unrestricted

5. **Search indexes configured paths** - BM25 search works over the `autoIndexPaths` directories

6. **skills.sh extends agent capabilities** - Install community skills through the UI when workspace includes `/.agents/skills` path

---

## Next Steps

After completing this workshop:

1. Look at the workspace configurations in `src/mastra/workspace/` to see how each is defined
2. Create your own workspace combining capabilities for your use case
3. Write a custom SKILL.md for your workflow
4. Browse [skills.sh](https://skills.sh) for more community skills to install
5. Publish your own skills to skills.sh for others to use
