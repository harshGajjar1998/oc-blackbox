<p align="center">
  <a href="https://blackbox.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Blackbox AI logo">
    </picture>
  </a>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://blackbox.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/blackbox-ai"><img alt="npm" src="https://img.shields.io/npm/v/blackbox-ai?style=flat-square" /></a>
  <a href="https://github.com/anomalyco/blackbox-ai/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/anomalyco/blackbox-ai/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a>
</p>

[![Blackbox AI Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://blackbox.ai)

---

### Installation

```
bash
# YOLO
curl -fsSL https://blackbox.ai/install | bash

# Package managers
npm i -g blackbox-ai@latest        # or bun/pnpm/yarn
scoop install blackbox-ai             # Windows
choco install blackbox-ai             # Windows
brew install anomalyco/tap/blackbox-ai # macOS and Linux (recommended, always up to date)
brew install blackbox-ai              # macOS and Linux (official brew formula, updated less)
sudo pacman -S blackbox-ai            # Arch Linux (Stable)
paru -S blackbox-ai-bin               # Arch Linux (Latest)
```

### Install directory

By default, `blackbox-ai` is installed in `/usr/local/bin`. To install into a custom directory:

1. `$OPENCODE_INSTALL_DIR` - Custom directory (e.g. `$HOME/.local/bin`)
2. `$XDG_BIN_DIR` - XDG bin directory (default: `$HOME/.local/bin`)
3. `$HOME/.local/bin` - Fallback to local bin
4. `/usr/local/bin` - Default system-wide

If you get a permission error, either:
1. Add your user to the install directory's group (e.g. `sudo usermod -aG wheel $USER` for `/usr/local/bin`)
2. Or set `OPENCODE_INSTALL_DIR` to a writable directory (e.g. `$HOME/.local/bin`)

```
bash
# Examples
OPENCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://blackbox.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://blackbox.ai/install | bash
```

### Agents

Blackbox AI includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about [agents](https://blackbox.ai/docs/agents).

### Documentation

For more info on how to configure Blackbox AI, [**head over to our docs**](https://blackbox.ai/docs).

### Contributing

If you're interested in contributing to Blackbox AI, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on Blackbox AI

If you are working on a project that's related to Blackbox AI and is using "blackbox-ai" as part of its name, for example "blackbox-ai-dashboard" or "blackbox-ai-mobile", please add a note to your README to clarify that it is not built by the Blackbox AI team and is not affiliated with us in any way.

### FAQ

#### How is this different from Claude Code?

It's very similar to Claude Code in terms of capability. Here are the key differences:

- 100% open source
- Not coupled to any provider. Although we recommend the models we provide through [Blackbox AI Zen](https://blackbox.ai/zen), Blackbox AI can be used with Claude, OpenAI, Google, or even local models. As models evolve, the gaps between them will close and pricing will drop, so being provider-agnostic is important.
- Out-of-the-box LSP support
- A focus on TUI. Blackbox AI is built by neovim users and the creators of [terminal.shop](https://terminal.shop); we are going to push the limits of what's possible in the terminal.
- A client/server architecture. This, for example, can allow Blackbox AI to run on your computer while you drive it remotely from a mobile app, meaning that the TUI frontend is just one of the possible clients.

---

**Join our community** [Discord](https://discord.gg/blackbox-ai) | [X.com](https://x.com/blackbox-ai)
