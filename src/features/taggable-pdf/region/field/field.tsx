import { EventSuppressedDiv, TopRightPencilButton } from "@/components";
import { useState } from "react";
import { useTaggablePdfStore } from "../../taggablePdf.store";
import { Field, Region } from "../../types/region";
import ConfigModal from "../config-modal/configModal";
import TopPanel from "../top-panel/topPanel";
import * as styles from "./field.styles";
import { fieldHasFullDetails } from "../helpers/regionValidator";

interface Props {
  region: Region;
  field: Field;
}

export default ({ region, field }: Props) => {
  const { x, y, width, height } = field.location;
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);
  const [configModalVisible, setConfigModalVisible] = useState(false);

  return (
    <EventSuppressedDiv>
      <div
        onClick={() => updateRegion(region, { isActive: !region.isActive })}
        style={styles.outlineContainerStyles(x, y, width, height, region.isActive, fieldHasFullDetails(field))}>
        {region.isActive && (
          <>
            <TopRightPencilButton onClick={() => setConfigModalVisible(true)} />
            <TopPanel {...field} colour="hsl(233, 100%, 29%)" />
          </>
        )}
      </div>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </EventSuppressedDiv>
  );
};
