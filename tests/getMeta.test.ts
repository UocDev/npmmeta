// tests/getMeta.test.ts
import { describe, it, expect, vi } from "vitest";

// mock the fetcher module
const fakeRegistry = {
  name: "fakepkg",
  "dist-tags": { latest: "1.0.0" },
  description: "fake package",
  maintainers: [{ name: "uoc" }],
  versions: {
    "1.0.0": { dependencies: { lodash: "^4.17.21", debug: "^4.3.4" } }
  },
  time: { modified: "2025-10-27T12:00:00.000Z" }
};

vi.mock("../src/fetcher", () => {
  return {
    getRegistryData: async () => fakeRegistry,
    getDownloadData: async () => ({ downloads: 12345 })
  };
});

import { getMeta } from "../src/index.js";

describe("getMeta", () => {
  it("parses metadata correctly", async () => {
    const meta = await getMeta("fakepkg");
    expect(meta.name).toBe("fakepkg");
    expect(meta.version).toBe("1.0.0");
    expect(meta.dependenciesCount).toBe(2);
    expect(meta.maintainers).toContain("uoc");
    expect(meta.downloads).toBe(12345);
    expect(meta.lastModified).toBe("2025-10-27T12:00:00.000Z");
  });
});
