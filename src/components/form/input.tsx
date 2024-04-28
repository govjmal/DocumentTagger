import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type: HTMLInputTypeAttribute;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  register: () => UseFormRegisterReturn<any>;
}

export default function Input({ label, placeholder, icon, type, register }: Props) {
  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal">
        <label className="label">{label}</label>
      </div>
      {!!icon && <span className="icon">{icon}</span>}
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input type={type} className="input is-normal" placeholder={placeholder} {...register()} />
          </p>
        </div>
      </div>
    </div>
  );
}
