import classNames from "classnames";
import { useState } from "react";

const ScoreInput = ({ hole }) => {
  const [score, setScore] = useState(hole);
  const [isEdit, setIsEdit] = useState(true);

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
        onChange={(e) => setScore(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsEdit(false);
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />

      <p
        className={classNames("w-full text-center", {
          hidden: isEdit,
        })}
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
