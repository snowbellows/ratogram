import { InvalidGramError } from "./errors";

/**
 * Represents a single tile in a Gram
 */
interface Tile {
  type: "filled" | "blank";
}

/**
 * Creates a Tile from a string containing a single character.
 *
 * Throws an InvalidGramError if passed an invalid string.
 *
 * @param {string} char - 'O' for filled or 'X' for blank, ingores case
 * @returns {Tile}
 */
function tileFromChar(char: string): Tile {
  // Check if char is a single character
  if (char.length !== 1) {
    throw new InvalidGramError(
      `Error parsing char, Expected a length of 1, received char with a length of ${char.length}.`
    );
  }

  // Allows us to ignore case
  char.toUpperCase();

  switch (char) {
    case "O":
      return { type: "filled" };
    case "X":
      return { type: "blank" };
    default:
      throw new InvalidGramError(
        `Error parsing char, Expected either 'O' for filled or 'X' for blank, recieved '${char}'.`
      );
  }
}

/**
 * Creates a a string containing a single character from a Tile.
 *
 * @param {Tile} tile
 * @returns {string}
 */
function charFromTile(tile: Tile): string {
  switch (tile.type) {
    case "filled":
      return "O";
    case "blank":
      return "X";
  }
}

/**
 * Serialises a Tile.
 *
 * @param {Tile} tile
 * @returns {string}
 */
function serialiseTile(tile: Tile): string {
  switch (tile.type) {
    case "filled":
      return "f";
    case "blank":
      return "b";
  }
}

interface Block {
  type: "blank" | "filled";
  length: number;
}

/**
 * Serialises a Block.
 *
 * @param {Block} block
 * @returns {string}
 */
function serialiseBlock(block: Block): string {
  switch (block.type) {
    case "filled":
      return `f${block.length}`;
    case "blank":
      return `b${block.length}`;
  }
}

function rowToBlocks(row: Tile[]): Block[] {
  let block: Block | undefined = undefined;
  let blocks: Block[] = [];

  row.forEach((t) => {
    if (!block) {
      // If block is undefined create a new block with type of first tile
      block = { type: t.type, length: 1 };
    } else if (t.type !== block.type) {
      // If the tile type is different to the finished block push the current block and create a new one
      blocks.push(block);
      block = { type: t.type, length: 1 };
    } else {
      block = { ...block, length: block.length + 1 };
    }
  });
  if (block) {
    return [...blocks, block];
  }
  return blocks;
}

/**
 * Represents a full Gram using a "2d" array of tiles.
 */
export class ArrayGram {
  size: number;
  tiles: Tile[][];

  /**
   * Creates a new Gram from a "2d" array of tiles with each inner array representing one row.
   *
   * Grams are always squares and this method throws an InvalidGramError if the length of every
   * nested array is not equal to the length of the outer array.
   *
   * @param {Tile[][]} tiles - nested array of tiles
   */
  constructor(tiles: Tile[][]) {
    ArrayGram.validate(tiles);
    this.size = tiles.length;
    this.tiles = tiles;
  }

  /**
   * Validates that a "2d" array of Tiles is a valid Gram by checking that the length of every
   * nested array is equal to the length of the outer array or expected size of the Gram.
   *
   * This method throws an InvalidGramError if validation fails.
   *
   * @param {Tile[][]} tiles
   */
  static validate(tiles: Tile[][] | ArrayGram) {
    let size;

    // Overload function to allow validating both "2d" arrays of tiles or an ArrayGram instance.
    if (tiles instanceof ArrayGram) {
      size = tiles.size;
      tiles = tiles.tiles;
    } else {
      size = tiles.length;
    }

    for (const [i, r] of tiles.entries()) {
      if (r.length !== size) {
        throw new InvalidGramError(
          `Expected rows to have a length of ${tiles.length}, received a length of ${r.length} for row ${i}.`
        );
      }
    }
  }

  /**
   * Creates a new Gram of specified size with all tiles marked as blank.
   *
   * @param {number} size - length of one side, grams are always square
   * @returns {ArrayGram}
   */
  static newBlank(size: number): ArrayGram {
    const side = Array(size);

    const tiles = side.map(() => side.map(() => ({ type: "blank" } as Tile)));

    return new ArrayGram(tiles);
  }

  /**
   * Creates a new Gram from a string representation.
   *
   * Expects a string like:
   * ```
   * `XXO
   *  XOX
   *  OOX`
   * ```
   *
   * The format requires each row to be seperated with a new line with 'O' representing
   * filled and 'X' representing blank tiles, ignoring case and trailing whitespace.
   * This method throws an InvalidGramError if the Gram is not square or there is an
   * error parsing a character.
   *
   * @param {string} str - string representation
   * @returns {ArrayGram}
   */
  static fromString(str: string): ArrayGram {
    const tiles = str
      .trim()
      .split("\n")
      .map((r) =>
        r
          .trim()
          .split("")
          .map((c) => tileFromChar(c))
      );
    return new ArrayGram(tiles);
  }

  /**
   * Returns a string representation of the Gram.
   *
   * Produces a string like:
   * ```
   * `XXO
   *  XOX
   *  OOX`
   * ```
   *
   * @returns {string}
   */
  toString(): string {
    return this.tiles
      .map((r) => r.map((t) => charFromTile(t)).join(""))
      .join("\n");
  }

  blocks() {
    return this.tiles
      .map((r) => r.map((t) => charFromTile(t)).join(""))
      .join("\n");
  }

  /**
   * Serialises into a short string and Base64 encodes a Gram.
   *
   * Serialisation is as follows:
   * ```
   * g      -> start of gram
   * r      -> start of row
   * b      -> start of blank block
   * f      -> start of filled block
   * <int>  -> number of tiles in block
   * ```
   *
   * Example:
   * ```
   * XXXXO
   * XXOOO
   * OOOOO
   * XXXXO
   * XXXXO
   *
   * grb4f1rb2f3rf5rb4f1rb4f1
   * ```
   *
   * @returns {string}
   */
  serialise(): string {
    const rows = this.tiles
      .map((r) =>
        rowToBlocks(r)
          .map((t) => serialiseBlock(t))
          .join("")
      )
      .join("r");

    const tileRows = this.tiles
      .map((r) => r.map((t) => serialiseTile(t)).join(""))
      .join("r");

      console.log( `gr${tileRows}`);


    return `gr${rows}`;
  }
}
