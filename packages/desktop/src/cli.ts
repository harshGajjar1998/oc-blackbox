import { message } from "@tauri-apps/plugin-dialog"
import { Command } from "@tauri-apps/plugin-shell"

import { initI18n, t } from "./i18n"

export async function installCli(): Promise<void> {
  await initI18n()

  try {
    const command = Command.create("install-blackbox-cli", [
      "-lc",
      "curl -fsSL https://blackbox.ai/install.sh | bash",
    ])

    await command.execute()
    await message(t("desktop.cli.installed.message", { path: "blackbox" }), { title: t("desktop.cli.installed.title") })
  } catch (e) {
    await message(t("desktop.cli.failed.message", { error: String(e) }), { title: t("desktop.cli.failed.title") })
  }
}
