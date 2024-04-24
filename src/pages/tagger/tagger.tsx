import { DndProvider } from "react-dnd";
import SideMenu from "../../features/side-menu/sideMenu";
import TaggablePdf from "../../features/taggable-pdf/taggablePdf";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Tagger() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="columns is-desktop">
        <div className="column is-2">
          <SideMenu />
        </div>
        <div className="column">
          <TaggablePdf />
        </div>
      </div>
    </DndProvider>
  );
}
