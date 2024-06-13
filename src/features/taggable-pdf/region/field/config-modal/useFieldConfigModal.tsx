import { Field, Region } from "@features/taggable-pdf/types/region";
import * as bulmaToast from "bulma-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTaggablePdfStore } from "../../../taggablePdf.store";
import { FieldConfigFormFields } from "./config-form/configForm";

export default function useConfigModal(region: Region, field: Field, onClose: () => void) {
  const formMethods = useForm<FieldConfigFormFields>({ defaultValues: field });
  const updateRegion = useTaggablePdfStore((x) => x.updateRegion);

  const onDelete = () => {
    updateRegion(region, { ...region, fields: [] });

    bulmaToast.toast({ message: "Field removed", type: "is-info", duration: 5000 });
    onClose();
  };

  const onSave: SubmitHandler<Field> = (data) => {
    updateRegion(region, { ...region, fields: [JSON.parse(JSON.stringify(data))] });

    bulmaToast.toast({ message: "Field updated", type: "is-success", duration: 5000 });
    onClose();
  };

  return {
    formMethods,
    onDelete,
    onSave
  };
}
