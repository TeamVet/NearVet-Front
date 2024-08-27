"use client";

import AuthForm from "@/components/AuthForm";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { SpeciesAndRace, SexType } from "@/lib/authService";
import { newPetFields } from "@/lib/FormsFields";
import { FormNewPet, InputField } from "@/types/interfaces";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const NewPet: React.FC = () => {
  const { newPet, user } = useUser();
  const [especies, setEspecies] = useState<string[]>([]);
  const [razas, setRazas] = useState<string[]>([]);
  const [sexos, setSexos] = useState<string[]>([]);
  const [fields, setFields] = useState<InputField[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const speciesData = await SpeciesAndRace();
          const sexData = await SexType();

          const speciesNames = speciesData.map((specie: any) => specie.specie);
          setEspecies(speciesNames);
          setSexos(sexData);

          const initialFields: InputField[] = [
            {
              name: "specieId",
              type: undefined,
              as: "select",
              option: speciesNames,
              placeholder: "Especie",
              label: "Especie",
              validation: Yup.string().required("La especie es necesaria."),
            },
            {
              name: "raceId",
              type: undefined,
              as: "select",
              option: razas,
              placeholder: "Raza",
              label: "Raza",
              validation: Yup.string().required("La raza es necesaria."),
            },
            {
              name: "sexId",
              type: undefined,
              as: "select",
              option: sexos,
              placeholder: "Sexo",
              label: "Sexo",
              validation: Yup.string().required("El sexo es necesario."),
            },
          ];

          setFields(initialFields);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };

      fetchData();
    }
  }, [user]);

  const handleSpeciesChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const selectedSpecies = e.target.value;
    const speciesData: any = especies.find(
      (specie: any) => specie.specie === selectedSpecies
    );

    const selectedRaces =
      speciesData?.races.map((race: any) => race.race) || [];

    setRazas(selectedRaces);
    setFieldValue("specieId", selectedSpecies);
    setFieldValue("raceId", "");
  };

  return (
    <Screen>
      {fields.length > 0 && (
        <AuthForm<FormNewPet>
          title="Agregar una mascota"
          subtitle="Cuéntanos de tu mejor amigo..."
          buttonText="Agregar Mascota"
          linkText=""
          linkHref=""
          inputFields={fields}
          onSubmit={newPet}
          onFieldChange={(e, setFieldValue) => {
            if (e.target.name === "specieId") {
              handleSpeciesChange(e, setFieldValue);
            }
          }}
        />
      )}
    </Screen>
  );
};

export default NewPet;
