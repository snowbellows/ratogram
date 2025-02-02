export class InvalidGTileError extends Error {
  constructor(message: string) {
    super(`Invalid Gram Tile: ${message}`);
    this.name = "InvalidGTileError";
  }
}

export class InvalidGRowError extends Error {
  constructor(message: string) {
    super(`Invalid Gram Row: ${message}`);
    this.name = "InvalidGRowError";
  }
}

export class InvalidGramError extends Error {
  constructor(message: string) {
    super(`Invalid Gram: ${message}`);
    this.name = "InvalidGramError";
  }
}
