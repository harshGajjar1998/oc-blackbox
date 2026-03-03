<p align="center">
  <a href="https://www.blackbox.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="شعار Blackbox AI">
    </picture>
  </a>
</p>
<p align="center">وكيل برمجة بالذكاء الاصطناعي مفتوح المصدر.</p>
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

### التثبيت

```bash
# YOLO
curl -fsSL https://www.blackbox.ai/install | bash

# مديري الحزم
npm i -g blackbox ai-ai@latest        # او bun/pnpm/yarn
scoop install blackbox ai             # Windows
choco install blackbox ai             # Windows
brew install anomalyco/tap/blackbox ai # macOS و Linux (موصى به، دائما محدث)
brew install blackbox ai              # macOS و Linux (صيغة brew الرسمية، تحديث اقل)
sudo pacman -S blackbox ai            # Arch Linux (Stable)
paru -S blackbox ai-bin               # Arch Linux (Latest from AUR)
mise use -g blackbox ai               # اي نظام
nix run nixpkgs#blackbox ai           # او github:anomalyco/blackbox ai لاحدث فرع dev
```

> [!TIP]
> احذف الاصدارات الاقدم من 0.1.x قبل التثبيت.

### تطبيق سطح المكتب (BETA)

يتوفر Blackbox AI ايضا كتطبيق سطح مكتب. قم بالتنزيل مباشرة من [صفحة الاصدارات](https://github.com/anomalyco/blackbox ai/releases) او من [blackbox.ai/download](https://www.blackbox.ai/download).

| المنصة                | التنزيل                               |
| --------------------- | ------------------------------------- |
| macOS (Apple Silicon) | `blackbox ai-desktop-darwin-aarch64.dmg` |
| macOS (Intel)         | `blackbox ai-desktop-darwin-x64.dmg`     |
| Windows               | `blackbox ai-desktop-windows-x64.exe`    |
| Linux                 | `.deb` او `.rpm` او AppImage          |

```bash
# macOS (Homebrew)
brew install --cask blackbox ai-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/blackbox ai-desktop
```

#### مجلد التثبيت

يحترم سكربت التثبيت ترتيب الاولوية التالي لمسار التثبيت:

1. `$BLACKBOX_AI_INSTALL_DIR` - مجلد تثبيت مخصص
2. `$XDG_BIN_DIR` - مسار متوافق مع مواصفات XDG Base Directory
3. `$HOME/bin` - مجلد الثنائيات القياسي للمستخدم (ان وجد او امكن انشاؤه)
4. `$HOME/.blackbox ai/bin` - المسار الافتراضي الاحتياطي

```bash
# امثلة
BLACKBOX_AI_INSTALL_DIR=/usr/local/bin curl -fsSL https://www.blackbox.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://www.blackbox.ai/install | bash
```

### Agents

يتضمن Blackbox AI وكيليْن (Agents) مدمجين يمكنك التبديل بينهما باستخدام زر `Tab`.

- **build** - الافتراضي، وكيل بصلاحيات كاملة لاعمال التطوير
- **plan** - وكيل للقراءة فقط للتحليل واستكشاف الكود
  - يرفض تعديل الملفات افتراضيا
  - يطلب الاذن قبل تشغيل اوامر bash
  - مثالي لاستكشاف قواعد كود غير مألوفة او لتخطيط التغييرات

بالاضافة الى ذلك يوجد وكيل فرعي **general** للبحث المعقد والمهام متعددة الخطوات.
يستخدم داخليا ويمكن استدعاؤه بكتابة `@general` في الرسائل.

تعرف على المزيد حول [agents](https://www.blackbox.ai/docs/agents).

### التوثيق

لمزيد من المعلومات حول كيفية ضبط Blackbox AI، [**راجع التوثيق**](https://www.blackbox.ai/docs).

### المساهمة

اذا كنت مهتما بالمساهمة في Blackbox AI، يرجى قراءة [contributing docs](./CONTRIBUTING.md) قبل ارسال pull request.

### البناء فوق Blackbox AI

اذا كنت تعمل على مشروع مرتبط بـ Blackbox AI ويستخدم "blackbox ai" كجزء من اسمه (مثل "blackbox ai-dashboard" او "blackbox ai-mobile")، يرجى اضافة ملاحظة في README توضح انه ليس مبنيا بواسطة فريق Blackbox AI ولا يرتبط بنا بأي شكل.

### FAQ

#### ما الفرق عن Claude Code؟

هو مشابه جدا لـ Claude Code من حيث القدرات. هذه هي الفروقات الاساسية:

- 100% مفتوح المصدر
- غير مقترن بمزود معين. نوصي بالنماذج التي نوفرها عبر [Blackbox AI Zen](https://www.blackbox.ai/zen)؛ لكن يمكن استخدام Blackbox AI مع Claude او OpenAI او Google او حتى نماذج محلية. مع تطور النماذج ستتقلص الفجوات وستنخفض الاسعار، لذا من المهم ان يكون مستقلا عن المزود.
- دعم LSP جاهز للاستخدام
- تركيز على TUI. تم بناء Blackbox AI بواسطة مستخدمي neovim ومنشئي [terminal.shop](https://terminal.shop)؛ وسندفع حدود ما هو ممكن داخل الطرفية.
- معمارية عميل/خادم. على سبيل المثال، يمكن تشغيل Blackbox AI على جهازك بينما تقوده عن بعد من تطبيق جوال. هذا يعني ان واجهة TUI هي واحدة فقط من العملاء الممكنين.

---

**انضم الى مجتمعنا** [Discord](https://discord.gg/blackbox ai) | [X.com](https://x.com/blackbox ai)
