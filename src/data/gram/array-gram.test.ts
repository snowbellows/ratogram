import { test, expect } from "vitest";
import { ArrayGram } from "./array-gram";

const exampleString = `
XXXXX
XOOXX
XXOXX
XXOOX
XXXXX`;

const serialisationString = `XXXXO
                             XXOOO
                             OOOOO
                             XXXXO
                             XXXXO`;

const exampleTileRows = [
  [
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
  ],
  [
    { type: "blank" },
    { type: "filled" },
    { type: "filled" },
    { type: "blank" },
    { type: "blank" },
  ],
  [
    { type: "blank" },
    { type: "blank" },
    { type: "filled" },
    { type: "blank" },
    { type: "blank" },
  ],
  [
    { type: "blank" },
    { type: "blank" },
    { type: "filled" },
    { type: "filled" },
    { type: "blank" },
  ],
  [
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
  ],
];

// const exampleBlockRows = [
//   [{ length: 5, type: "blank" }],
//   [
//     { length: 1, type: "blank" },
//     { length: 2, type: "filled" },
//     { length: 2, type: "blank" },
//   ],
//   [
//     { length: 2, type: "blank" },
//     { length: 1, type: "filled" },
//     { length: 2, type: "blank" },
//   ],
//   [
//     { length: 2, type: "blank" },
//     { length: 2, type: "filled" },
//     { length: 1, type: "blank" },
//   ],
//   [{ length: 5, type: "blank" }],
// ];

test("ArrayGram string conversion", () => {
  const gram = ArrayGram.fromString(exampleString);
  expect(gram.size == exampleTileRows.length);
  expect(gram.tiles == exampleTileRows);
});

test("ArrayGram string conversion round trip", () => {
  const gram = ArrayGram.fromString(exampleString);
  const roundTripString = gram.toString();
  expect(roundTripString.trim() == exampleString.trim());
});

test("ArrayGram serialisation", () => {
  const gram = ArrayGram.fromString(serialisationString);
  const serialised = gram.serialise();
  console.log(serialised);
  expect(serialised == "grb4f1rb2f3rf5rb4f1rb4f1");
});
