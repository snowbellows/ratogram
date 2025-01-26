import { InvalidGramError, InvalidGRowError } from "./errors";

export interface GBlock {
  type: "filled" | "blank";
  length: number;
}

export class GRow {
  blocks: GBlock[];

  constructor(blocks: GBlock[]) {
    this.blocks = blocks;
  }

  static validate(row: GBlock[] | GRow, expectedLength: number) {
    if (!(row instanceof GRow)) {
      row = new GRow(row);
    }

    // Check if blocks are of the expected length
    if (row.length !== expectedLength) {
      throw new InvalidGRowError(
        `Row length of ${row.length} does not match expected length of ${expectedLength}.`
      );
    }
  }

  get length() {
    return this.blocks.reduce((acc, b) => acc + b.length, 0);
  }
}

class Gram {
  grid: number;
  rows: GBlock[][];

  constructor(blockRows: GBlock[][]) {
    const rowLengths = blockRows.map((br) =>
      br.reduce((acc, b) => acc + b.length, 0)
    );

    const x = rowLengths.reduce((acc, rL) => {
      return acc + rL;
    }, 0);
    const y = blockRows.length;

    // Check if grid height and length is the same
    if (x !== y) throw new InvalidGramError("Width and heigh are not equal");

    const rowsEven = rowLengths.every((rL) => rL == rowLengths[0]);

    // Check if all row lengths are the same
    if (!rowsEven) throw new InvalidGramError("Rows are not of equal lengths");

    // TODO validate each row

    this.grid = x;
    this.rows = blockRows;
  }
}
