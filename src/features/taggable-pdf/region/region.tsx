import { EventSuppressedDiv, PencilEditButton } from "@/components";
import { useState } from "react";
import { Region } from "../types/region";
import ConfigModal from "./config-modal/configModal";
import MoveableResizable from "./moveable-resizable/moveableResizable";
import * as styles from "./region.styles";
import RightPanel from "./right-panel/rightPanel";
import TopPanel from "./top-panel/topPanel";

interface Props {
  region: Region;
}

export default ({ region }: Props) => {
  const { x, y, width, height } = region.location;

  const [configModalVisible, setConfigModalVisible] = useState(false);

  return (
    <EventSuppressedDiv allowMouseMove allowMouseUp>
      <MoveableResizable region={region} style={styles.outlineContainerStyles(x, y, width, height, region)}>
        {region.isActive && (
          <>
            <TopPanel
              {...region}
              colour="hsl(88, 100%, 29%)"
              actionsComponent={<PencilEditButton onClick={() => setConfigModalVisible(true)} />}
            />
            <div style={styles.rightPanelContainer(width)}>
              <RightPanel region={region} />
            </div>
          </>
        )}
      </MoveableResizable>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </EventSuppressedDiv>
  );
};
