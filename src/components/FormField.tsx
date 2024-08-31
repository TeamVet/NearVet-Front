import React from "react";
import { Field } from "formik";
import { FormNewPet, NewPetField } from "@/types/interfaces";

interface FormFieldProps {
  field: NewPetField;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onSpecieChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: FormNewPet;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  setFieldValue,
  onSpecieChange,
  onInputChange,
  formValues,
}) => {
  const handleSpecieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specieId = e.target.value;
    setFieldValue(field.name, specieId);
    if (onSpecieChange) onSpecieChange(e);
  };

  return (
    <div className="form-group flex flex-col">
      <label htmlFor={field.name} className="text-detail font-semibold">
        {field.label}
      </label>
      {field.as === "select" ? (
        <Field
          as="select"
          name={field.name}
          className="form-control w-full bg-transparent border-[.2em] border-gray-600 text-black font-semibold placeholder:text-gray-600 p-1 rounded-md text-center"
          onChange={
            field.name === "specieId" ? handleSpecieChange : onInputChange
          }
          value={formValues[field.name] || ""}
        >
          {field.options?.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={field.type}
          name={field.name}
          value={formValues[field.name] || ""}
          onChange={onInputChange}
          placeholder={field.placeholder}
          className="form-control w-full bg-transparent border-[.2em] border-gray-600 text-black font-semibold placeholder:text-gray-600 p-1 rounded-md text-center"
        />
      )}
    </div>
  );
};

export default FormField;
