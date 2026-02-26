<p align="center">
  <a href="https://www.blackbox.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Blackbox AI logo">
    </picture>
  </a>
</p>
<p align="center">Открытый AI-агент для программирования.</p>
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

### Установка

```bash
# YOLO
curl -fsSL https://www.blackbox.ai/install | bash

# Менеджеры пакетов
npm i -g blackbox ai-ai@latest        # или bun/pnpm/yarn
scoop install blackbox ai             # Windows
choco install blackbox ai             # Windows
brew install anomalyco/tap/blackbox ai # macOS и Linux (рекомендуем, всегда актуально)
brew install blackbox ai              # macOS и Linux (официальная формула brew, обновляется реже)
sudo pacman -S blackbox ai            # Arch Linux (Stable)
paru -S blackbox ai-bin               # Arch Linux (Latest from AUR)
mise use -g blackbox ai               # любая ОС
nix run nixpkgs#blackbox ai           # или github:anomalyco/blackbox ai для самой свежей ветки dev
```

> [!TIP]
> Перед установкой удалите версии старше 0.1.x.

### Десктопное приложение (BETA)

Blackbox AI также доступен как десктопное приложение. Скачайте его со [страницы релизов](https://github.com/anomalyco/blackbox ai/releases) или с [blackbox.ai/download](https://www.blackbox.ai/download).

| Платформа             | Загрузка                              |
| --------------------- | ------------------------------------- |
| macOS (Apple Silicon) | `blackbox ai-desktop-darwin-aarch64.dmg` |
| macOS (Intel)         | `blackbox ai-desktop-darwin-x64.dmg`     |
| Windows               | `blackbox ai-desktop-windows-x64.exe`    |
| Linux                 | `.deb`, `.rpm` или AppImage           |

```bash
# macOS (Homebrew)
brew install --cask blackbox ai-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/blackbox ai-desktop
```

#### Каталог установки

Скрипт установки выбирает путь установки в следующем порядке приоритета:

1. `$BLACKBOX_AI_INSTALL_DIR` - Пользовательский каталог установки
2. `$XDG_BIN_DIR` - Путь, совместимый со спецификацией XDG Base Directory
3. `$HOME/bin` - Стандартный каталог пользовательских бинарников (если существует или можно создать)
4. `$HOME/.blackbox ai/bin` - Fallback по умолчанию

```bash
# Примеры
BLACKBOX_AI_INSTALL_DIR=/usr/local/bin curl -fsSL https://www.blackbox.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://www.blackbox.ai/install | bash
```

### Agents

В Blackbox AI есть два встроенных агента, между которыми можно переключаться клавишей `Tab`.

- **build** - По умолчанию, агент с полным доступом для разработки
- **plan** - Агент только для чтения для анализа и изучения кода
  - По умолчанию запрещает редактирование файлов
  - Запрашивает разрешение перед выполнением bash-команд
  - Идеален для изучения незнакомых кодовых баз или планирования изменений

Также включен сабагент **general** для сложных поисков и многошаговых задач.
Он используется внутренне и может быть вызван в сообщениях через `@general`.

Подробнее об [agents](https://www.blackbox.ai/docs/agents).

### Документация

Больше информации о том, как настроить Blackbox AI: [**наши docs**](https://www.blackbox.ai/docs).

### Вклад

Если вы хотите внести вклад в Blackbox AI, прочитайте [contributing docs](./CONTRIBUTING.md) перед тем, как отправлять pull request.

### Разработка на базе Blackbox AI

Если вы делаете проект, связанный с Blackbox AI, и используете "blackbox ai" как часть имени (например, "blackbox ai-dashboard" или "blackbox ai-mobile"), добавьте примечание в README, чтобы уточнить, что проект не создан командой Blackbox AI и не аффилирован с нами.

### FAQ

#### Чем это отличается от Claude Code?

По возможностям это очень похоже на Claude Code. Вот ключевые отличия:

- 100% open source
- Не привязано к одному провайдеру. Мы рекомендуем модели из [Blackbox AI Zen](https://www.blackbox.ai/zen); но Blackbox AI можно использовать с Claude, OpenAI, Google или даже локальными моделями. По мере развития моделей разрыв будет сокращаться, а цены падать, поэтому важна независимость от провайдера.
- Поддержка LSP из коробки
- Фокус на TUI. Blackbox AI построен пользователями neovim и создателями [terminal.shop](https://terminal.shop); мы будем раздвигать границы того, что возможно в терминале.
- Архитектура клиент/сервер. Например, это позволяет запускать Blackbox AI на вашем компьютере, а управлять им удаленно из мобильного приложения. Это значит, что TUI-фронтенд - лишь один из возможных клиентов.

---

**Присоединяйтесь к нашему сообществу** [Discord](https://discord.gg/blackbox ai) | [X.com](https://x.com/blackbox ai)
