import React from "react";
import { Action } from "../../context/FilterContext";
import { MdCheck } from "react-icons/md";

const FilterListItem = ({
  selected,
  dispatch,
  actionKey,
  actionValue,
  label,
}: {
  selected: boolean;
  dispatch: React.Dispatch<Action>;
  actionKey: Action["payload"]["key"];
  actionValue: string;
  label: string;
}) => {
  const selectedStyle = selected
    ? "bg-surface-container-normal font-medium text-on-surface-heading-varient"
    : "";
  return (
    <li
      onClick={() => {
        if (selected) {
          dispatch({
            type: "remove",
            payload: { key: actionKey, value: actionValue },
          });
        } else {
          dispatch({
            type: "add",
            payload: { key: actionKey, value: actionValue },
          });
        }
      }}
      className={`${selectedStyle} px-2 font-body-s h-10 rounded-sm hover:bg-surface-container-normal cursor-pointer transition-colors flex items-center gap-2 justify-between`}
    >
      {label}
      {selected && <MdCheck size={18} />}
    </li>
  );
};

export default FilterListItem;
