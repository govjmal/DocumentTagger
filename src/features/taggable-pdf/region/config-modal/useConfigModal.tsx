import { Region } from "@features/taggable-pdf/types/region";
import * as bulmaToast from "bulma-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTaggablePdfStore } from "../../taggablePdf.store";
import { ConfigFormFields } from "./config-form/configForm";

export default function useConfigModal(region: Region, onClose: () => void) {
  const formMethods = useForm<ConfigFormFields>({ defaultValues: region });
  const regions = useTaggablePdfStore((x) => x.regions);
  const updateRegions = useTaggablePdfStore((x) => x.updateRegions);

  const onDelete = () => {
    bulmaToast.toast({ message: "Region removed", type: "is-info", duration: 5000 });
    const updatedRegions = regions.filter((x) => x != region);
    updateRegions(updatedRegions);
    onClose();
  };

  const onSave: SubmitHandler<Region> = (data) => {
    const regionToUpdateIndex = regions.findIndex((x) => x == region);

    const newRegions = [...regions];
    newRegions.splice(regionToUpdateIndex, 1, JSON.parse(JSON.stringify(data)));
    updateRegions(newRegions);

    bulmaToast.toast({ message: "Region updated", type: "is-success", duration: 5000 });
    onClose();
  };

  return {
    formMethods,
    onDelete,
    onSave
  };
}
