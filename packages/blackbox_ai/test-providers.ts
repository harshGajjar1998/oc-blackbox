/**
 * Quick test script to verify Blackbox AI provider/model configuration.
 * Run with: cd packages/blackbox_ai && bun run test-providers.ts
 */

// Minimal stubs so we can import ModelsDev without the full runtime
process.env.OPENCODE_DISABLE_MODELS_FETCH = "1"

// We need to mock some modules that require filesystem/network access
import { ModelsDev } from "./src/provider/models"

async function main() {
  console.log("\n=== Blackbox AI Provider/Model Test ===\n")

  const providers = await ModelsDev.get()
  const blackbox = providers["blackbox-ai"]

  if (!blackbox) {
    console.error("❌ FAIL: blackbox-ai provider not found in database!")
    process.exit(1)
  }

  console.log(`✅ Provider found: ${blackbox.name} (id: ${blackbox.id})`)
  console.log(`   API: ${blackbox.api}`)
  console.log(`   NPM: ${blackbox.npm}`)
  console.log(`   Env: ${blackbox.env?.join(", ")}`)
  console.log(`   Total models: ${Object.keys(blackbox.models).length}`)

  const allModels = Object.values(blackbox.models) as any[]
  const freeModels = allModels.filter((m) => m.cost?.input === 0)
  const paidModels = allModels.filter((m) => m.cost?.input > 0)

  console.log(`\n--- Free models (cost.input === 0): ${freeModels.length} ---`)
  for (const m of freeModels) {
    console.log(`  ✅ ${m.name} (${m.id})`)
  }

  console.log(`\n--- Paid/Premium models (cost.input > 0): ${paidModels.length} ---`)
  for (const m of paidModels) {
    console.log(`  💰 ${m.name} — $${m.cost.input}/$${m.cost.output} per 1M tokens`)
  }

  // Verify specific free models exist
  const kimiK25 = blackbox.models["blackboxai/moonshotai/kimi-k2.5"] as any
  const minimaxM25 = blackbox.models["blackboxai/minimax/minimax-m2.5"] as any
  const blackboxPro = blackbox.models["blackboxai/blackbox-pro"] as any
  const blackboxProPlus = blackbox.models["blackboxai/blackbox-pro-plus"] as any

  console.log("\n--- Key model checks ---")

  if (kimiK25 && kimiK25.cost?.input === 0) {
    console.log(`✅ Kimi K2.5 is FREE (cost: $${kimiK25.cost.input}/$${kimiK25.cost.output})`)
  } else {
    console.error(`❌ FAIL: Kimi K2.5 missing or not free! Got: ${JSON.stringify(kimiK25?.cost)}`)
  }

  if (minimaxM25 && minimaxM25.cost?.input === 0) {
    console.log(`✅ MiniMax M2.5 is FREE (cost: $${minimaxM25.cost.input}/$${minimaxM25.cost.output})`)
  } else {
    console.error(`❌ FAIL: MiniMax M2.5 missing or not free! Got: ${JSON.stringify(minimaxM25?.cost)}`)
  }

  if (blackboxPro && blackboxPro.cost?.input > 0) {
    console.log(`✅ Blackbox Pro is PAID (cost: $${blackboxPro.cost.input}/$${blackboxPro.cost.output})`)
  } else {
    console.error(`❌ FAIL: Blackbox Pro should be paid! Got: ${JSON.stringify(blackboxPro?.cost)}`)
  }

  if (blackboxProPlus && blackboxProPlus.cost?.input > 0) {
    console.log(`✅ Blackbox Pro Plus is PAID (cost: $${blackboxProPlus.cost.input}/$${blackboxProPlus.cost.output})`)
  } else {
    console.error(`❌ FAIL: Blackbox Pro Plus should be paid! Got: ${JSON.stringify(blackboxProPlus?.cost)}`)
  }

  // Simulate the free-tier filter (what the loader does without API key)
  console.log("\n--- Free-tier simulation (no API key) ---")
  const freeTierModels = allModels.filter((m) => m.cost?.input === 0)
  console.log(`Models visible without API key: ${freeTierModels.length}`)
  for (const m of freeTierModels) {
    console.log(`  → ${m.name}`)
  }

  if (freeTierModels.length === 2 &&
      freeTierModels.some((m: any) => m.id.includes("kimi-k2.5")) &&
      freeTierModels.some((m: any) => m.id.includes("minimax-m2.5"))) {
    console.log("✅ Free tier shows exactly Kimi K2.5 + MiniMax M2.5")
  } else {
    console.error("❌ FAIL: Free tier model list is incorrect!")
  }

  console.log("\n=== Test complete ===\n")
}

main().catch((e) => {
  console.error("Test failed:", e)
  process.exit(1)
})
