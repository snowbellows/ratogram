import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Gram, GTile } from "./data";

function App() {
  const [gram, setGram] = useState(Gram.newBlank(5));

  const updateGramWithTile = ({
    x,
    y,
    type,
  }: {
    x: number;
    y: number;
    type: GTile["type"];
  }) => {
    // TODO update Gram with Tile
    let tiles = [...gram.tiles];
    const tile = tiles[x][y];

    tiles[x][y] = { ...tile, type };

    const newGram = new Gram(tiles);

    history.pushState({}, "", `?g=${newGram.serialise()}`);

    setGram(newGram);
  };

  return (
    <>
      <div className="board">
        <div className="row-key">
          {gram.row_blocks().map((r) => (
            <div className="brow" key={`${r.map((b) => b.id).join("-")}`}>
              {}
            </div>
          ))}
        </div>
        <div className="gram">
          {gram.rows().map((r, i) => (
            <div className="grow" key={`${r.map((b) => b.id).join("-")}`}>
              {r.map((t, j) => (
                <button
                  onClick={() =>
                    updateGramWithTile({
                      x: i,
                      y: j,
                      type: t.type === "filled" ? "blank" : "filled",
                    })
                  }
                  className={`tile${t.type === "filled" ? " filled" : ""}`}
                  key={t.id}
                ></button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
