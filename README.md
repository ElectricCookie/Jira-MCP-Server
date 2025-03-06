# Jira MCP Server

A powerful Jira integration server built using the [Model Context Protocol](https://github.com/modelcontextprotocol) (MCP). This server provides a standardized interface for AI agents to interact with Jira, enabling seamless automation and management of Jira issues and workflows.

## Features

This server implements various Jira operations through MCP tools:

### Issue Management

- Create new issues with customizable fields
- Update existing issues
- Delete issues
- Create issue links between related tickets

### Issue Information

- Retrieve issue details
- Get issue comments
- List available fields
- List issue types
- List link types

### User Operations

- Get user information by email
- Create work logs
- Manage comments
- Handle issue assignments

## Architecture

The server is built on the Model Context Protocol, which provides a standardized way for AI models to interact with external tools and services. Each Jira operation is implemented as a separate MCP tool, making the codebase modular and easily extensible.

## Available Tools

The following MCP tools are available in this server:

- `create_issue`: Create new Jira issues with customizable fields
- `update_issue`: Modify existing issues
- `delete_issue`: Remove issues from Jira
- `create_issue_link`: Create relationships between issues
- `get_issue`: Retrieve issue details
- `get_comments`: Fetch comments for an issue
- `create_worklog`: Log work against issues
- `create_comment`: Add comments to issues
- `list_fields`: Get available Jira fields
- `list_issue_types`: Get available issue types
- `list_link_types`: Get available link types
- `get_user`: Retrieve user information

## Getting Started

1. Clone this repository
2. Configure your Jira credentials (see Configuration section below)
3. Install dependencies and build:
   ```bash
   npm install
   npm run build
   ```
4. Start the server:

   ```bash

   npm run start
   ```

## Configuration

The server requires the following environment variables to be set:

| Variable           | Description                 | Example                                                                                         |
| ------------------ | --------------------------- | ----------------------------------------------------------------------------------------------- |
| `JIRA_HOST`        | Your Jira instance hostname | `your-company.atlassian.net`                                                                    |
| `JIRA_EMAIL`       | Your Jira account email     | `your.email@company.com`                                                                        |
| `JIRA_API_TOKEN`   | API token from Atlassian    | Get it from [Atlassian API tokens](https://id.atlassian.com/manage-profile/security/api-tokens) |
| `JIRA_PROJECT_KEY` | Default project key         | `PROJ`                                                                                          |

You can set these environment variables in a `.env` file in the root directory:

```env
JIRA_HOST=your-company.atlassian.net
JIRA_EMAIL=your.email@company.com
JIRA_API_TOKEN=your-api-token
JIRA_PROJECT_KEY=PROJ
```

Note: Make sure to add `.env` to your `.gitignore` file to prevent committing sensitive credentials.

## Credits

This project is forked from [George5562/Jira-MCP-Server](https://github.com/George5562/Jira-MCP-Server) and enhanced with additional functionality.

## License

Please refer to the original repository for license information.
