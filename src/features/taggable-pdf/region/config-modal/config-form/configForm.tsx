import { useFormContext } from "react-hook-form";
import { Region } from "../../../types/region";
import { Checkbox, Input } from "@/components";

export type ConfigFormFields = Region;

export default function ConfigForm() {
  const { register } = useFormContext<ConfigFormFields>();

  return (
    <div>
      <h5 className="subtitle is-5">Meta</h5>
      <Input type="text" label="Friendly name" placeholder="Field Name" {...register("userFriendlyName")} />
      <Input type="text" label="Id" placeholder="field_name" {...register("id", { required: true, minLength: 2 })} />

      <h5 className="subtitle is-5 pt-5">Matching</h5>
      <Input
        type="text"
        label="Text to match"
        placeholder="Keywords in region"
        description="The keywords you expect to find in this region."
        {...register("keywords", { required: true, minLength: 2 })}
      />
      <Input
        type="number"
        label="Occurence on page"
        placeholder="1"
        description="The expected occurrences of the keywords (as a full match) on the page"
        {...register("occurenceOnPage", { valueAsNumber: true, required: true, min: 1 })}
      />
      <Checkbox
        label="Match words in sentence"
        description="Whether the keywords in this region should match if part of a sentence, or only if standalone."
        {...register("matchInSentence")}
      />

      <h5 className="subtitle is-5 pt-5">Location</h5>
      <Input type="number" label="X" {...register("location.x", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Y" {...register("location.y", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Width" {...register("location.width", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Height" {...register("location.height", { valueAsNumber: true, required: true })} />
      <Input type="number" label="Page" {...register("location.pageNumber", { valueAsNumber: true, required: true })} />
    </div>
  );
}
