import { useTaggablePdfStore } from "../../../../taggable-pdf/taggablePdf.store";
import * as bulmaToast from "bulma-toast";
import { ToConfiguration } from "../../../../taggable-pdf/util/importExport";
import { regionAndFieldsHaveFullDetails } from "@/features/taggable-pdf/region/helpers/regionValidator";

export default function ExportConfigButton() {
  const pdfFile = useTaggablePdfStore((x) => x.pdfFile);
  const regions = useTaggablePdfStore((x) => x.regions);

  const onCopyToClipboard = () => {
    if (!regionAndFieldsHaveFullDetails(regions)) {
      bulmaToast.toast({
        message: "At least one region or field is not fully configured.",
        type: "is-danger",
        duration: 5000
      });
      return;
    }

    navigator.clipboard.writeText(JSON.stringify(ToConfiguration(regions)));
    bulmaToast.toast({ message: "Copied to clipboard", type: "is-success", duration: 5000 });
  };

  if (!pdfFile || !regions?.length) return <></>;
  return (
    <li>
      <a className="is-active">
        <div onClick={() => onCopyToClipboard()}>Export config</div>
      </a>
    </li>
  );
}
