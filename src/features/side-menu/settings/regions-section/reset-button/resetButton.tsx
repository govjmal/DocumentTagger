import * as bulmaToast from "bulma-toast";
import { useTaggablePdfStore } from "../../../../taggable-pdf/taggablePdf.store";

export default function ResetButton() {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);

  const onReset = () => {
    updateRegions([]);
    bulmaToast.toast({ message: "Configuration reset", type: "is-info", duration: 5000 });
  };

  if (!regions?.length) return <></>;
  return (
    <li>
      <a>
        <div onClick={() => onReset()}>Reset</div>
      </a>
    </li>
  );
}
