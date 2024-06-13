import { Modal } from "@/components";
import { Field, Region } from "@features/taggable-pdf/types/region";
import { FormProvider } from "react-hook-form";
import ConfigForm from "./config-form/configForm";
import useConfigModal from "./useFieldConfigModal";

interface Props {
  region: Region;
  field: Field;
  onClose: () => void;
}

export default function FieldConfigModal({ region, field, onClose }: Props) {
  const { formMethods, onDelete, onSave } = useConfigModal(region, field, onClose);

  return (
    <FormProvider {...formMethods}>
      <Modal
        title={(region.userFriendlyName ?? region.id) + " Value"}
        onSubmit={formMethods.handleSubmit(onSave)}
        onClose={onClose}
        additionalButtons={
          <button className="button is-danger" onClick={onDelete}>
            Delete
          </button>
        }>
        <ConfigForm />
      </Modal>
    </FormProvider>
  );
}
