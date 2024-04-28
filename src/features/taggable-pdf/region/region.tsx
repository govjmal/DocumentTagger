import { useState } from "react";
import * as styles from "./region.styles";
import ConfigModal from "./config-modal/configModal";
import { Region } from "../types/region";
import TopPanel from "./top-panel/topPanel";
import RightPanel from "./right-panel/rightPanel";
import { useTaggablePdfStore } from "../taggablePdf.store";

interface Props {
  region: Region;
}

export default ({ region }: Props) => {
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);
  const { x, y, width, height } = region.location;
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
            <TopPanel {...region} colour="hsl(18, 100%, 29%)" />
            <RightPanel region={region} />
          </>
        )}
      </div>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </div>
  );
};