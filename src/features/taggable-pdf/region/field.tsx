import { useState } from "react";
import { Field, Region } from "../types/region";
import ConfigModal from "./config-modal/configModal";
import * as styles from "./field.styles";
import TopPanel from "./top-panel/topPanel";
import { useTaggablePdfStore } from "../taggablePdf.store";

interface Props {
  region: Region;
  field: Field;
}

export default ({ region, field }: Props) => {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);
  const { x, y, width, height } = field.location;
  const [configModalVisible, setConfigModalVisible] = useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    setConfigModalVisible(true);
  };

  const showDetails = region.isActive || configModalVisible;
  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}>
      <div
        onClick={onClick}
        onMouseOver={() => {
          region.isActive = true;
          updateRegions([...regions]);
        }}
        onMouseLeave={() => {
          region.isActive = false;
          updateRegions([...regions]);
        }}
        style={styles.outlineContainerStyles(x, y, width, height, showDetails)}>
        {showDetails && (
          <>
            <TopPanel {...field} colour="hsl(233, 100%, 29%)" />
          </>
        )}
      </div>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </div>
  );
};
