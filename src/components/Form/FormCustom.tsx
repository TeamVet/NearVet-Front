import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReusableFormProps } from "@/types/interfaces";
import Image from "next/image";
import useLoading from "@/hooks/LoadingHook";
import InputField from "./InputField";

const ReusableForm: React.FC<ReusableFormProps> = ({
  notLogo = false,
  displayRow = false,
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
  const { loading } = useLoading();

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
    <div className="dark:bg-darkBG w-full flex flex-col items-center justify-center p-5 gap-5 text-sm mx-auto">
      {notLogo ? null : (
        <div className="text-detail w-full sm:text-xl md:text-4xl flex gap-2 justify-center items-center">
          <Image src="/logo.svg" alt="Logo Nearvet" width={64} height={64} />{" "}
          NearVet
        </div>
      )}
      <h2 className="sm:text-xl md:text-3xl text-lightHline dark:text-darkHline">
        {formTitle}
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className={`w-full flex flex-col items-center text-[1em]`}
      >
        <div
          className={`${
            displayRow
              ? "flex flex-row flex-wrap gap-1 justify-center items-center"
              : "w-full md:w-2/3 lg:w-3/4"
          }`}
        >
          {inputs.map((input) => (
            <div
              className={` ${
                displayRow ? "w-full md:w-2/3 lg:w-1/5 p-2" : "w-full p-2"
              }`}
              key={input.name}
            >
              <label
                htmlFor={input.name}
                className="block text-sm font-semibold text-detail m-1"
              >
                {input.label}
              </label>

              <InputField
                input={input}
                formik={formik}
                onInputChange={onInputChange}
              />

              <div className="h-4 ">
                {formik.touched[input.name] && formik.errors[input.name] && (
                  <div className=" text-center bg-white">
                    <p className=" text-xs text-red-600">
                      {formik.errors[input.name]?.toString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-detail px-5 py-2 my-3 mx-auto rounded-lg text-lg text-white hover:scale-105 ${
            formik.isSubmitting || loading
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={formik.isSubmitting || loading}
        >
          {submitButtonLabel}
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;
