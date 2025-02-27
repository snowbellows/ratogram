import { test, expect } from "vitest";
import { ArrayGram } from "./gram/array-gram";
import { defaultGramsSe } from "./default";

for (const d in defaultGramsSe) {
  const v = defaultGramsSe[d as keyof typeof defaultGramsSe];
  test(`defaults roundtrip ${d}`, () => {
    expect(ArrayGram.deserialise(v).serialise()).toBe(v);
  });
}
