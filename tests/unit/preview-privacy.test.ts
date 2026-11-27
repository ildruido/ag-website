import { spawn } from "node:child_process";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { resolve } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { isAccessLogin, judge, probe } from "../../scripts/preview-privacy.ts";

const login = "https://team.cloudflareaccess.com/cdn-cgi/access/login/pr-1.x.pages.dev?kid=1";

describe("judge", () => {
  it("accepts a redirect to the Cloudflare Access login", () => {
    expect(judge({ status: 302, location: login }).private).toBe(true);
  });
  it("accepts 401 and 403", () => {
    expect(judge({ status: 401, location: null }).private).toBe(true);
    expect(judge({ status: 403, location: null }).private).toBe(true);
  });
  it("fails a readable page", () => {
    expect(judge({ status: 200, location: null }).private).toBe(false);
  });
  it("fails a redirect somewhere else, including a look-alike host", () => {
    expect(judge({ status: 302, location: "https://example.com/login" }).private).toBe(false);
    expect(
      judge({ status: 302, location: "https://cloudflareaccess.com.evil.test/" }).private,
    ).toBe(false);
    expect(judge({ status: 302, location: null }).private).toBe(false);
  });
  it("fails closed on 404, 500 and network errors", () => {
    expect(judge({ status: 404, location: null }).private).toBe(false);
    expect(judge({ status: 500, location: null }).private).toBe(false);
    expect(judge({ status: 0, location: null, error: "ENOTFOUND" }).private).toBe(false);
  });
  it("recognises the login host only", () => {
    expect(isAccessLogin(login)).toBe(true);
    expect(isAccessLogin("not a url")).toBe(false);
  });
});

let mode: "public" | "private" = "private";
const server: Server = createServer((_req, res) => {
  if (mode === "public") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<html><title>Draft post</title></html>");
  } else {
    res.writeHead(302, { location: login });
    res.end();
  }
});
await new Promise<void>((ok) => server.listen(0, "127.0.0.1", ok));
const address = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
afterAll(() => server.close());

const script = resolve("scripts/preview-privacy-check.ts");
const run = (...args: string[]) =>
  new Promise<number | null>((done) => {
    const p = spawn("npx", ["tsx", script, ...args], { stdio: "ignore" });
    p.on("close", done);
  });

describe("preview privacy check", () => {
  it("probes without following redirects", async () => {
    mode = "private";
    expect(await probe(`${address}/en/`)).toEqual({ status: 302, location: login });
  });
  it("passes when the preview asks for a sign-in", async () => {
    mode = "private";
    expect(await run(address)).toBe(0);
  });
  it("fails the PR when the preview is publicly readable", async () => {
    mode = "public";
    expect(await run(address)).toBe(1);
  });
  it("fails when the preview cannot be reached", async () => {
    expect(await run("http://127.0.0.1:1")).toBe(1);
  });
  it("asks for an address", async () => {
    expect(await run()).toBe(2);
  });
});
