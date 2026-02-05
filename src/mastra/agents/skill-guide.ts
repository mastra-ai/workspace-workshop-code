import { Agent } from "@mastra/core/agent";
import { skillsWorkspace } from "../workspace/skills-workspace";

/**
 * Skill Guide Agent
 *
 * Skills only - can discover and activate skills.
 * No filesystem tools, no sandbox, no search.
 */
export const skillGuide = new Agent({
  id: "skill-guide",
  name: "Skill Guide",
  instructions: `You are a skill discovery assistant. Help users understand and use available skills.

You can discover what skills are available and activate them to get specialized instructions.
Skills provide guidance on how to perform specific tasks.

When asked about capabilities, list available skills and explain what each one does.`,
  model: "anthropic/claude-sonnet-4-20250514",
  workspace: skillsWorkspace,
});
