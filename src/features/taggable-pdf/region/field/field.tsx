import { EventSuppressedDiv, PencilEditButton } from "@/components";
import { useState } from "react";
import { Field, Region } from "../../types/region";
import MoveableResizable from "../moveable-resizable/moveableResizable";
import TopPanel from "../top-panel/topPanel";
import FieldConfigModal from "./config-modal/fieldConfigModal";
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
              userFriendlyName={region.userFriendlyName + " Value"}
              colour="hsl(203, 100%, 39%)"
              actionsComponent={<PencilEditButton onClick={() => setConfigModalVisible(true)} />}
            />
          </>
        )}
      </MoveableResizable>
      {configModalVisible && (
        <FieldConfigModal region={region} field={field} onClose={() => setConfigModalVisible(false)} />
      )}
    </EventSuppressedDiv>
  );
};
