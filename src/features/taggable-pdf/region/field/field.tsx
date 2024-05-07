import { EventSuppressedDiv, PencilEditButton } from "@/components";
import { useState } from "react";
import { Field, Region } from "../../types/region";
import ConfigModal from "../config-modal/configModal";
import MoveableResizable from "../moveable-resizable/moveableResizable";
import TopPanel from "../top-panel/topPanel";
import * as styles from "./field.styles";

interface Props {
  region: Region;
  field: Field;
}

export default ({ region, field }: Props) => {
  const { x, y, width, height } = field.location;
  const [configModalVisible, setConfigModalVisible] = useState(false);

  return (
    <EventSuppressedDiv allowMouseMove allowMouseUp>
      <MoveableResizable
        region={region}
        field={field}
        style={styles.outlineContainerStyles(x, y, width, height, region, field)}>
        {region.isActive && (
          <>
            <TopPanel
              {...field}
              colour="hsl(203, 100%, 39%)"
              actionsComponent={<PencilEditButton onClick={() => setConfigModalVisible(true)} />}
            />
          </>
        )}
      </MoveableResizable>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </EventSuppressedDiv>
  );
};
