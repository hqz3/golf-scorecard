import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";

const NameInput = ({ player, playerIdx, setPlayers, highScore }) => {
  const [name, setName] = useState(player?.name || "");
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    if (!name.length) {
      return;
    }

    let timer = setTimeout(() => {
      setIsEdit(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [name]);

  const abbreviated = useMemo(() => {
    if (name.length && !isEdit) {
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
  }, [name, isEdit]);

  return (
    <div
      className={classNames(
        "sticky left-0 z-10 flex w-28 min-w-28 gap-2 border bg-white p-4",
        { "border-yellow-400": player.score === highScore },
      )}
      onClick={() => {
        if (name.length) {
          setIsEdit(false);
        }
      }}
    >
      <div
        className={classNames(
          "cursor-pointer px-1 text-red-300 outline outline-1 outline-red-300 hover:bg-red-50 active:scale-[.98]",
          { hidden: !isEdit },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setPlayers((players) => {
            return players
              .slice(0, playerIdx)
              .concat(players.slice(playerIdx + 1));
          });
        }}
      >
        -
      </div>
      <input
        className={classNames("w-full", { hidden: !isEdit })}
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setIsEdit(false);
          }
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <p
        className={classNames(
          "w-full cursor-pointer overflow-hidden text-ellipsis hover:bg-blue-100",
          {
            hidden: isEdit,
          },
        )}
        onClick={(e) => {
          e.stopPropagation();
          setIsEdit(true);
        }}
      >
        {abbreviated}
      </p>
      <p>{player.score}</p>
    </div>
  );
};

export default NameInput;
