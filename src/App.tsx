import { useMemo, useState } from "react";
import "./App.css";
import { Gram } from "./data";

function App() {
  const [gram, setGram] = useState(Gram.newBlank(15));

  const rowKeys = useMemo(
    () => gram.rowBlocks().map((r) => r.filter((b) => b.type === "filled")),
    [gram],
  );

  const updateGramWithTile = ({ x, y }: { x: number; y: number }) => {
    const newGram = gram.toggleTile({ x, y });

    history.pushState({}, "", `?g=${newGram.serialise()}`);

    setGram(newGram);
  };

  return (
    <>
      <div className="board">
        <div className="row-key">
          {rowKeys.map((r, i) => (
            <div
              className="krow"
              key={`krow${i}${r.map((b) => b.id).join("-")}`}
            >
              {r.map((b) => (
                <p className="rkey" key={b.id}>
                  {b.length}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="gram">
          {gram.rows().map((r, i) => (
            <div
              className="grow"
              key={`grow${i}${r.map((b) => b.id).join("-")}`}
            >
              {r.map((t, j) => (
                <button
                  onClick={() =>
                    updateGramWithTile({
                      x: j,
                      y: i,
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
