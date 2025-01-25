interface Block {
  type: "filled" | "blank";
  length: number;
}

class InvalidGramError extends Error {
  constructor(message: string) {
    super(`Invalid Gram: ${message}`);
    this.name = "InvalidGramError";
  }
}

class Gram {
  grid: number;
  rows: Block[][];

  constructor(block_rows: Block[][]) {
    const rowLengths = block_rows.map((br) =>
      br.reduce((acc, b) => acc + b.length, 0)
    );

    const x = rowLengths.reduce((acc, rL) => {
      return acc + rL;
    }, 0);
    const y = block_rows.length;

    // Check if grid height and length is the same
    if (x !== y) throw new InvalidGramError("Width and heigh are not equal");

    const rowsEven = rowLengths.every((rL) => rL == rowLengths[0]);

    // Check if all row lengths are the same
    if (!rowsEven) throw new InvalidGramError("Rows are not of equal lengths");

    // TODO validate each row

    this.grid = x;
    this.rows = block_rows;

    // I think I should just use a hashmap instead..
  }
}

const exampleString = `
XXXXX
XOOXX
XXOXX
XXOOX
XXXXX`;

const exampleBlockRows: Block[][] = [
  [{ length: 5, type: "blank" }],
  [
    { length: 1, type: "blank" },
    { length: 2, type: "filled" },
    { length: 2, type: "blank" },
  ],
  [
    { length: 2, type: "blank" },
    { length: 1, type: "filled" },
    { length: 2, type: "blank" },
  ],
  [
    { length: 2, type: "blank" },
    { length: 2, type: "filled" },
    { length: 1, type: "blank" },
  ],
  [{ length: 5, type: "blank" }],
];
