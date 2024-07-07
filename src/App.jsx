import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import NameInput from "./NameInput";
import ScoreInput from "./ScoreInput";

function App() {
  const [players, setPlayers] = useState([]);
  const [isAddHole, setIsAddHole] = useState(true);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("golfData"));
    if (savedData) {
      // Parse the input date string to a Date object
      const inputDate = new Date(savedData.createdAt);
      // Get the current date
      const currentDate = new Date();
      // Calculate the difference in time (in milliseconds)
      const timeDifference = currentDate - inputDate;
      // Convert the time difference from milliseconds to days
      const differenceInDays = timeDifference / (1000 * 3600 * 24);
      // Check if the difference is greater than one day
      if (differenceInDays > 1) {
        localStorage.removeItem("golfData");
      } else {
        setPlayers([...savedData.players]);
      }
    }
  }, []);

  const ref = useRef();
  useEffect(() => {
    const width = ref.current.scrollWidth;
    ref.current.scrollTo({
      left: width,
      behavior: "smooth",
    });
  }, [isAddHole]);

  // Save data
  useEffect(() => {
    if (players.length) {
      localStorage.setItem(
        "golfData",
        JSON.stringify({ createdAt: new Date(), players }),
      );
    }
  }, [players]);

  const handleAddPlayer = () => {
    if (players.length == 10) return;
    if (!players.length) {
      setPlayers([
        ...players,
        { id: Date.now(), name: "", score: 0, holes: [0] },
      ]);
      return;
    }
    const holes = players?.[0].holes;
    setPlayers([
      ...players,
      { id: Date.now(), name: "", score: 0, holes: holes.map(() => 0) },
    ]);
  };

  const handleAddHole = () => {
    if (!players.length) return;
    if (players[0].holes?.length === 18) return;

    const newPlayers = players.map((player) => {
      player.holes.push(0);
      return player;
    });
    setPlayers([...newPlayers]);
    setIsAddHole(!isAddHole);
  };

  const highScore = players.reduce(
    (a, player) => (a > player.score ? a : player.score),
    0,
  );

  return (
    <div className="flex min-h-lvh min-w-[100vw] max-w-[100vw] flex-col gap-4 p-4">
      <header className="text-center text-2xl font-bold">GOLF SCORECARD</header>
      <div className="flex justify-between gap-4">
        <div className="flex gap-4">
          <button className="" onClick={handleAddPlayer}>
            Add Player
          </button>
          <button className="" onClick={handleAddHole}>
            Add Hole
          </button>
        </div>

        <div className="flex items-center gap-2">
          {isReset && (
            <div
              className="cursor-pointer rounded-full border px-2"
              onClick={() => setIsReset(false)}
            >
              X
            </div>
          )}
          <button
            className={classNames({ "bg-red-100": isReset })}
            onClick={() => {
              if (isReset) {
                if (players.length) {
                  setPlayers([]);
                  localStorage.removeItem("golfData");
                }
                setIsReset(false);
              } else {
                setIsReset(true);
              }
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div ref={ref} className="w-full overflow-auto">
        <div className="relative flex w-fit">
          <div
            className={classNames(
              "sticky left-0 z-10 w-28 min-w-28 bg-white text-center font-bold",
              { hidden: !players.length },
            )}
          >
            Player
          </div>
          {players?.[0]?.holes.map((hole, idx) => {
            return (
              <div key={idx} className="w-24 min-w-24 text-center font-bold">
                {idx + 1}
              </div>
            );
          })}
        </div>

        {players.map((player, playerIdx) => {
          return (
            <div className="relative flex w-fit" key={player.id}>
              <NameInput
                player={player}
                playerIdx={playerIdx}
                setPlayers={setPlayers}
                highScore={highScore}
              />
              <div className="flex">
                {player?.holes.map((hole, holeIdx) => {
                  return (
                    <ScoreInput
                      key={holeIdx}
                      playerIdx={playerIdx}
                      hole={hole}
                      holeIdx={holeIdx}
                      setPlayers={setPlayers}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
