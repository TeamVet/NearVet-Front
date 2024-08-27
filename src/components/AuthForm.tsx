import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ButtonCustom from "./ButtonCustom";
import GoogleButton from "./GoogleButton";
import Link from "next/link";
import { AuthFormProps } from "@/types/interfaces";

const AuthForm = <T,>({
  title,
  subtitle,
  linkText,
  linkHref,
  buttonText,
  onSubmit,
  inputFields,
  googleButtonText,
  onFieldChange,
}: AuthFormProps<T> & {
  onFieldChange?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => void;
}) => {
  const validationSchema = Yup.object().shape(
    inputFields.reduce((schema, field) => {
      schema[field.name] = field.validation;
      return schema;
    }, {} as Record<string, Yup.StringSchema>)
  );

  return (
    <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
      {title ? (
        <div className="text-detail w-full sm:text-xl md:text-4xl flex gap-2 justify-center">
          <img src="" alt="[logo]" />
          <span>NearVet</span>
        </div>
      ) : null}
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="sm:xl md:text-5xl text-lightHline dark:text-darkHline">
          {title}
        </h1>
        <p>
          {subtitle}{" "}
          <Link className="text-primary font-bold" href={linkHref}>
            {linkText}
          </Link>
        </p>
      </div>
      <Formik
        initialValues={inputFields.reduce((initialValues, field) => {
          initialValues[field.name] = field.initialValue || "";
          return initialValues;
        }, {} as Record<string, string>)}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            className="sm:w-[35vw] lg:w-[25vw] mx-auto flex flex-col text-[1em]"
            onSubmit={handleSubmit}
          >
            {inputFields.map((field) => (
              <div className="mb-3" key={field.name}>
                <label
                  className="text-detail font-semibold"
                  htmlFor={field.name}
                >
                  {field.label}
                </label>
                <Field
                  className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  as={field.as}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (field.as === "select" && onFieldChange) {
                      onFieldChange(e, setFieldValue);
                    }
                  }}
                >
                  {field.option &&
                    field.option.map((optionSelect) => (
                      <option key={optionSelect} value={optionSelect}>
                        {optionSelect}
                      </option>
                    ))}
                </Field>
                <div className="h-4">
                  <ErrorMessage
                    name={field.name}
                    component="div"
                    className="text-primary text-wrap"
                  />
                </div>
              </div>
            ))}
            <ButtonCustom text={buttonText} type="submit" />
          </Form>
        )}
      </Formik>
      {googleButtonText && (
        <>
          <span className="text-gray-400 font-bold">- OR -</span>
          <GoogleButton
            text={googleButtonText}
            onClick={() => console.log("Google sign-in clicked")}
            size="lg"
            color="blue-600"
            bgcolor="#f8f8f8"
          />
        </>
      )}
    </div>
  );
};

export default AuthForm;
