import { useState } from "react";
import NameInput from "./NameInput";

function App() {
  const [players, setPlayers] = useState([]);

  return (
    <div className="flex min-h-lvh min-w-[100vw] flex-col gap-4 border border-red-500 p-4">
      <header className="text-center text-2xl font-bold">GOLF SCORECARD</header>

      <button
        className="mr-auto"
        onClick={() => {
          setPlayers([...players, { name: "", score: 0, holes: [] }]);
        }}
      >
        Add Player
      </button>

      <div className="">
        {players.map((player, idx) => {
          return <NameInput key={idx} player={player} />;
        })}
      </div>
    </div>
  );
}

export default App;
