import { test, expect } from "vitest";
import { ArrayGram, Block, Tile } from "./array-gram";

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

const exampleTileRows: Tile[][] = [
  [
    { id: "r1xc1", type: "blank" },
    { id: "r1xc2", type: "blank" },
    { id: "r1xc3", type: "blank" },
    { id: "r1xc4", type: "blank" },
    { id: "r1xc5", type: "blank" },
  ],
  [
    { id: "r2xc1", type: "blank" },
    { id: "r2xc2", type: "filled" },
    { id: "r2xc3", type: "filled" },
    { id: "r2xc4", type: "blank" },
    { id: "r2xc5", type: "blank" },
  ],
  [
    { id: "r3xc1", type: "blank" },
    { id: "r3xc2", type: "blank" },
    { id: "r3xc3", type: "filled" },
    { id: "r3xc4", type: "blank" },
    { id: "r3xc5", type: "blank" },
  ],
  [
    { id: "r4xc1", type: "blank" },
    { id: "r4xc2", type: "blank" },
    { id: "r4xc3", type: "filled" },
    { id: "r4xc4", type: "filled" },
    { id: "r4xc5", type: "blank" },
  ],
  [
    { id: "r5xc1", type: "blank" },
    { id: "r5xc2", type: "blank" },
    { id: "r5xc3", type: "blank" },
    { id: "r5xc4", type: "blank" },
    { id: "r5xc5", type: "blank" },
  ],
];

const exampleTileCols: Tile[][] = [
  [
    { id: "r1xc1", type: "blank" },
    { id: "r2xc1", type: "blank" },
    { id: "r3xc1", type: "blank" },
    { id: "r4xc1", type: "blank" },
    { id: "r5xc1", type: "blank" },
  ],
  [
    { id: "r1xc2", type: "blank" },
    { id: "r2xc2", type: "filled" },
    { id: "r3xc2", type: "blank" },
    { id: "r4xc2", type: "blank" },
    { id: "r5xc2", type: "blank" },
  ],
  [
    { id: "r1xc3", type: "blank" },
    { id: "r2xc3", type: "filled" },
    { id: "r3xc3", type: "filled" },
    { id: "r4xc3", type: "filled" },
    { id: "r5xc3", type: "blank" },
  ],
  [
    { id: "r1xc4", type: "blank" },
    { id: "r2xc4", type: "blank" },
    { id: "r3xc4", type: "blank" },
    { id: "r4xc4", type: "filled" },
    { id: "r5xc4", type: "blank" },
  ],
  [
    { id: "r1xc5", type: "blank" },
    { id: "r2xc5", type: "blank" },
    { id: "r3xc5", type: "blank" },
    { id: "r4xc5", type: "blank" },
    { id: "r5xc5", type: "blank" },
  ],
];

const exampleBlockRows: Block[][] = [
  [{ id: "r1xb1", length: 5, type: "blank" }],
  [
    { id: "r2xb1", length: 1, type: "blank" },
    { id: "r2xb2", length: 2, type: "filled" },
    { id: "r2xb3", length: 2, type: "blank" },
  ],
  [
    { id: "r3xb1", length: 2, type: "blank" },
    { id: "r3xb2", length: 1, type: "filled" },
    { id: "r3xb3", length: 2, type: "blank" },
  ],
  [
    { id: "r4xb1", length: 2, type: "blank" },
    { id: "r4xb2", length: 2, type: "filled" },
    { id: "r4xb3", length: 1, type: "blank" },
  ],
  [{ id: "r5xb1", length: 5, type: "blank" }],
];

const exampleBlockCols: Block[][] = [
  [{ id: "c1xb1", length: 5, type: "blank" }],
  [
    { id: "c2xb1", length: 1, type: "blank" },
    { id: "c2xb2", length: 1, type: "filled" },
    { id: "c2xb3", length: 3, type: "blank" },
  ],
  [
    { id: "c3xb1", length: 1, type: "blank" },
    { id: "c3xb2", length: 3, type: "filled" },
    { id: "c3xb3", length: 1, type: "blank" },
  ],
  [
    { id: "c4xb1", length: 3, type: "blank" },
    { id: "c4xb2", length: 1, type: "filled" },
    { id: "c4xb3", length: 1, type: "blank" },
  ],
  [{ id: "c5xb1", length: 5, type: "blank" }],
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

test("ArrayGram string conversion rows", () => {
  const gram = ArrayGram.fromString(exampleString);
  expect(gram.size == exampleTileRows.length);
  expect(gram.rows()).toStrictEqual(exampleTileRows);
});

test("ArrayGram string conversion cols", () => {
  const gram = ArrayGram.fromString(exampleString);
  expect(gram.size == exampleTileRows.length);
  expect(gram.cols()).toStrictEqual(exampleTileCols);
});

test("ArrayGram string conversion round trip", () => {
  const gram = ArrayGram.fromString(exampleString);
  const roundTripString = gram.toString();
  expect(roundTripString.trim()).toBe(exampleString.trim());
});

test("ArrayGram block rows", () => {
  const gram = ArrayGram.fromString(exampleString);
  expect(gram.size == exampleTileRows.length);
  expect(gram.rowBlocks()).toStrictEqual(exampleBlockRows);
});

test("ArrayGram block cols", () => {
  const gram = ArrayGram.fromString(exampleString);
  expect(gram.size == exampleTileRows.length);
  expect(gram.colBlocks()).toStrictEqual(exampleBlockCols);
});

test("ArrayGram serialisation", () => {
  const gram = ArrayGram.fromString(serialisationString);
  const serialised = gram.serialise();
  console.log(serialised);
  expect(serialised).toBe("grb4f1rb2f3rf5rb4f1rb4f1");
});

test("ArrayGram new blank", () => {
  const gram = ArrayGram.newBlank(3);

  expect(gram.rowBlocks()).toStrictEqual([
    [{ id: "r1xb1", type: "blank", length: 3 }],
    [{ id: "r2xb1", type: "blank", length: 3 }],
    [{ id: "r3xb1", type: "blank", length: 3 }],
  ]);

  expect(gram.rows()).toStrictEqual([
    [
      { id: "r1xc1", type: "blank" },
      { id: "r1xc2", type: "blank" },
      { id: "r1xc3", type: "blank" },
    ],
    [
      { id: "r2xc1", type: "blank" },
      { id: "r2xc2", type: "blank" },
      { id: "r2xc3", type: "blank" },
    ],
    [
      { id: "r3xc1", type: "blank" },
      { id: "r3xc2", type: "blank" },
      { id: "r3xc3", type: "blank" },
    ],
  ]);
});

test("ArrayGram toggle tile", () => {
  const gram = ArrayGram.newBlank(3);

  const newGram = gram.toggleTile({ x: 1, y: 0 });

  expect(newGram.rows()).not.toStrictEqual(gram.rows());

  expect(newGram.rowBlocks()).toStrictEqual([
    [
      { id: "r1xb1", type: "blank", length: 1 },
      { id: "r1xb2", type: "filled", length: 1 },
      { id: "r1xb3", type: "blank", length: 1 },
    ],
    [{ id: "r2xb1", type: "blank", length: 3 }],
    [{ id: "r3xb1", type: "blank", length: 3 }],
  ]);
});
