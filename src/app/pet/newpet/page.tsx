"use client";

import AuthForm from "@/components/AuthForm";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { newPetFields } from "@/lib/FormsFields";
import { FormNewPet } from "@/types/interfaces";

const NewPet: React.FC = () => {
  const { newPet } = useUser();
  return (
    <Screen>
      <AuthForm<FormNewPet>
        title="Agregar una mascota"
        subtitle="Cuéntanos de tu mejor amigo..."
        buttonText="Agregar Mascota"
        linkText=""
        linkHref=""
        inputFields={newPetFields}
        onSubmit={newPet}
      />
    </Screen>
  );
};

export default NewPet;
