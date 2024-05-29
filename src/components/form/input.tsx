import * as React from "react";
import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn, useFormContext } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi2";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends UseFormRegisterReturn<any> {
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  description?: string;
  type: HTMLInputTypeAttribute;
}

export default React.forwardRef((props: Props, ref) => {
  const { label, placeholder, icon, type, description } = props;
  const formContext = useFormContext();
  const fieldState = formContext.getFieldState(props.name);
  formContext.watch(props.name);

  return (
    <div className="field is-horizontal">
      <div className="field-label is-normal is-flex is-flex-direction-row is-justify-content-end">
        <label className="label">{label}</label>
        {!!description && (
          <span className="icon pl-1" style={{ cursor: "pointer" }} title={description}>
            <HiInformationCircle />
          </span>
        )}
      </div>
      {!!icon && <span className="icon">{icon}</span>}
      <div className="field-body is-flex-grow-2">
        <div className="field">
          <p className="control">
            <input
              ref={ref}
              type={type}
              className={`input is-${fieldState.error ? "danger" : "normal"}`}
              placeholder={placeholder}
              {...props}
            />
          </p>
        </div>
      </div>
    </div>
  );
});
