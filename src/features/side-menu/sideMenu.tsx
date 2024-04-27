import GeneralSection from "./settings/general-section/generalSection";
import ImportExportSection from "./settings/import-export-section/importExportSection";
import RegionsSection from "./settings/regions-section/regionsSection";

export default function SideMenu() {
  return (
    <aside className="menu p-3">
      <ul className="menu-list">
        <GeneralSection />
        <RegionsSection />
        <ImportExportSection />
      </ul>
    </aside>
  );
}
