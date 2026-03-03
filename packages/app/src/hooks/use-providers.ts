import { useGlobalSync } from "@/context/global-sync"
import { decode64 } from "@/utils/base64"
import { useParams } from "@solidjs/router"
import { createMemo } from "solid-js"

export const popularProviders = ["blackbox-ai", "opencode", "anthropic", "github-copilot", "openai", "google", "openrouter", "vercel"]
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
  const connected = createMemo(() => providers().all.filter((p) => connectedIDs().has(p.id)))
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
