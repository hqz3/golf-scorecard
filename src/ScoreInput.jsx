import classNames from "classnames";
import { useEffect, useState } from "react";

const ScoreInput = ({ playerIdx, hole, holeIdx, setPlayers }) => {
  const [score, setScore] = useState(hole);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsEdit(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [score]);

  const handleChange = (e) => {
    const newScore = parseInt(e.currentTarget.value);
    setScore(newScore);
    setPlayers((players) => {
      players[playerIdx].holes[holeIdx] = newScore;
      const total = players[playerIdx].holes.reduce((a, b) => a + b, 0);
      players[playerIdx].score = total;
      return [...players];
    });
  };

  return (
    <div
      className="w-24 min-w-24 border p-4"
      onClick={() => {
        setIsEdit(false);
      }}
    >
      <input
        min={0}
        className={classNames("w-full", { hidden: !isEdit })}
        type="number"
        value={score}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsEdit(false);
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />

      <p
        className={classNames(
          "w-full cursor-pointer text-center hover:bg-blue-100",
          {
            hidden: isEdit,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsEdit(true);
        }}
      >
        {score}
      </p>
    </div>
  );
};

export default ScoreInput;
