"use client"
import AuthForm from "@/components/AuthForm";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { newPetFields } from "@/lib/FormsFields";

const NewPet: React.FC = () => {
  const { loginContext } = useUser()
  return (<Screen>

    <AuthForm
      title="Agregar una mascota"
      subtitle="Cuentanos de tu mejor amigo..."
      buttonText="Agregar Mascota"
      linkText=""
      linkHref=""
      inputFields={newPetFields}
      onSubmit={loginContext}
    />
  </Screen>);
};

export default NewPet;
//name, birthdate, startDate, endDate, color string, sexo, raza, especie, usuario. 