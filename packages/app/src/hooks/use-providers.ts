import { useGlobalSync } from "@/context/global-sync"
import { decode64 } from "@/utils/base64"
import { useParams } from "@solidjs/router"
import { createMemo } from "solid-js"

// "opencode" (OpenCode Zen) intentionally excluded — this is a Blackbox AI product
export const popularProviders = ["blackbox-ai", "anthropic", "github-copilot", "openai", "google", "openrouter", "vercel"]
const popularProviderSet = new Set(popularProviders)

export function useProviders() {
  const globalSync = useGlobalSync()
  const params = useParams()
  const currentDirectory = createMemo(() => decode64(params.dir) ?? "")
  const providers = createMemo(() => {
    if (currentDirectory()) {
      const [projectStore] = globalSync.child(currentDirectory())
      return projectStore.provider
    }
    return globalSync.data.provider
  })
  const connectedIDs = createMemo(() => new Set(providers().connected))
  // Filter out "opencode" (OpenCode Zen) — not a Blackbox AI provider, should not appear anywhere in the UI
  const connected = createMemo(() => providers().all.filter((p) => connectedIDs().has(p.id) && p.id !== "opencode"))
  const paid = createMemo(() =>
    connected().filter((p) => {
      // Hide opencode/blackbox-ai from "paid" list if they only have free models
      if (p.id === "opencode" || p.id === "blackbox-ai") {
        return !!Object.values(p.models).find((m) => m.cost?.input)
      }
      return true
    }),
  )
  const popular = createMemo(() => providers().all.filter((p) => popularProviderSet.has(p.id)))
  return {
    all: createMemo(() => providers().all),
    default: createMemo(() => providers().default),
    popular,
    connected,
    paid,
  }
}
