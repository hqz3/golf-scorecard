import classNames from "classnames";
import { useMemo, useState } from "react";

const NameInput = ({ player }) => {
  const [name, setName] = useState(player?.name || "");
  const [showInput, setShowInput] = useState(true);

  const abbreviated = useMemo(() => {
    if (name.length && !showInput) {
      let string = "";
      const splitted = name.split(" ");

      if (splitted.length === 1) {
        return splitted[0];
      }

      for (let word of splitted) {
        const trimmed = word.trim();
        if (trimmed.length) {
          string += trimmed[0];
        }
      }

      return string;
    }
  }, [name, showInput]);

  return (
    <div
      className="flex w-24 gap-2 border p-4"
      onClick={(e) => {
        if (name.length) {
          setShowInput(false);
        }
      }}
    >
      <input
        className={classNames("w-full", { hidden: !showInput })}
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setShowInput(false);
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <p
        className={classNames("w-full overflow-hidden text-ellipsis", {
          hidden: showInput,
        })}
        onClick={(e) => {
          e.stopPropagation();
          setShowInput(true);
        }}
      >
        {abbreviated}
      </p>
      <p>{player.score}</p>
    </div>
  );
};

export default NameInput;
