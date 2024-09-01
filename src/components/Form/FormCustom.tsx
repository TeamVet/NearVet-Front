import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from "@/types/interfaces";

interface ReusableFormProps {
  formTitle: string;
  inputs: InputField[];
  onSubmit: (values: any) => void;
  onInputChange?: (value: string) => void;
  submitButtonLabel: string;
}

const ReusableForm: React.FC<ReusableFormProps> = ({
  formTitle,
  inputs,
  onSubmit,
  onInputChange,
  submitButtonLabel,
}) => {
  const initialValues = inputs.reduce((acc, input) => {
    acc[input.name] = input.initialValue || "";
    return acc;
  }, {} as Record<string, any>);

  const validationSchema = Yup.object().shape(
    inputs.reduce((acc, input) => {
      if (input.validation) {
        acc[input.name] = input.validation;
      }
      return acc;
    }, {} as Record<string, Yup.AnySchema>)
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="dark:bg-darkBG  md:w-3/4 flex flex-col items-center justify-center p-5 md:p-10 gap-5  text-sm mx-auto">
      <div className="text-detail w-full sm:text-xl md:text-4xl flex gap-2 justify-center">
        <img src="" alt="[logo]" />
        <span>NearVet</span>
      </div>
      <h2 className="sm:xl md:text-3xl text-lightHline dark:text-darkHline">
        {formTitle}
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="sm:w-[35vw] lg:w-[25vw] mx-auto flex flex-col text-[1em]"
      >
        {inputs.map((input) => (
          <div className="mb-4" key={input.name}>
            <label
              htmlFor={input.name}
              className="block text-sm font-semibold text-detail m-1"
            >
              {input.label}
            </label>

            {input.type === "select" && Array.isArray(input.options) ? (
              <select
                key={input.name}
                id={input.name}
                name={input.name}
                value={formik.values[input.name]}
                onChange={(e) => {
                  formik.setFieldValue(input.name, e.target.value);
                  onInputChange?.(e.target.value);
                }}
                onBlur={formik.handleBlur}
                className={`m-1 block w-full p-2 border ${
                  formik.touched[input.name] && formik.errors[input.name]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
              >
                <option label="Seleccione una opción" />
                {input.options.map((option) => (
                  <option
                    key={option.id}
                    value={option.id}
                    className="text-black"
                  >
                    {"specie" in option
                      ? option.specie
                      : "race" in option
                      ? option.race
                      : option.sex}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={input.name}
                id={input.name}
                name={input.name}
                type={input.type}
                placeholder={input.placeholder}
                value={formik.values[input.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={input.disable}
                className={`w-full bg-transparent border-[.2em] border-1 placeholder:text-gray-400 p-1 rounded-md text-center ${
                  formik.touched[input.name] && formik.errors[input.name]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
              />
            )}
            <div className="h-4 ">
              {formik.touched[input.name] &&
              typeof formik.errors[input.name] === "string" ? (
                <p className="mt-2 text-sm text-red-600">
                  {formik.errors[input.name]?.toString() || ""}
                </p>
              ) : null}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-detail px-5 py-2 m-auto rounded-lg text-lg text-white hover:scale-105"
        >
          {submitButtonLabel}
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;

// {
//   formik.touched[input.name] &&
//   typeof formik.errors[input.name] === "string" ? (
//     <p className="mt-2 text-sm text-red-600">
//       {formik.errors[input.name]?.toString() || ""}
//     </p>
//   ) : null;
// }
