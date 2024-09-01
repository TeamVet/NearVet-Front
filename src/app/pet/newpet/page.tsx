"use client";
import ReusableForm from "@/components/Form/FormCustom";
import Screen from "@/components/Screen";
import { SexType, Species, Races } from "@/lib/authService";
import { ErrorNotify } from "@/lib/toastyfy";
import { useEffect, useState } from "react";
import { InputsRegisterPet as originalInputsRegisterPet } from "@/components/Form/InputsForms";
import { FormNewPet } from "@/types/interfaces";
import { PetController } from "@/lib/authController";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import PATHROUTES from "@/helpers/path-routes";

const NewPetForm: React.FC = () => {
  const [formFields, setFormFields] = useState([...originalInputsRegisterPet]); // Copia del array de inputs
  const [loading, setLoading] = useState(true);
  const [especieSelect, setEspecieSelect] = useState("");
  const [especie, setEspecie] = useState<{ id: string; specie: string }[]>([]);
  const router = useRouter();
  const { user } = useUser();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesData = await Species(); // Obtener especies
        const sexData = await SexType(); // Obtener sexos
        setEspecie(speciesData);
        const updatedInputs = originalInputsRegisterPet.map((input) => {
          if (input.name === "specieId") {
            return { ...input, options: speciesData };
          }
          if (input.name === "sexId") {
            return { ...input, options: sexData };
          }
          return input;
        });
        setFormFields(updatedInputs);
      } catch (error: any) {
        ErrorNotify(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // UseEffect para cargar las razas según la especie seleccionada
  useEffect(() => {
    if (!especieSelect) return; // No hacer nada si no hay una especie seleccionada
    const fetchRaces = async () => {
      try {
        const raceData = await Races(especieSelect); // Obtener razas
        const updatedInputs = formFields.map((input) => {
          if (input.name === "raceId") {
            return { ...input, options: raceData };
          }
          return input;
        });
        setFormFields(updatedInputs);
      } catch (error: any) {
        ErrorNotify(`Error: ${error.message}`);
      }
    };

    fetchRaces();
  }, [especieSelect]);
  const handleSpeciesChange = (value: string) => {
    especie &&
      especie.map((specie) => {
        if (specie.id === value) {
          setEspecieSelect(specie.specie);
        }
      });
  };
  const handleSubmit = async (values: FormNewPet) => {
    const response = await PetController(
      values,
      user?.id as string,
      user?.token as string
    );
    if (response) {
      router.push(PATHROUTES.PET);
      return response;
    }
  };

  if (loading) {
    return (
      <Screen>
        <div className="dark:bg-darkBG dark:border-darkBorders p-5 rounded-lg text-center">
          Cargando datos de especies, razas y sexos...
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <ReusableForm
        formTitle="Registro de Mascota"
        inputs={formFields}
        onInputChange={handleSpeciesChange}
        onSubmit={handleSubmit}
        submitButtonLabel="Registrar Mascota"
      />
    </Screen>
  );
};

export default NewPetForm;
