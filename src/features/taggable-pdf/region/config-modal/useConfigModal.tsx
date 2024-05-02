import { Region } from "@features/taggable-pdf/types/region";
import * as bulmaToast from "bulma-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTaggablePdfStore } from "../../taggablePdf.store";
import { ConfigFormFields } from "./config-form/configForm";

export default function useConfigModal(region: Region, onClose: () => void) {
  const formMethods = useForm<ConfigFormFields>({ defaultValues: region });
  const removeRegion = useTaggablePdfStore((x) => x.removeRegion);
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);

  const onDelete = () => {
    removeRegion(region);

    bulmaToast.toast({ message: "Region removed", type: "is-info", duration: 5000 });
    onClose();
  };

  const onSave: SubmitHandler<Region> = (data) => {
    updateRegion(region, JSON.parse(JSON.stringify(data)));

    bulmaToast.toast({ message: "Region updated", type: "is-success", duration: 5000 });
    onClose();
  };

  return {
    formMethods,
    onDelete,
    onSave
  };
}
