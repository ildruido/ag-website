// Blocking check for content previews: a signed-out visitor must be sent to the Cloudflare Access login.
//   npx tsx scripts/preview-privacy-check.ts <preview address> [more addresses]
// Exit 0: every address turned the signed-out request away. Exit 1: at least one was readable or could not be
// checked. Exit 2: wrong usage. Used by the content repo's preview workflow (docs/content-repo/).
import { judge, probe } from "./preview-privacy.ts";

const addresses = process.argv.slice(2);
if (addresses.length === 0) {
  console.error(
    "Usage: npx tsx scripts/preview-privacy-check.ts <preview address> [more addresses]",
  );
  process.exit(2);
}

let failed = false;
for (const address of addresses) {
  const base = address.replace(/\/+$/, "");
  for (const path of ["/", "/en/", "/it/"]) {
    const verdict = judge(await probe(base + path));
    console.log(`${verdict.private ? "PRIVATE" : "PUBLIC "} ${base + path}: ${verdict.reason}`);
    if (!verdict.private) failed = true;
  }
}
if (failed) {
  console.error(
    "FAILED: a content preview is readable without signing in. Do not share the link; see docs/PREVIEW.md.",
  );
  process.exit(1);
}
console.log("OK: every content preview asks for a sign-in.");
