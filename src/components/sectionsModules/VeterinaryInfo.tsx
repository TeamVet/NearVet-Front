import Screen from "@/components/Screen";
import ReusableForm from "../Form/FormCustom";
import { InputsModifyVeterinaryShip } from "../Form/InputsForms";
import { use, useEffect, useState } from "react";
import useLoading from "@/hooks/LoadingHook";
import Loading from "../Loading";
import { Veterinaria } from "@/types/interfaces";
import { ModifyVetController } from "@/lib/Controllers/userController";
import { useUser } from "@/context/UserContext";

const VeterinaryInfo = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [vet, setVet] = useState<Veterinaria>({} as Veterinaria);
  const [idVet, setIdVet] = useState<string>("");
  const [formFields, setFormFields] = useState([...InputsModifyVeterinaryShip]);
  const { user } = useUser();

  useEffect(() => {
    const fetchActualData = async () => {
      try {
        startLoading();
        const responseAllVets = await fetch(
          `https://nearvet-latest.onrender.com/vets`
        );
        const response = await responseAllVets.json();
        let idVet = response[0].id;
        setIdVet(idVet);

        const responseVet = await fetch(
          `https://nearvet-latest.onrender.com/vets/${idVet}`
        );
        const data = await responseVet.json();

        setVet(data);
      } finally {
      }
    };
    fetchActualData();
  }, []);

  useEffect(() => {
    if (vet) {
      const updatedInputs = InputsModifyVeterinaryShip.map((input) => {
        return {
          ...input,
          initialValue: vet[input.name as keyof Veterinaria] || "",
        };
      });
      setFormFields(updatedInputs);
      setTimeout(() => stopLoading(), 2000);
    }
  }, [vet]);

  const handleSubmit = async (values: any) => {
    try {
      startLoading();
      if (!user) return;
      const modifyVet = await ModifyVetController(
        values,
        idVet as string,
        user.token as string
      );
      if (modifyVet.id) {
        setVet(modifyVet);
      }
    } finally {
      stopLoading();
    }
  };
  return (
    <Screen>
      {loading && <Loading />}
      <p className="text-xl text-detail font-semibold">
        Info de la veterinaria
      </p>
      {formFields && !loading && (
        <ReusableForm
          formTitle="Modificar informacion de la veterinaria"
          inputs={formFields}
          onSubmit={handleSubmit}
          submitButtonLabel="Modificar"
        />
      )}
    </Screen>
  );
};

export default VeterinaryInfo;
