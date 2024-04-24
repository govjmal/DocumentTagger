import { useState } from "react";
import GeneralSettings from "./general-settings/generalSettings";

export default function SideMenu() {
  const [selectedTab, setSelectedTab] = useState<"general" | "tags">("general");

  return (
    <aside className="menu p-3">
      <div className="tabs">
        <ul>
          <li className={selectedTab == "general" ? "is-active" : ""}>
            <a onClick={() => setSelectedTab("general")}>General</a>
          </li>
          <li className={selectedTab == "tags" ? "is-active" : ""}>
            <a onClick={() => setSelectedTab("tags")}>Tags</a>
          </li>
        </ul>
      </div>
      {selectedTab == "general" && <GeneralSettings />}
    </aside>
  );
}
