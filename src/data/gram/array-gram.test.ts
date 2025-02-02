import { test, expect, assert } from "vitest";
import { ArrayGram, Block, Tile } from "./array-gram";
import { InvalidGramError } from "./errors";

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

const serialisedString = "grb4f1rb2f3rf5rb4f1rb4f1";

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

test("ArrayGram string lowercase", () => {
  const lowercaseString = exampleString.toLowerCase();

  const roundTrip = ArrayGram.fromString(lowercaseString).toString();

  expect(lowercaseString.trim().toUpperCase()).toStrictEqual(roundTrip);
});

test("ArrayGram string conversion failure - char other than X or O ", () => {
  const str = "sfhaks";

  assert.throws(
    () => {
      ArrayGram.fromString(str);
    },
    InvalidGramError,
    `Error parsing char, expected either 'O' for filled or 'X' for blank, received '${str[0]}'.`
  );
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

test("ArrayGram block rows empty", () => {
  const gram = new ArrayGram([]);
  expect(gram.size == 0);
  expect(gram.rowBlocks()).toStrictEqual([]);
});

test("ArrayGram block cols empty", () => {
  const gram = new ArrayGram([]);
  expect(gram.size == 0);
  expect(gram.colBlocks()).toStrictEqual([]);
});

test("ArrayGram serialisation", () => {
  const gram = ArrayGram.fromString(serialisationString);
  const serialised = gram.serialise();
  expect(serialised).toBe(serialisedString);
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

test("ArrayGram deserialise", () => {
  const gram = ArrayGram.deserialise(serialisedString);
  const stringGram = ArrayGram.fromString(serialisationString);

  expect(gram.rows()).toStrictEqual(stringGram.rows());
});

test("ArrayGram serialise deserialise round trip", () => {
  const gram = ArrayGram.deserialise(serialisedString);
  const roundtripString = gram.serialise();

  expect(serialisedString).toStrictEqual(roundtripString);
});

test("ArrayGram deserialise failure - incorrect block length", () => {
  assert.throws(
    () => {
      ArrayGram.deserialise("grb4f");
    },
    InvalidGramError,
    "Error deserialising Block, expected block to have a length of 2, received '1'."
  );
});

test("ArrayGram deserialise failure - incorrect block type", () => {
  const str = "grb4g4";
  assert.throws(
    () => {
      ArrayGram.deserialise(str);
    },
    InvalidGramError,
    `Error deserialising Block, expected either 'f' for filled or 'b' for blank, received '${str[4]}'.`
  );
});

test("ArrayGram deserialise failure - incorrect block type", () => {
  const str = "grb4fa";
  assert.throws(
    () => {
      ArrayGram.deserialise(str);
    },
    InvalidGramError,
    `Error deserialising Block, expected a number, received '${str[5]}'.`
  );
});

test("ArrayGram validate failure - empty row", () => {
  assert.throws(
    () => {
      ArrayGram.validate([[]]);
    },
    InvalidGramError,
    "Expected rows to have a length of 1, received a length of 0 for row 1."
  );
});

test("ArrayGram validate empty gram", () => {
  assert.doesNotThrow(() => {
    ArrayGram.validate(new ArrayGram([]));
  });
});
