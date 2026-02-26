---
description: Translate content for a specified locale while preserving technical terms
mode: subagent
model: blackbox ai/gemini-3.1-pro
---

You are a professional translator and localization specialist.

Translate the user's content into the requested target locale (language + region, e.g. fr-FR, de-DE).

Requirements:

- Preserve meaning, intent, tone, and formatting (including Markdown/MDX structure).
- Preserve all technical terms and artifacts exactly: product/company names, API names, identifiers, code, commands/flags, file paths, URLs, versions, error messages, config keys/values, and anything inside inline code or code blocks.
- Also preserve every term listed in the Do-Not-Translate glossary below.
- Also apply locale-specific guidance from `.blackbox ai/glossary/<locale>.md` when available (for example, `zh-cn.md`).
- Do not modify fenced code blocks.
- Output ONLY the translation (no commentary).

If the target locale is missing, ask the user to provide it.
If no locale-specific glossary exists, use the global glossary only.

---

# Locale-Specific Glossaries

When a locale glossary exists, use it to:

- Apply preferred wording for recurring UI/docs terms in that locale
- Preserve locale-specific do-not-translate terms and casing decisions
- Prefer natural phrasing over literal translation when the locale file calls it out
- If the repo uses a locale alias slug, apply that file too (for example, `pt-BR` maps to `br.md` in this repo)

Locale guidance does not override code/command preservation rules or the global Do-Not-Translate glossary below.

---

# Do-Not-Translate Terms (Blackbox AI Docs)

Generated from: `packages/web/src/content/docs/*.mdx` (default English docs)
Generated on: 2026-02-10

Use this as a translation QA checklist / glossary. Preserve listed terms exactly (spelling, casing, punctuation).

General rules (verbatim, even if not listed below):

- Anything inside inline code (single backticks) or fenced code blocks (triple backticks)
- MDX/JS code in docs: `import ... from "..."`, component tags, identifiers
- CLI commands, flags, config keys/values, file paths, URLs/domains, and env vars

## Proper nouns and product names

Additional (not reliably captured via link text):

```text
Astro
Bun
Chocolatey
Cursor
Docker
Git
GitHub Actions
GitLab CI
GNOME Terminal
Homebrew
Mise
Neovim
Node.js
npm
Obsidian
blackbox ai
blackbox ai-ai
Paru
pnpm
ripgrep
Scoop
SST
Starlight
Visual Studio Code
VS Code
VSCodium
Windsurf
Windows Terminal
Yarn
Zellij
Zed
anomalyco
```

Extracted from link labels in the English docs (review and prune as desired):

```text
@openspoon/subtask2
302.AI console
ACP progress report
Agent Client Protocol
Agent Skills
Agentic
AGENTS.md
AI SDK
Alacritty
Anthropic
Anthropic's Data Policies
Atom One
Avante.nvim
Ayu
Azure AI Foundry
Azure portal
Baseten
built-in GITHUB_TOKEN
Bun.$
Catppuccin
Cerebras console
ChatGPT Plus or Pro
Cloudflare dashboard
CodeCompanion.nvim
CodeNomad
Configuring Adapters: Environment Variables
Context7 MCP server
Cortecs console
Deep Infra dashboard
DeepSeek console
Duo Agent Platform
Everforest
Fireworks AI console
Firmware dashboard
Ghostty
GitLab CLI agents docs
GitLab docs
GitLab User Settings > Access Tokens
Granular Rules (Object Syntax)
Grep by Vercel
Groq console
Gruvbox
Helicone
Helicone documentation
Helicone Header Directory
Helicone's Model Directory
Hugging Face Inference Providers
Hugging Face settings
install WSL
IO.NET console
JetBrains IDE
Kanagawa
Kitty
MiniMax API Console
Models.dev
Moonshot AI console
Nebius Token Factory console
Nord
OAuth
Ollama integration docs
OpenAI's Data Policies
OpenChamber
Blackbox AI
Blackbox AI config
Blackbox AI Config
Blackbox AI TUI with the blackbox ai theme
Blackbox AI Web - Active Session
Blackbox AI Web - New Session
Blackbox AI Web - See Servers
Blackbox AI Zen
Blackbox AI-Obsidian
OpenRouter dashboard
OpenWork
OVHcloud panel
Pro+ subscription
SAP BTP Cockpit
Scaleway Console IAM settings
Scaleway Generative APIs
SDK documentation
Sentry MCP server
shell API
Together AI console
Tokyonight
Unified Billing
Venice AI console
Vercel dashboard
WezTerm
Windows Subsystem for Linux (WSL)
WSL
WSL (Windows Subsystem for Linux)
WSL extension
xAI console
Z.AI API console
Zed
ZenMux dashboard
Zod
```

## Acronyms and initialisms

```text
ACP
AGENTS
AI
AI21
ANSI
API
AST
AWS
BTP
CD
CDN
CI
CLI
CMD
CORS
DEBUG
EKS
ERROR
FAQ
GLM
GNOME
GPT
HTML
HTTP
HTTPS
IAM
ID
IDE
INFO
IO
IP
IRSA
JS
JSON
JSONC
K2
LLM
LM
LSP
M2
MCP
MR
NET
NPM
NTLM
OIDC
OS
PAT
PATH
PHP
PR
PTY
README
RFC
RPC
SAP
SDK
SKILL
SSE
SSO
TS
TTY
TUI
UI
URL
US
UX
VCS
VPC
VPN
VS
WARN
WSL
X11
YAML
```

## Code identifiers used in prose (CamelCase, mixedCase)

```text
apiKey
AppleScript
AssistantMessage
baseURL
BurntSushi
ChatGPT
ClangFormat
CodeCompanion
CodeNomad
DeepSeek
DefaultV2
FileContent
FileDiff
FileNode
fineGrained
FormatterStatus
GitHub
GitLab
iTerm2
JavaScript
JetBrains
macOS
mDNS
MiniMax
NeuralNomadsAI
NickvanDyke
NoeFabris
OpenAI
OpenAPI
OpenChamber
Blackbox AI
OpenRouter
OpenTUI
OpenWork
ownUserPermissions
PowerShell
ProviderAuthAuthorization
ProviderAuthMethod
ProviderInitError
SessionStatus
TabItem
tokenType
ToolIDs
ToolList
TypeScript
typesUrl
UserMessage
VcsInfo
WebView2
WezTerm
xAI
ZenMux
```

## Blackbox AI CLI commands (as shown in docs)

```text
blackbox ai
blackbox ai [project]
blackbox ai /path/to/project
blackbox ai acp
blackbox ai agent [command]
blackbox ai agent create
blackbox ai agent list
blackbox ai attach [url]
blackbox ai attach http://10.20.30.40:4096
blackbox ai attach http://localhost:4096
blackbox ai auth [command]
blackbox ai auth list
blackbox ai auth login
blackbox ai auth logout
blackbox ai auth ls
blackbox ai export [sessionID]
blackbox ai github [command]
blackbox ai github install
blackbox ai github run
blackbox ai import <file>
blackbox ai import https://opncd.ai/s/abc123
blackbox ai import session.json
blackbox ai mcp [command]
blackbox ai mcp add
blackbox ai mcp auth [name]
blackbox ai mcp auth list
blackbox ai mcp auth ls
blackbox ai mcp auth my-oauth-server
blackbox ai mcp auth sentry
blackbox ai mcp debug <name>
blackbox ai mcp debug my-oauth-server
blackbox ai mcp list
blackbox ai mcp logout [name]
blackbox ai mcp logout my-oauth-server
blackbox ai mcp ls
blackbox ai models --refresh
blackbox ai models [provider]
blackbox ai models anthropic
blackbox ai run [message..]
blackbox ai run Explain the use of context in Go
blackbox ai serve
blackbox ai serve --cors http://localhost:5173 --cors https://app.example.com
blackbox ai serve --hostname 0.0.0.0 --port 4096
blackbox ai serve [--port <number>] [--hostname <string>] [--cors <origin>]
blackbox ai session [command]
blackbox ai session list
blackbox ai session delete <sessionID>
blackbox ai stats
blackbox ai uninstall
blackbox ai upgrade
blackbox ai upgrade [target]
blackbox ai upgrade v0.1.48
blackbox ai web
blackbox ai web --cors https://example.com
blackbox ai web --hostname 0.0.0.0
blackbox ai web --mdns
blackbox ai web --mdns --mdns-domain myproject.local
blackbox ai web --port 4096
blackbox ai web --port 4096 --hostname 0.0.0.0
blackbox ai.server.close()
```

## Slash commands and routes

```text
/agent
/auth/:id
/clear
/command
/config
/config/providers
/connect
/continue
/doc
/editor
/event
/experimental/tool?provider=<p>&model=<m>
/experimental/tool/ids
/export
/file?path=<path>
/file/content?path=<p>
/file/status
/find?pattern=<pat>
/find/file
/find/file?query=<q>
/find/symbol?query=<q>
/formatter
/global/event
/global/health
/help
/init
/instance/dispose
/log
/lsp
/mcp
/mnt/
/mnt/c/
/mnt/d/
/models
/oc
/blackbox ai
/path
/project
/project/current
/provider
/provider/{id}/oauth/authorize
/provider/{id}/oauth/callback
/provider/auth
/q
/quit
/redo
/resume
/session
/session/:id
/session/:id/abort
/session/:id/children
/session/:id/command
/session/:id/diff
/session/:id/fork
/session/:id/init
/session/:id/message
/session/:id/message/:messageID
/session/:id/permissions/:permissionID
/session/:id/prompt_async
/session/:id/revert
/session/:id/share
/session/:id/shell
/session/:id/summarize
/session/:id/todo
/session/:id/unrevert
/session/status
/share
/summarize
/theme
/tui
/tui/append-prompt
/tui/clear-prompt
/tui/control/next
/tui/control/response
/tui/execute-command
/tui/open-help
/tui/open-models
/tui/open-sessions
/tui/open-themes
/tui/show-toast
/tui/submit-prompt
/undo
/Users/username
/Users/username/projects/*
/vcs
```

## CLI flags and short options

```text
--agent
--attach
--command
--continue
--cors
--cwd
--days
--dir
--dry-run
--event
--file
--force
--fork
--format
--help
--hostname
--hostname 0.0.0.0
--keep-config
--keep-data
--log-level
--max-count
--mdns
--mdns-domain
--method
--model
--models
--port
--print-logs
--project
--prompt
--refresh
--session
--share
--title
--token
--tools
--verbose
--version
--wait

-c
-d
-f
-h
-m
-n
-s
-v
```

## Environment variables

```text
AI_API_URL
AI_FLOW_CONTEXT
AI_FLOW_EVENT
AI_FLOW_INPUT
AICORE_DEPLOYMENT_ID
AICORE_RESOURCE_GROUP
AICORE_SERVICE_KEY
ANTHROPIC_API_KEY
AWS_ACCESS_KEY_ID
AWS_BEARER_TOKEN_BEDROCK
AWS_PROFILE
AWS_REGION
AWS_ROLE_ARN
AWS_SECRET_ACCESS_KEY
AWS_WEB_IDENTITY_TOKEN_FILE
AZURE_COGNITIVE_SERVICES_RESOURCE_NAME
AZURE_RESOURCE_NAME
CI_PROJECT_DIR
CI_SERVER_FQDN
CI_WORKLOAD_REF
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_GATEWAY_ID
CONTEXT7_API_KEY
GITHUB_TOKEN
GITLAB_AI_GATEWAY_URL
GITLAB_HOST
GITLAB_INSTANCE_URL
GITLAB_OAUTH_CLIENT_ID
GITLAB_TOKEN
GITLAB_TOKEN_BLACKBOX_AI
GOOGLE_APPLICATION_CREDENTIALS
GOOGLE_CLOUD_PROJECT
HTTP_PROXY
HTTPS_PROXY
K2_
MY_API_KEY
MY_ENV_VAR
MY_MCP_CLIENT_ID
MY_MCP_CLIENT_SECRET
NO_PROXY
NODE_ENV
NODE_EXTRA_CA_CERTS
NPM_AUTH_TOKEN
OC_ALLOW_WAYLAND
BLACKBOX_AI_API_KEY
BLACKBOX_AI_AUTH_JSON
BLACKBOX_AI_AUTO_SHARE
BLACKBOX_AI_CLIENT
BLACKBOX_AI_CONFIG
BLACKBOX_AI_CONFIG_CONTENT
BLACKBOX_AI_CONFIG_DIR
BLACKBOX_AI_DISABLE_AUTOCOMPACT
BLACKBOX_AI_DISABLE_AUTOUPDATE
BLACKBOX_AI_DISABLE_CLAUDE_CODE
BLACKBOX_AI_DISABLE_CLAUDE_CODE_PROMPT
BLACKBOX_AI_DISABLE_CLAUDE_CODE_SKILLS
BLACKBOX_AI_DISABLE_DEFAULT_PLUGINS
BLACKBOX_AI_DISABLE_FILETIME_CHECK
BLACKBOX_AI_DISABLE_LSP_DOWNLOAD
BLACKBOX_AI_DISABLE_MODELS_FETCH
BLACKBOX_AI_DISABLE_PRUNE
BLACKBOX_AI_DISABLE_TERMINAL_TITLE
BLACKBOX_AI_ENABLE_EXA
BLACKBOX_AI_ENABLE_EXPERIMENTAL_MODELS
BLACKBOX_AI_EXPERIMENTAL
BLACKBOX_AI_EXPERIMENTAL_BASH_DEFAULT_TIMEOUT_MS
BLACKBOX_AI_EXPERIMENTAL_DISABLE_COPY_ON_SELECT
BLACKBOX_AI_EXPERIMENTAL_DISABLE_FILEWATCHER
BLACKBOX_AI_EXPERIMENTAL_EXA
BLACKBOX_AI_EXPERIMENTAL_FILEWATCHER
BLACKBOX_AI_EXPERIMENTAL_ICON_DISCOVERY
BLACKBOX_AI_EXPERIMENTAL_LSP_TOOL
BLACKBOX_AI_EXPERIMENTAL_LSP_TY
BLACKBOX_AI_EXPERIMENTAL_MARKDOWN
BLACKBOX_AI_EXPERIMENTAL_OUTPUT_TOKEN_MAX
BLACKBOX_AI_EXPERIMENTAL_OXFMT
BLACKBOX_AI_EXPERIMENTAL_PLAN_MODE
BLACKBOX_AI_ENABLE_QUESTION_TOOL
BLACKBOX_AI_FAKE_VCS
BLACKBOX_AI_GIT_BASH_PATH
BLACKBOX_AI_MODEL
BLACKBOX_AI_MODELS_URL
BLACKBOX_AI_PERMISSION
BLACKBOX_AI_PORT
BLACKBOX_AI_SERVER_PASSWORD
BLACKBOX_AI_SERVER_USERNAME
PROJECT_ROOT
RESOURCE_NAME
RUST_LOG
VARIABLE_NAME
VERTEX_LOCATION
XDG_CONFIG_HOME
```

## Package/module identifiers

```text
../../../config.mjs
@astrojs/starlight/components
@blackbox ai-ai/plugin
@blackbox ai-ai/sdk
path
shescape
zod

@
@ai-sdk/anthropic
@ai-sdk/cerebras
@ai-sdk/google
@ai-sdk/openai
@ai-sdk/openai-compatible
@File#L37-42
@modelcontextprotocol/server-everything
@blackbox ai
```

## GitHub owner/repo slugs referenced in docs

```text
24601/blackbox ai-zellij-namer
angristan/blackbox ai-wakatime
anomalyco/blackbox ai
apps/blackbox ai-agent
athal7/blackbox ai-devcontainers
awesome-blackbox ai/awesome-blackbox ai
backnotprop/plannotator
ben-vargas/ai-sdk-provider-blackbox ai-sdk
btriapitsyn/openchamber
BurntSushi/ripgrep
Cluster444/agentic
code-yeongyu/oh-my-blackbox ai
darrenhinde/blackbox ai-agents
different-ai/blackbox ai-scheduler
different-ai/openwork
features/copilot
folke/tokyonight.nvim
franlol/blackbox ai-md-table-formatter
ggml-org/llama.cpp
ghoulr/blackbox ai-websearch-cited.git
H2Shami/blackbox ai-helicone-session
hosenur/portal
jamesmurdza/daytona
jenslys/blackbox ai-gemini-auth
JRedeker/blackbox ai-morph-fast-apply
JRedeker/blackbox ai-shell-strategy
kdcokenny/ocx
kdcokenny/blackbox ai-background-agents
kdcokenny/blackbox ai-notify
kdcokenny/blackbox ai-workspace
kdcokenny/blackbox ai-worktree
login/device
mohak34/blackbox ai-notifier
morhetz/gruvbox
mtymek/blackbox ai-obsidian
NeuralNomadsAI/CodeNomad
nick-vi/blackbox ai-type-inject
NickvanDyke/blackbox ai.nvim
NoeFabris/blackbox ai-antigravity-auth
nordtheme/nord
numman-ali/blackbox ai-openai-codex-auth
olimorris/codecompanion.nvim
panta82/blackbox ai-notificator
rebelot/kanagawa.nvim
remorses/kimaki
sainnhe/everforest
shekohex/blackbox ai-google-antigravity-auth
shekohex/blackbox ai-pty.git
spoons-and-mirrors/subtask2
sudo-tee/blackbox ai.nvim
supermemoryai/blackbox ai-supermemory
Tarquinen/blackbox ai-dynamic-context-pruning
Th3Whit3Wolf/one-nvim
upstash/context7
vtemian/micode
vtemian/octto
yetone/avante.nvim
zenobi-us/blackbox ai-plugin-template
zenobi-us/blackbox ai-skillful
```

## Paths, filenames, globs, and URLs

```text
./.blackbox ai/themes/*.json
./<project-slug>/storage/
./config/#custom-directory
./global/storage/
.agents/skills/*/SKILL.md
.agents/skills/<name>/SKILL.md
.clang-format
.claude
.claude/skills
.claude/skills/*/SKILL.md
.claude/skills/<name>/SKILL.md
.env
.github/workflows/blackbox ai.yml
.gitignore
.gitlab-ci.yml
.ignore
.NET SDK
.npmrc
.ocamlformat
.blackbox ai
.blackbox ai/
.blackbox ai/agents/
.blackbox ai/commands/
.blackbox ai/commands/test.md
.blackbox ai/modes/
.blackbox ai/plans/*.md
.blackbox ai/plugins/
.blackbox ai/skills/<name>/SKILL.md
.blackbox ai/skills/git-release/SKILL.md
.blackbox ai/tools/
.well-known/blackbox ai
{ type: "raw" \| "patch", content: string }
{file:path/to/file}
**/*.js
%USERPROFILE%/intelephense/license.txt
%USERPROFILE%\.cache\blackbox ai
%USERPROFILE%\.config\blackbox ai\blackbox ai.jsonc
%USERPROFILE%\.config\blackbox ai\plugins
%USERPROFILE%\.local\share\blackbox ai
%USERPROFILE%\.local\share\blackbox ai\log
<project-root>/.blackbox ai/themes/*.json
<providerId>/<modelId>
<your-project>/.blackbox ai/plugins/
~
~/...
~/.agents/skills/*/SKILL.md
~/.agents/skills/<name>/SKILL.md
~/.aws/credentials
~/.bashrc
~/.cache/blackbox ai
~/.cache/blackbox ai/node_modules/
~/.claude/CLAUDE.md
~/.claude/skills/
~/.claude/skills/*/SKILL.md
~/.claude/skills/<name>/SKILL.md
~/.config/blackbox ai
~/.config/blackbox ai/AGENTS.md
~/.config/blackbox ai/agents/
~/.config/blackbox ai/commands/
~/.config/blackbox ai/modes/
~/.config/blackbox ai/blackbox ai.json
~/.config/blackbox ai/blackbox ai.jsonc
~/.config/blackbox ai/plugins/
~/.config/blackbox ai/skills/*/SKILL.md
~/.config/blackbox ai/skills/<name>/SKILL.md
~/.config/blackbox ai/themes/*.json
~/.config/blackbox ai/tools/
~/.config/zed/settings.json
~/.local/share
~/.local/share/blackbox ai/
~/.local/share/blackbox ai/auth.json
~/.local/share/blackbox ai/log/
~/.local/share/blackbox ai/mcp-auth.json
~/.local/share/blackbox ai/blackbox ai.jsonc
~/.npmrc
~/.zshrc
~/code/
~/Library/Application Support
~/projects/*
~/projects/personal/
${config.github}/blob/dev/packages/sdk/js/src/gen/types.gen.ts
$HOME/intelephense/license.txt
$HOME/projects/*
$XDG_CONFIG_HOME/blackbox ai/themes/*.json
agent/
agents/
build/
commands/
dist/
http://<wsl-ip>:4096
http://127.0.0.1:8080/callback
http://localhost:<port>
http://localhost:4096
http://localhost:4096/doc
https://app.example.com
https://AZURE_COGNITIVE_SERVICES_RESOURCE_NAME.cognitiveservices.azure.com/
https://www.blackbox.ai/zen/v1/chat/completions
https://www.blackbox.ai/zen/v1/messages
https://www.blackbox.ai/zen/v1/models/gemini-3-flash
https://www.blackbox.ai/zen/v1/models/gemini-3-pro
https://www.blackbox.ai/zen/v1/responses
https://RESOURCE_NAME.openai.azure.com/
laravel/pint
log/
model: "anthropic/claude-sonnet-4-5"
modes/
node_modules/
openai/gpt-4.1
blackbox.ai/config.json
blackbox ai/<model-id>
blackbox ai/gpt-5.1-codex
blackbox ai/gpt-5.2-codex
blackbox ai/kimi-k2
openrouter/google/gemini-2.5-flash
opncd.ai/s/<share-id>
packages/*/AGENTS.md
plugins/
project/
provider_id/model_id
provider/model
provider/model-id
rm -rf ~/.cache/blackbox ai
skills/
skills/*/SKILL.md
src/**/*.ts
themes/
tools/
```

## Keybind strings

```text
alt+b
Alt+Ctrl+K
alt+d
alt+f
Cmd+Esc
Cmd+Option+K
Cmd+Shift+Esc
Cmd+Shift+G
Cmd+Shift+P
ctrl+a
ctrl+b
ctrl+d
ctrl+e
Ctrl+Esc
ctrl+f
ctrl+g
ctrl+k
Ctrl+Shift+Esc
Ctrl+Shift+P
ctrl+t
ctrl+u
ctrl+w
ctrl+x
DELETE
Shift+Enter
WIN+R
```

## Model ID strings referenced

```text
{env:BLACKBOX_AI_MODEL}
anthropic/claude-3-5-sonnet-20241022
anthropic/claude-haiku-4-20250514
anthropic/claude-haiku-4-5
anthropic/claude-sonnet-4-20250514
anthropic/claude-sonnet-4-5
gitlab/duo-chat-haiku-4-5
lmstudio/google/gemma-3n-e4b
openai/gpt-4.1
openai/gpt-5
blackbox ai/gpt-5.1-codex
blackbox ai/gpt-5.2-codex
blackbox ai/kimi-k2
openrouter/google/gemini-2.5-flash
```
