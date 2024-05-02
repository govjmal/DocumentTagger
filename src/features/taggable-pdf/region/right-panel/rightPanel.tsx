import { FaPlus } from "react-icons/fa6";
import { Region } from "../../types/region";
import * as styles from "./rightPanel.styles";
import { useTaggablePdfStore } from "../../taggablePdf.store";

export default function RightPanel({ region }: { region: Region }) {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);
  const { height } = region.location;
  const fields = region.fields;

  const onAddField = () => {
    region.fields.push({
      userFriendlyName: `Region ${regions.length + 1} value`,
      id: `page_${region.location.pageNumber}_region_${regions.length + 1}_field_${fields.length + 1}`,
      location: { ...region.location, x: region.location.x + region.location.width + 10 }
    });

    updateRegion(region, { fields: region.fields });
  };

  if (fields.length) return <></>;
  return (
    <div style={styles.container(height)} onClick={(e) => e.stopPropagation()}>
      <div style={styles.addFieldButton} onClick={onAddField}>
        <span className="icon">
          <FaPlus />
        </span>
        Add field
      </div>
    </div>
  );
}
