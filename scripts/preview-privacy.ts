// Decides whether a signed-out request to a content preview was turned away (private) or served (public).
// Fails closed: anything we cannot positively recognise as "asked to sign in" counts as NOT private.

export interface Probe {
  status: number;
  location: string | null;
  error?: string;
}

export interface Verdict {
  private: boolean;
  reason: string;
}

/** True when the redirect target is a Cloudflare Access sign-in page. */
export function isAccessLogin(location: string | null): boolean {
  if (!location) return false;
  try {
    const host = new URL(location, "https://example.invalid").hostname;
    return host === "cloudflareaccess.com" || host.endsWith(".cloudflareaccess.com");
  } catch {
    return false;
  }
}

export function judge(probe: Probe): Verdict {
  if (probe.error) return { private: false, reason: `could not be checked (${probe.error})` };
  if (probe.status >= 300 && probe.status < 400) {
    return isAccessLogin(probe.location)
      ? { private: true, reason: "sends signed-out visitors to the Cloudflare Access login" }
      : {
          private: false,
          reason: `redirects to ${probe.location ?? "nowhere"}, not the Access login`,
        };
  }
  if (probe.status === 401 || probe.status === 403) {
    return { private: true, reason: `refuses signed-out visitors (${probe.status})` };
  }
  return { private: false, reason: `answers ${probe.status} to a signed-out visitor` };
}

/** One signed-out request: no cookies, redirects not followed. */
export async function probe(url: string): Promise<Probe> {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { cookie: "" } });
    return { status: res.status, location: res.headers.get("location") };
  } catch (e) {
    return { status: 0, location: null, error: (e as Error).message };
  }
}
