import { Input } from "@/components";
import { Field } from "@/features/taggable-pdf/types/region";
import { useFormContext } from "react-hook-form";

export type FieldConfigFormFields = Field;

export default function ConfigForm() {
  const { register } = useFormContext<FieldConfigFormFields>();

  return (
    <div>
      <h5 className="subtitle is-5 pt-5">Location</h5>
      <Input type="number" label="X" {...register("location.x", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Y" {...register("location.y", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Width" {...register("location.width", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Height" {...register("location.height", { valueAsNumber: true, required: true })} />
    </div>
  );
}
