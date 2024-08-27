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
  const [fiels, setFields] = useState<InputField[]>([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const speciesData = await SpeciesAndRace(user!.token);
          const sexData = await SexType(user!.token);

          // Extraer las especies
          const speciesNames = speciesData.map((specie: any) => specie.specie);
          setEspecies(speciesNames);

          // Settear los sexos
          setSexos(sexData);

          // Para la selección de especie
          if (newPetFields.length <= 2) {
            newPetFields.push(
              {
                name: "specieId",
                type: undefined,
                as: "select",
                option: speciesNames,
                placeholder: "Especie",
                label: "Especie",
                validation: Yup.string().required("La especie es necesaria."),
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedSpecies = e.target.value;
                  const selectedRaces =
                    speciesData
                      .find((specie: any) => specie.specie === selectedSpecies)
                      ?.races.map((race: any) => race.race) || [];
                  setRazas(selectedRaces);
                },
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
              }
            );
          }
          setFields(newPetFields);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };

      fetchData();
    }
  }, [user]);

  return (
    <Screen>
      <AuthForm<FormNewPet>
        title="Agregar una mascota"
        subtitle="Cuéntanos de tu mejor amigo..."
        buttonText="Agregar Mascota"
        linkText=""
        linkHref=""
        inputFields={fiels}
        onSubmit={newPet}
      />
    </Screen>
  );
};

export default NewPet;
