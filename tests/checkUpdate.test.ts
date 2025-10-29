import { describe, it, expect } from "vitest";
import { checkUpdate } from "../src/checkUpdate.js";

describe("checkUpdate", () => {
  it("returns latest version for known package", async () => {
    const result = await checkUpdate("react");
    expect(result.latest).toBeTypeOf("string");
    expect(["up-to-date", "outdated", "unknown"]).toContain(result.status);
  });

  it("handles invalid package name", async () => {
    const result = await checkUpdate("@uocdev/nonexistent-pkg");
    expect(result.status).toBe("unknown");
  });
});
