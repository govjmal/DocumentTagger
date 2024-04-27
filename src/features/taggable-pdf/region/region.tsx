import { useState } from "react";
import * as styles from "./region.styles";
import ConfigModal from "./config-modal/configModal";
import { Region } from "../types/region";

interface Props {
  region: Region;
}

export default ({ region }: Props) => {
  const { x, y, width, height, pageNumber } = region.location;
  const [isFocused, setIsFocused] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);

  const onClick = (e) => {
    e.stopPropagation();
    setConfigModalVisible(true);
  };

  return (
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}>
      <div
        onClick={onClick}
        onMouseOver={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        style={styles.outlineContainerStyles(x, y, width, height)}>
        {(isFocused || configModalVisible) && (
          <div style={styles.focusPanelStyles(width)}>
            <div style={styles.focusPanelRegionName}>{region.userFriendlyName}</div>
            <div
              style={
                styles.focusPanelRegionLocation
              }>{`X: ${x}, Y: ${y}, W: ${width}, H: ${height}, P: ${pageNumber}`}</div>
          </div>
        )}
      </div>
      {configModalVisible && <ConfigModal region={region} onClose={() => setConfigModalVisible(false)} />}
    </div>
  );
};
