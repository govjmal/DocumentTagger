import SideMenu from "../../features/side-menu/sideMenu";
import TaggablePdf from "../../features/taggable-pdf/taggablePdf";

export default function Tagger() {
  return (
    <div className="columns is-desktop">
      <div className="column is-2">
        <SideMenu />
      </div>
      <div className="column">
        <TaggablePdf />
      </div>
    </div>
  );
}
