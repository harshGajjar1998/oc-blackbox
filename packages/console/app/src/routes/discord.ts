import { redirect } from "@solidjs/router"

export async function GET() {
  return redirect("https://product.blackbox.ai/support")
}
