import { useFormContext } from "react-hook-form";
import { Region } from "../../../types/region";
import { Input } from "../../../../../components";

export type ConfigFormFields = Region;

export default function ConfigForm() {
  const { register } = useFormContext<ConfigFormFields>();
  return (
    <div>
      <h5 className="subtitle is-5">Meta</h5>
      <Input type="text" label="Friendly name" placeholder="Field Name" register={() => register("userFriendlyName")} />
      <Input type="text" label="Id" placeholder="field_name" register={() => register("id")} />
      <Input type="text" label="Text to match" placeholder="Text in region" register={() => register("keywords")} />

      <h5 className="subtitle is-5">Location</h5>
      <Input type="number" label="X" register={() => register("location.x", { valueAsNumber: true })} />
      <Input type="number" label="Y" register={() => register("location.y", { valueAsNumber: true })} />
      <Input type="number" label="Width" register={() => register("location.width", { valueAsNumber: true })} />
      <Input type="number" label="Height" register={() => register("location.height", { valueAsNumber: true })} />
      <Input type="number" label="Page" register={() => register("location.pageNumber", { valueAsNumber: true })} />
    </div>
  );
}
