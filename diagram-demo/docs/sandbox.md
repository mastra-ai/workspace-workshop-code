# Sandbox

Sandbox providers give agents the ability to execute shell commands. When you configure a sandbox on a workspace, agents can run commands as part of their tasks.

A sandbox provider executes commands in a controlled environment:

- **Command execution** - Run shell commands with arguments
- **Working directory** - Commands run from a specific directory
- **Environment variables** - Control what variables are available
- **Timeouts** - Prevent long-running commands from hanging
- **Isolation** - Optional OS-level sandboxing for security

When you assign a workspace with a sandbox to an agent, Mastra automatically includes the `execute_command` tool in the agent's toolset.

## Supported providers

Available providers:

- [`LocalSandbox`](https://mastra.ai/reference/workspace/local-sandbox) - Executes commands on the local machine

## Basic usage

Create a workspace with a sandbox and assign it to an agent. The agent can then execute shell commands:

```typescript
import { Agent } from "@mastra/core/agent";
import { Workspace, LocalFilesystem, LocalSandbox } from "@mastra/core/workspace";

const workspace = new Workspace({
  filesystem: new LocalFilesystem({
    basePath: "./workspace"
  }),
  sandbox: new LocalSandbox({
    workingDirectory: "./workspace"
  })
});

const agent = new Agent({
  id: "dev-agent",
  model: "openai/gpt-4o",
  instructions: "You are a helpful development assistant.",
  workspace
});

// The agent now has the execute_command tool available
const response = await agent.generate("Run `ls -la` in the workspace directory");
```

See [`LocalSandbox` reference](https://mastra.ai/reference/workspace/local-sandbox) for configuration options including environment isolation and native OS sandboxing.

## Agent tools

When you configure a sandbox on a workspace, agents receive the `execute_command` tool for running shell commands. See [workspace class reference](https://mastra.ai/reference/workspace/workspace-class) for details.

## Related

- [`LocalSandbox` reference](https://mastra.ai/reference/workspace/local-sandbox)
- [Workspace overview](https://mastra.ai/docs/workspace/overview)
- [Filesystem](https://mastra.ai/docs/workspace/filesystem)
