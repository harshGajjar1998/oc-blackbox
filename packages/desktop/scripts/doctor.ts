const checks = [
  {
    name: "bun",
    cmd: ["bun", "--version"],
    hint: "Install Bun: https://bun.sh/docs/installation",
  },
  {
    name: "rustc",
    cmd: ["rustc", "--version"],
    hint: "Install Rust via rustup: https://rustup.rs",
  },
  {
    name: "cargo",
    cmd: ["cargo", "--version"],
    hint: "Install Rust via rustup: https://rustup.rs",
  },
]

if (process.platform === "win32") {
  checks.push({
    name: "cl.exe",
    cmd: ["cl"],
    hint: "Install Visual Studio Build Tools with Desktop development with C++ and Windows SDK.",
  })
}

if (process.platform === "darwin") {
  checks.push({
    name: "xcode-select",
    cmd: ["xcode-select", "-p"],
    hint: "Install Xcode Command Line Tools: xcode-select --install",
  })
}

let ok = true

for (const check of checks) {
  if (!Bun.which(check.cmd[0])) {
    ok = false
    console.error(`MISS ${check.name} - ${check.hint}`)
    continue
  }

  const proc = Bun.spawnSync({
    cmd: check.cmd,
    stdout: "ignore",
    stderr: "ignore",
  })

  if (proc.exitCode === 0) {
    console.log(`OK  ${check.name}`)
    continue
  }

  ok = false
  console.error(`MISS ${check.name} - ${check.hint}`)
}

if (!ok) {
  console.error("\nDesktop prerequisites check failed.")
  process.exit(1)
}

console.log("\nDesktop prerequisites look good.")
