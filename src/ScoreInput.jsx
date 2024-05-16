import classNames from "classnames";
import { useEffect, useState } from "react";

const ScoreInput = ({ playerIdx, hole, holeIdx, setPlayers }) => {
  const [score, setScore] = useState(hole);
  const [isEdit, setIsEdit] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isTouched === false && score === 0) return;

    let timer = setTimeout(() => {
      setIsEdit(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [score]);

  const handleChange = (e, newScore) => {
    e.stopPropagation();
    if (newScore < 0) return;

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
      className="flex w-24 min-w-24 items-center border p-2"
      onClick={() => {
        setIsEdit(false);
      }}
    >
      <div
        className={classNames("flex w-full items-center justify-center", {
          hidden: !isEdit,
        })}
      >
        <div
          className="cursor-pointer px-2 outline outline-1 outline-gray-400 hover:bg-blue-50 active:scale-[.98]"
          onClick={(e) => handleChange(e, score - 1)}
        >
          -
        </div>
        <p className={classNames("w-full text-center", { hidden: !isEdit })}>
          {score}
        </p>
        <div
          className="cursor-pointer px-2 outline outline-1 outline-gray-400 hover:bg-blue-50 active:scale-[.98]"
          onClick={(e) => handleChange(e, score + 1)}
        >
          +
        </div>
      </div>

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
