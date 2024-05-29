import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { HiInformationCircle } from "react-icons/hi2";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props extends UseFormRegisterReturn<any> {
  label: string;
  description?: string;
}

export default React.forwardRef((props: Props, ref) => {
  const { label, description } = props;

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
      <div className="field-body is-flex-grow-2">
        <div className="field is-centered">
          <p className="control is-centered">
            <label className="checkbox pt-2">
              <input ref={ref} type="checkbox" {...props} />
            </label>
          </p>
        </div>
      </div>
    </div>
  );
});
