import { EventSuppressedDiv, TopRightPencilButton } from "@/components";
import { useState } from "react";
import { useTaggablePdfStore } from "../taggablePdf.store";
import { Region } from "../types/region";
import ConfigModal from "./config-modal/configModal";
import * as styles from "./region.styles";
import RightPanel from "./right-panel/rightPanel";
import TopPanel from "./top-panel/topPanel";
import { regionHasFullDetails } from "./helpers/regionValidator";

interface Props {
  region: Region;
}

export default ({ region }: Props) => {
  const { x, y, width, height } = region.location;
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);
  const [configModalVisible, setConfigModalVisible] = useState(false);

  return (
    <EventSuppressedDiv>
      <div
        onClick={() => updateRegion(region, { isActive: !region.isActive })}
        style={styles.outlineContainerStyles(x, y, width, height, region.isActive, regionHasFullDetails(region))}>
        {region.isActive && (
          <>
            <TopRightPencilButton onClick={() => setConfigModalVisible(true)} />
            <TopPanel {...region} colour="hsl(18, 100%, 29%)" />
            <div style={styles.rightPanelContainer(width)}>
              <RightPanel region={region} />
            </div>
          </>
        )}
      </div>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </EventSuppressedDiv>
  );
};
