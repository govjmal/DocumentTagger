import { useTaggablePdfStore } from "../../../../taggable-pdf/taggablePdf.store";
import * as bulmaToast from "bulma-toast";
import { FromConfiguration } from "../../../../taggable-pdf/util/importExport";

export default function ImportConfigButton() {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);

  const onImportConfig = () => {
    const config = window.prompt("Input your json");
    if (config == null) return;

    const regions = FromConfiguration(config);
    updateRegions(regions);

    bulmaToast.toast({ message: "Configuration imported", type: "is-success", duration: 5000 });
  };

  if (!pdfFile) return <></>;
  return (
    <li>
      <a>
        <div onClick={() => onImportConfig()}>Import config</div>
      </a>
    </li>
  );
}
