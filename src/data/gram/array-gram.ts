import { InvalidGramError } from "./errors";

type TileType = "filled" | "blank";

/**
 * Represents a single tile in a Gram
 */
export interface Tile {
  id: string;
  type: TileType;
}

/**
 * Creates a Tile from a string containing a single character.
 *
 * Throws an InvalidGramError if passed an invalid string.
 *
 * @param {string} char - 'O' for filled or 'X' for blank, ingores case
 * @returns {Tile}
 */
function tileFromChar(id: string, char: string): Tile {
  // Check if char is a single character
  if (char.length !== 1) {
    throw new InvalidGramError(
      `Error parsing char, expected a length of 1, received ${char.length}.`
    );
  }

  // Allows us to ignore case
  char.toUpperCase();

  switch (char) {
    case "O":
      return { id: id, type: "filled" };
    case "X":
      return { id: id, type: "blank" };
    default:
      throw new InvalidGramError(
        `Error parsing char, expected either 'O' for filled or 'X' for blank, received '${char}'.`
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

export interface Block {
  id: string;
  type: TileType;
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

/**
 * Deserialises a Block.
 *
 * @param {string} str
 * @returns {Block}
 */
function deserialiseBlock(id: string, str: string): Block {
  const blockSize = 2;
  if (str.length !== blockSize) {
    throw new InvalidGramError(
      `Error deserialising Block, expected block to have a length of ${blockSize}, received '${str.length}'.`
    );
  }

  let type: TileType;
  switch (str[0]) {
    case "b":
      type = "blank";
      break;
    case "f":
      type = "filled";
      break;
    default:
      throw new InvalidGramError(
        `Error deserialising Block, expected either 'f' for filled or 'bchar' for blank, received '${str[0]}'.`
      );
  }

  const length = Number(str[1]);
  if (Number.isNaN(length)) {
    new InvalidGramError(
      `Error deserialising Block, expected a number, received '${str[1]}'.`
    );
  }

  return { id, type, length };
}

function tileArrayToBlockArray(id: string, row: Tile[]): Block[] {
  let bid = 1;
  let block: Block | undefined = undefined;
  // eslint-disable-next-line prefer-const
  let blocks: Block[] = [];

  row.forEach((t) => {
    if (!block) {
      // If block is undefined create a new block with type of first tile
      block = { id: `${id}xb${bid}`, type: t.type, length: 1 };
      bid += 1;
    } else if (t.type !== block.type) {
      // If the tile type is different to the finished block push the current block and create a new one
      blocks.push(block);
      block = { id: `${id}xb${bid}`, type: t.type, length: 1 };
      bid += 1;
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
 *
 * Has a functional api with functions that modify the gram return a new instance.
 */
export class ArrayGram {
  readonly size: number;
  private tiles: Tile[][];

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
    const side = [...Array(size).keys()];

    const tiles = side.map((i) =>
      side.map((j) => ({
        id: `r${i + 1}xc${j + 1}`,
        type: "blank" as TileType,
      }))
    );

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
      .map((r, i) =>
        r
          .trim()
          .split("")
          .map((c, j) => tileFromChar(`r${i + 1}xc${j + 1}`, c))
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

  /**
   * Serialises into a short string encoding of a Gram.
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
    const rows = this.rowBlocks()
      .map((r) => r.map((b) => serialiseBlock(b)).join(""))
      .join("r");

    return `gr${rows}`;
  }

  /**
   * Deserialises from the short string encoding generated by `serialise`.
   *
   * See `ArrayGram.serialise` for encoding description. Throws an InvalidGramError if deserialisation fails.
   * ```
   *
   * @returns {string}
   */
  static deserialise(str: string): ArrayGram {
    // Trim and make lowercase so we don't have to worry about trailing spaces or case sensitivity.
    str = str.trim().toLowerCase();

    if (str[0] !== "g") {
      throw new InvalidGramError(
        `Error deserialising Gram. Expected string to start with 'g', found '${str[0]}'.`
      );
    }

    // TODO document this generator, it's a mess. "There's got to be a better way!" - me hitting myself over the head slapstick style with a big foam function*
    function* parseRow(rowId: number, r: string) {
      let blockId = 1;
      let tileId = 1;

      const windowSize = 2;
      // Loop over windows of 2, each block should be a pair of characters
      let wi = 0;
      while (true) {
        const blockWindow = r.slice(wi, wi + windowSize);
        try {
          const block = deserialiseBlock(`r${rowId}b${blockId}`, blockWindow);
          for (let ti = 0; ti < block.length; ti += 1) {
            const tile: Tile = { id: `r${rowId}xc${tileId}`, type: block.type };
            if (wi + windowSize < r.length || ti + 1 < block.length) {
              yield tile;
              tileId += 1;
            } else {
              yield tile;
              return tile;
            }
          }
          blockId += 1;
          wi += windowSize;
        } catch (error) {
          if (error instanceof InvalidGramError)
            throw new InvalidGramError(
              `Error deserialising Gram at ${wi}. ${error.message}`
            );
        }
      }
    }
    const rows = str
      .slice(1)
      .split("r")
      .filter((r) => r.length !== 0);
    const tiles = rows.map((r, i) => [...parseRow(i + 1, r)]);

    return new ArrayGram(tiles);
  }

  /**
   * Returns the rows as a "2d" array of Tiles.
   * @returns {Tile[][]}
   */
  rows(): Tile[][] {
    return this.tiles;
  }

  /**
   * Returns the columns as a "2d" array of Tiles.
   * @returns {Tile[][]}
   */
  cols(): Tile[][] {
    return this.tiles.map((r, i) => {
      return r.map((_, j) => {
        return this.tiles[j][i];
      });
    });
  }

  /**
   * Returns the rows as a "2d" array of Blocks of ajoining filled and blank tiles.
   * @returns {Block[][]}
   */
  rowBlocks(): Block[][] {
    return this.rows().map((r, i) => tileArrayToBlockArray(`r${i + 1}`, r));
  }

  /**
   * Returns the columns as a "2d" array of Blocks of ajoining filled and blank tiles.
   * @returns {Block[][]}
   */
  colBlocks(): Block[][] {
    return this.cols().map((r, i) => tileArrayToBlockArray(`c${i + 1}`, r));
  }

  /**
   * Returns a new Gram with the tile at coordinates {x, y} toggled from blank to filled or back again.
   * @returns {ArrayGram}
   */
  toggleTile(coords: { x: number; y: number }): ArrayGram {
    const { x, y } = coords;
    // eslint-disable-next-line prefer-const
    let tiles = this.rows().map((r) => r.map((t) => ({ ...t })));
    const tile = tiles[y][x];

    tiles[y][x] = { ...tile, type: tile.type === "blank" ? "filled" : "blank" };

    return new ArrayGram(tiles);
  }
}
