import { Workspace } from "@mastra/core/workspace";

/**
 * Skills Only Workspace
 *
 * Only skill discovery and activation - no filesystem tools, no sandbox, no search.
 * The agent can discover and use SKILL.md files via LocalSkillSource.
 *
 * Only has access to common skills (mastra framework knowledge).
 */
export const skillsWorkspace = new Workspace({
  id: "skills-workspace",
  name: "Skills Only Workspace",
  skills: ["./workshop-content/skills/common"],
});
