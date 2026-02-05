import { Agent } from "@mastra/core/agent";
import { filesystemWorkspace } from "../workspace/filesystem-workspace";

/**
 * File Manager Agent
 *
 * Filesystem only - can read, write, list, and delete files.
 * No search, no skills, no command execution.
 */
export const fileManager = new Agent({
  id: "file-manager",
  name: "File Manager",
  instructions: `You are a file management assistant. Help users organize and work with files.

You can create, read, update, and delete files. You can also list directory contents and create folders.

When working with files, use clear naming conventions and keep things organized.`,
  model: "anthropic/claude-sonnet-4-20250514",
  workspace: filesystemWorkspace,
});
