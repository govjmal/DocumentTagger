import { useTaggablePdfStore } from "../../../taggable-pdf/taggablePdf.store";
import ResetButton from "./reset-button/resetButton";

export default function RegionsSection() {
  const regions = useTaggablePdfStore((x) => x.regions);

  if (!regions?.length) return <></>;
  return (
    <>
      <p className="menu-label">Regions</p>
      <ResetButton />
    </>
  );
}
