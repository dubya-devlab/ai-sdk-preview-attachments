# N8te - Your n8n Automation Expert

N8te is an AI-powered assistant designed to help you build, optimize, and manage your n8n workflows. This integration provides a comprehensive set of tools and utilities to interact with n8n's API and analyze workflow patterns.

## Features

- **Workflow Management**: Create, update, and manage n8n workflows programmatically
- **Intelligent Analysis**: Get insights into workflow patterns, performance, and potential improvements
- **Health Monitoring**: Track workflow health, success rates, and execution statistics
- **Pattern Recognition**: Identify common patterns and suggest optimizations
- **Error Handling**: Comprehensive error handling and workflow reliability analysis

## Setup

1. Copy `.env.example` to `.env` and configure your environment variables:
```bash
# n8n API Configuration
N8N_API_KEY=your_n8n_api_key_here
N8N_API_URL=http://localhost:5678/api/v1  # Update with your n8n instance URL
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

## Usage

### Basic Workflow Operations

```typescript
import { useN8teWorkflows } from './hooks/useN8teWorkflows';

function MyComponent() {
  const {
    findWorkflows,
    getWorkflowHealth,
    getSimilarWorkflows,
    createWorkflow,
    toggleWorkflow,
    analyzeWorkflowPerformance
  } = useN8teWorkflows();

  // Find workflows based on description
  const searchWorkflows = async () => {
    const workflows = await findWorkflows('data transformation');
    console.log('Found workflows:', workflows);
  };

  // Check workflow health
  const checkHealth = async (workflowId: string) => {
    const health = await getWorkflowHealth(workflowId);
    console.log('Workflow health:', health);
  };
}
```

### Intelligent Workflow Analysis

```typescript
import { useN8teIntelligence } from './hooks/useN8teIntelligence';

function WorkflowAnalysis() {
  const {
    getWorkflowInsights,
    suggestWorkflowImprovements,
    findSimilarPatterns
  } = useN8teIntelligence();

  // Get comprehensive workflow insights
  const analyzeWorkflow = async (workflowId: string) => {
    const insights = await getWorkflowInsights(workflowId);
    console.log('Workflow insights:', insights);
  };

  // Get improvement suggestions
  const getImprovements = async (workflowId: string) => {
    const suggestions = await suggestWorkflowImprovements(workflowId);
    console.log('Suggested improvements:', suggestions);
  };

  // Find similar workflow patterns
  const findPatterns = async (workflowId: string) => {
    const patterns = await findSimilarPatterns(workflowId);
    console.log('Similar patterns:', patterns);
  };
}
```

## API Integration

The integration uses n8n's REST API to interact with your n8n instance. Key components include:

- `N8nService`: Core service for API interactions
- `N8nHelper`: Utility functions for common operations
- `WorkflowAnalyzer`: Advanced workflow analysis tools
- `useN8teWorkflows`: Hook for basic workflow operations
- `useN8teIntelligence`: Hook for intelligent workflow analysis

## Workflow Analysis Features

N8te can analyze workflows for:

- Error handling patterns
- Trigger node implementation
- Workflow complexity
- Data flow patterns
- Performance metrics
- Common patterns across workflows
- Execution history and success rates

## Recommendations Engine

N8te provides intelligent recommendations for:

- Error handling improvements
- Performance optimizations
- Workflow structure
- Data transformation efficiency
- Modular design patterns
- Best practices implementation

## Types and Interfaces

The integration includes TypeScript definitions for:

- Workflow structures
- Execution data
- Analysis results
- API responses
- Configuration options

## Error Handling

The integration includes comprehensive error handling:

- API error handling
- Type validation
- Runtime error catching
- Meaningful error messages
- Recovery strategies

## Contributing

Feel free to contribute to this project by:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
