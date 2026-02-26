<p align="center">
  <a href="https://www.blackbox.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Blackbox AI logo">
    </picture>
  </a>
</p>
<p align="center">Den open source AI-kodeagent.</p>
<p align="center">
  <a href="https://www.blackbox.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/blackbox ai-ai"><img alt="npm" src="https://img.shields.io/npm/v/blackbox ai-ai?style=flat-square" /></a>
  <a href="https://github.com/anomalyco/blackbox ai/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/anomalyco/blackbox ai/publish.yml?style=flat-square&branch=dev" /></a>
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
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a>
</p>

[![Blackbox AI Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://www.blackbox.ai)

---

### Installation

```bash
# YOLO
curl -fsSL https://www.blackbox.ai/install | bash

# Pakkehåndteringer
npm i -g blackbox ai-ai@latest        # eller bun/pnpm/yarn
scoop install blackbox ai             # Windows
choco install blackbox ai             # Windows
brew install anomalyco/tap/blackbox ai # macOS og Linux (anbefalet, altid up to date)
brew install blackbox ai              # macOS og Linux (officiel brew formula, opdateres sjældnere)
sudo pacman -S blackbox ai            # Arch Linux (Stable)
paru -S blackbox ai-bin               # Arch Linux (Latest from AUR)
mise use -g blackbox ai               # alle OS
nix run nixpkgs#blackbox ai           # eller github:anomalyco/blackbox ai for nyeste dev-branch
```

> [!TIP]
> Fjern versioner ældre end 0.1.x før installation.

### Desktop-app (BETA)

Blackbox AI findes også som desktop-app. Download direkte fra [releases-siden](https://github.com/anomalyco/blackbox ai/releases) eller [blackbox.ai/download](https://www.blackbox.ai/download).

| Platform              | Download                              |
| --------------------- | ------------------------------------- |
| macOS (Apple Silicon) | `blackbox ai-desktop-darwin-aarch64.dmg` |
| macOS (Intel)         | `blackbox ai-desktop-darwin-x64.dmg`     |
| Windows               | `blackbox ai-desktop-windows-x64.exe`    |
| Linux                 | `.deb`, `.rpm`, eller AppImage        |

```bash
# macOS (Homebrew)
brew install --cask blackbox ai-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/blackbox ai-desktop
```

#### Installationsmappe

Installationsscriptet bruger følgende prioriteringsrækkefølge for installationsstien:

1. `$BLACKBOX_AI_INSTALL_DIR` - Tilpasset installationsmappe
2. `$XDG_BIN_DIR` - Sti der følger XDG Base Directory Specification
3. `$HOME/bin` - Standard bruger-bin-mappe (hvis den findes eller kan oprettes)
4. `$HOME/.blackbox ai/bin` - Standard fallback

```bash
# Eksempler
BLACKBOX_AI_INSTALL_DIR=/usr/local/bin curl -fsSL https://www.blackbox.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://www.blackbox.ai/install | bash
```

### Agents

Blackbox AI har to indbyggede agents, som du kan skifte mellem med `Tab`-tasten.

- **build** - Standard, agent med fuld adgang til udviklingsarbejde
- **plan** - Skrivebeskyttet agent til analyse og kodeudforskning
  - Afviser filredigering som standard
  - Spørger om tilladelse før bash-kommandoer
  - Ideel til at udforske ukendte kodebaser eller planlægge ændringer

Derudover findes der en **general**-subagent til komplekse søgninger og flertrinsopgaver.
Den bruges internt og kan kaldes via `@general` i beskeder.

Læs mere om [agents](https://www.blackbox.ai/docs/agents).

### Dokumentation

For mere info om konfiguration af Blackbox AI, [**se vores docs**](https://www.blackbox.ai/docs).

### Bidrag

Hvis du vil bidrage til Blackbox AI, så læs vores [contributing docs](./CONTRIBUTING.md) før du sender en pull request.

### Bygget på Blackbox AI

Hvis du arbejder på et projekt der er relateret til Blackbox AI og bruger "blackbox ai" som en del af navnet; f.eks. "blackbox ai-dashboard" eller "blackbox ai-mobile", så tilføj en note i din README, der tydeliggør at projektet ikke er bygget af Blackbox AI-teamet og ikke er tilknyttet os på nogen måde.

### FAQ

#### Hvordan adskiller dette sig fra Claude Code?

Det minder meget om Claude Code i forhold til funktionalitet. Her er de vigtigste forskelle:

- 100% open source
- Ikke låst til en udbyder. Selvom vi anbefaler modellerne via [Blackbox AI Zen](https://www.blackbox.ai/zen); kan Blackbox AI bruges med Claude, OpenAI, Google eller endda lokale modeller. Efterhånden som modeller udvikler sig vil forskellene mindskes og priserne falde, så det er vigtigt at være provider-agnostic.
- LSP-support out of the box
- Fokus på TUI. Blackbox AI er bygget af neovim-brugere og skaberne af [terminal.shop](https://terminal.shop); vi vil skubbe grænserne for hvad der er muligt i terminalen.
- Klient/server-arkitektur. Det kan f.eks. lade Blackbox AI køre på din computer, mens du styrer den eksternt fra en mobilapp. Det betyder at TUI-frontend'en kun er en af de mulige clients.

---

**Bliv en del af vores community** [Discord](https://discord.gg/blackbox ai) | [X.com](https://x.com/blackbox ai)
