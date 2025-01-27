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

    tiles[x][y] = { type };
    const newGram = new Gram(tiles);

    history.pushState({}, "", `?g=${newGram.serialise()}`);

    setGram(newGram);
  };

  return (
    <>
      <div className="gram">
        {gram.rows().map((r, i) => (
          <div className="grow" key={`row${i}`}>
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
                key={`${i}${j}${t.type}`}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
