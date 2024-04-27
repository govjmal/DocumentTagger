import { useFormContext } from "react-hook-form";
import { Region } from "../../../types/region";
import { Input } from "../../../../../components";

export type ConfigFormFields = Region;

export default function ConfigForm() {
  const { register } = useFormContext<ConfigFormFields>();
  return (
    <div>
      <h5 className="subtitle is-5">Meta</h5>
      <Input type="text" label="Friendly" register={() => register("userFriendlyName")} />
      <Input type="text" label="Name" register={() => register("name")} />

      <h5 className="subtitle is-5">Location</h5>
      <Input type="number" label="X" register={() => register("location.x", { valueAsNumber: true })} />
      <Input type="number" label="Y" register={() => register("location.y", { valueAsNumber: true })} />
      <Input type="number" label="Width" register={() => register("location.width", { valueAsNumber: true })} />
      <Input type="number" label="Height" register={() => register("location.height", { valueAsNumber: true })} />
      <Input type="number" label="Page" register={() => register("location.pageNumber", { valueAsNumber: true })} />
    </div>
  );
}
