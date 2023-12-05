import { taskTypes } from "../LeftSection/index.tsx";
import "../TabMobileView/style.css"
import React from "react";

interface IProps {
  handleSelect: (cardType: string) => void;
  selectedTab: string | undefined;
}
export default function TabMobileView(props: IProps) {
  const { handleSelect, selectedTab } = props;
  return (
    <div className="mobile-board">
      <div className="chips-main">
        <button className={taskTypes.todo === selectedTab ? "active-tab" : ''} onClick={() => handleSelect(taskTypes?.todo)}>To Do</button>
        <button className={taskTypes.inprogress === selectedTab ? "active-tab" : ''} onClick={() => handleSelect(taskTypes?.inprogress)}>In Progress</button>
        <button className={taskTypes.done === selectedTab ? "active-tab" : ''} onClick={() => handleSelect(taskTypes?.done)}>Done</button>
      </div>
    </div>
  )
}