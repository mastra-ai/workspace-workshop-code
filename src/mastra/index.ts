import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { Observability, DefaultExporter, CloudExporter, SensitiveDataFilter } from '@mastra/observability';

// Initialize workspaces with BM25 search indexes
import './workspace';

// Workshop agents - each demonstrates different workspace capabilities
import { fileManager } from './agents/file-manager';
import { scriptRunner } from './agents/script-runner';
import { skillGuide } from './agents/skill-guide';
import { docsAssistant } from './agents/docs-assistant';
import { diagramAgent } from './agents/diagram-agent';
import { secureEditor } from './agents/secure-editor';
import { isolatedRunner } from './agents/isolated-runner';

export const mastra = new Mastra({
  agents: {
    fileManager,
    scriptRunner,
    skillGuide,
    docsAssistant,
    diagramAgent,
    secureEditor,
    isolatedRunner,
  },
  storage: new LibSQLStore({
    id: "mastra-storage",
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  observability: new Observability({
    configs: {
      default: {
        serviceName: 'mastra',
        exporters: [
          new DefaultExporter(),
          new CloudExporter(),
        ],
        spanOutputProcessors: [
          new SensitiveDataFilter(),
        ],
      },
    },
  }),
});
