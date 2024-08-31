import { Formik, Form } from "formik";
import FormField from "@/components/FormField";
import * as Yup from "yup";
import { newPetFields } from "@/lib/FormsFields";
import {
  SexoOption,
  EspecieOption,
  RazaOption,
  FormNewPet,
} from "@/types/interfaces";
import ButtonCustom from "./ButtonCustom";

const NewPetForm = ({
  especies,
  razas,
  sexos,
  formValues,
  onSpecieChange,
  onInputChange,
  onSubmite,
}: {
  especies: EspecieOption[];
  razas: RazaOption[];
  sexos: SexoOption[];
  formValues: FormNewPet;
  onSpecieChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmite: (values: FormNewPet) => void;
}) => {
  const validationSchema = Yup.object(
    newPetFields({ especies, razas, sexos }).reduce<
      Record<string, Yup.AnySchema>
    >((schema, field) => {
      schema[field.name] = field.validation;
      return schema;
    }, {})
  );

  return (
    <div className="dark:bg-darkBG md:3/4 flex flex-col items-center justify-center border border-1 riunded-md p-5 md:p-10 gap-5 sahdow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
      <div className="flex flex-col">
        <h2 className="text-lightHline dark:text-darkHline text-3xl">
          Agregar una nueva mascota
        </h2>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            onSubmite(values);
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form className="flex flex-col text-justify m-2 gap-2">
              {newPetFields({ especies, razas, sexos }).map((field, index) => (
                <FormField
                  key={index}
                  field={field}
                  setFieldValue={setFieldValue}
                  onSpecieChange={onSpecieChange}
                  onInputChange={onInputChange}
                  formValues={formValues}
                />
              ))}
              <ButtonCustom
                text="Agregar Mascota"
                type="submit"
                onClick={() => {
                  onSubmite(values);
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewPetForm;
