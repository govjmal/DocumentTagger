import * as bulmaToast from "bulma-toast";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTaggablePdfStore } from "../../taggablePdf.store";
import ConfigForm, { ConfigFormFields } from "./config-form/configForm";
import { Region } from "@features/taggable-pdf/types/region";

interface Props {
  region: Region;
  onClose: () => void;
}

export default function ConfigModal({ region, onClose }: Props) {
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

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <FormProvider {...formMethods}>
          <header className="modal-card-head is-shadowless has-background-black-bis">
            <p className="modal-card-title">{region.userFriendlyName ?? region.name}</p>
            <button className="delete" aria-label="close" onClick={onClose}></button>
          </header>
          <section className="modal-card-body has-background-black-bis">
            <ConfigForm />
          </section>
          <footer className="modal-card-foot has-background-black-bis is-justify-content-space-between">
            <div className="buttons">
              <button className="button is-danger" onClick={onDelete}>
                Delete
              </button>
            </div>
            <div className="buttons">
              <button className="button" onClick={onClose}>
                Cancel
              </button>
              <button className="button is-success" onClick={formMethods.handleSubmit(onSave)}>
                Save
              </button>
            </div>
          </footer>
        </FormProvider>
      </div>
    </div>
  );
}
