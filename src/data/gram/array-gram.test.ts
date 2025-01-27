import { test, expect } from "vitest";
import { ArrayGram, Block } from "./array-gram";

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

const exampleTileCols = [
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
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
  ],
  [
    { type: "blank" },
    { type: "filled" },
    { type: "filled" },
    { type: "filled" },
    { type: "blank" },
  ],
  [
    { type: "blank" },
    { type: "blank" },
    { type: "blank" },
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

const exampleBlockRows: Block[][] = [
  [{ type: "blank", length: 5 }],
  [
    { type: "blank", length: 1 },
    { type: "filled", length: 2 },
    { type: "blank", length: 2 },
  ],
  [
    { type: "blank", length: 2 },
    { type: "filled", length: 1 },
    { type: "blank", length: 2 },
  ],
  [
    { type: "blank", length: 2 },
    { type: "filled", length: 2 },
    { type: "blank", length: 1 },
  ],
  [{ type: "blank", length: 5 }],
];

const exampleBlockCols: Block[][] = [
  [{ type: "blank", length: 5 }],
  [
    { type: "blank", length: 1 },
    { type: "filled", length: 1 },
    { type: "blank", length: 3 },
  ],
  [
    { type: "blank", length: 1 },
    { type: "filled", length: 3 },
    { type: "blank", length: 1 },
  ],
  [
    { type: "blank", length: 3 },
    { type: "filled", length: 1 },
    { type: "blank", length: 1 },
  ],
  [{ type: "blank", length: 5 }],
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
    expect(gram.row_blocks()).toStrictEqual(exampleBlockRows);
  });
  
  test("ArrayGram block cols", () => {
    const gram = ArrayGram.fromString(exampleString);
    expect(gram.size == exampleTileRows.length);
    expect(gram.col_blocks()).toStrictEqual(exampleBlockCols);
  });
  

test("ArrayGram serialisation", () => {
  const gram = ArrayGram.fromString(serialisationString);
  const serialised = gram.serialise();
  console.log(serialised);
  expect(serialised).toBe("grb4f1rb2f3rf5rb4f1rb4f1");
});
