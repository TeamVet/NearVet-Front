"use client";
import Screen from "@/components/Screen";
import { Species, SexType, Races } from "@/lib/authService";
import { FormNewPet } from "@/types/interfaces";
import { useEffect, useState } from "react";
import { PetController } from "@/lib/authController";
import { useRouter } from "next/navigation";
import PATHROUTES from "@/helpers/path-routes";
import { useUser } from "@/context/UserContext";
import NewPetForm from "@/components/PetForm";

const NewPet: React.FC = () => {
  const router = useRouter();
  const [especies, setEspecies] = useState<{ id: string; specie: string }[]>(
    []
  );
  const [razas, setRazas] = useState<{ id: string; race: string }[]>([
    { id: "2", race: "Caniche" },
  ]);
  const [sexos, setSexos] = useState<{ id: string; sex: string }[]>([]);
  const [formValues, setFormValues] = useState<FormNewPet>({
    name: "",
    startDate: new Date(),
    birthdate: new Date(),
    color: "",
    weightCurrent: 0,
    observation: "",
    userId: "",
    specieId: "",
    raceId: "",
    sexId: "",
  });
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Agregado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesData = await Species();
        setEspecies(speciesData);
        const sexData = await SexType();
        setSexos(sexData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRazas = async () => {
      if (formValues.specieId) {
        try {
          const selectedSpecie = especies.find(
            (specie) => specie.id === formValues.specieId
          );

          if (selectedSpecie) {
            const racesData = await Races(selectedSpecie.specie);
            setRazas(racesData);
          }
        } catch (error) {
          console.error("Error fetching races", error);
        }
      } else {
        setRazas([]); // Resetear las razas si no hay especie seleccionada
      }
    };
    fetchRazas();
  }, [formValues.specieId, especies]);

  const handleSpecieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSpecieId = e.target.value;
    setFormValues({ ...formValues, specieId: selectedSpecieId });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (values: FormNewPet) => {
    event?.preventDefault();
    const response = await PetController(
      formValues,
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
      <div className="dark:bg-darkBG dark:border-darkBorders">
        <NewPetForm
          especies={especies}
          razas={razas}
          sexos={sexos}
          onSpecieChange={handleSpecieChange}
          formValues={formValues}
          onInputChange={handleInputChange}
          onSubmite={handleSubmit}
        />
      </div>
    </Screen>
  );
};

export default NewPet;
