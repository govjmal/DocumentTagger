import { Modal } from "@/components";
import { Region } from "@features/taggable-pdf/types/region";
import { FormProvider } from "react-hook-form";
import ConfigForm from "./config-form/configForm";
import useConfigModal from "./useConfigModal";

interface Props {
  region: Region;
  onClose: () => void;
}

export default function ConfigModal({ region, onClose }: Props) {
  const { formMethods, onDelete, onSave } = useConfigModal(region, onClose);

  return (
    <FormProvider {...formMethods}>
      <Modal
        title={region.userFriendlyName ?? region.id}
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
