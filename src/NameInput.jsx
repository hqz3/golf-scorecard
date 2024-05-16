import classNames from "classnames";
import { useMemo, useState } from "react";

const NameInput = ({ player }) => {
  const [name, setName] = useState(player?.name || "");
  const [isEdit, setIsEdit] = useState(true);

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
      className="sticky left-0 z-10 flex w-24 min-w-24 gap-2 border bg-white p-4"
      onClick={() => {
        if (name.length) {
          setIsEdit(false);
        }
      }}
    >
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
        className={classNames("w-full overflow-hidden text-ellipsis", {
          hidden: isEdit,
        })}
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
