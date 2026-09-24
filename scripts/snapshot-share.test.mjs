import assert from "node:assert/strict";
import { snapshotFilename, snapshotShareText } from "../src/lib/snapshot-share.ts";

assert.equal(snapshotFilename("2026-09-23"), "aion-geo-monitor-2026-09-23.png");
assert.equal(snapshotFilename("not-a-date"), "aion-geo-monitor-latest.png");
assert.equal(snapshotShareText("2026-09-23", "zh"), "AION 地缘冲突监测 · 2026-09-23 快照");
assert.equal(snapshotShareText("2026-09-23", "en"), "AION Geo-Conflict Monitor · 2026-09-23 snapshot");
console.log("snapshot-share ok");
