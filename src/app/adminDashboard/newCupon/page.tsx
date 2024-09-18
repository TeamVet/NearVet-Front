"use client";
import ReusableForm from "@/components/Form/FormCustom";
import { InputCupon } from "@/components/Form/InputsForms";
import Screen from "@/components/Screen";

const Page = () => {
  const handleSubmit = async (values: any) => {
    console.log(values);
  };
  return (
    <Screen>
      <ReusableForm
        formTitle="Crear nuevo cupon"
        inputs={InputCupon}
        onSubmit={handleSubmit}
        submitButtonLabel="Crear"
      />
    </Screen>
  );
};

export default Page;
