"use client";

import ButtonCustom from "@/components/ButtonCustom";
import Screen from "@/components/Screen";
import { useUser } from "@/context/UserContext";
import { Species, SexType, Races } from "@/lib/authService";
import { FormNewPet } from "@/types/interfaces";
import { useEffect, useState } from "react";

const NewPet: React.FC = () => {
  const { newPet, user } = useUser();
  const [especies, setEspecies] = useState<{ id: string; specie: string }[]>(
    []
  );
  const [razas, setRazas] = useState<{ id: string; race: string }[]>([]);
  const [sexos, setSexos] = useState<{ id: number; sex: string }[]>([]);
  const [formValues, setFormValues] = useState<FormNewPet>({
    name: "",
    startDate: new Date(),
    birthdate: new Date(),
    color: "",
    weightCurrent: 0,
    observation: "",
    userId: user?.id || "",
    specieId: "",
    raceId: "",
    sexId: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speciesData = await Species();
        setEspecies(speciesData);
        const sexData = await SexType();
        setSexos(sexData);
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
    setFormValues({ ...formValues, specieId: selectedSpecieId, raceId: "" }); // Resetear la raza al cambiar de especie
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    formValues.sexId = Number(formValues.sexId);
    console.log(formValues);
    try {
      await newPet(formValues);
      // Manejar el éxito, por ejemplo, mostrar un mensaje de éxito o redirigir
    } catch (error) {
      console.error("Error al crear la mascota", error);
    }
  };

  return (
    <Screen>
      <div className="dark:bg-darkBG dark:border-darkBorders md:w-3/4 flex flex-col items-center justify-center border border-1 rounded-md p-5 md:p-10 gap-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-sm mx-auto">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-lightHline dark:text-darkHline text-3xl">
            Agrega una nueva mascota
          </h2>
          {especies.length > 1 && (
            <form
              onSubmit={handleSubmit}
              className="sm:w-[35vw] lg:w-[25vw] mx-auto flex flex-col text-[1em] m-2 gap-2"
            >
              <label htmlFor="name" className="text-detail font-semibold">
                Nombre
              </label>
              <input
                name="name"
                type="text"
                placeholder="Firulais"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="birthdate" className="text-detail font-semibold">
                Fecha de Nacimiento
              </label>
              <input
                name="birthdate"
                type="date"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                onChange={handleInputChange}
              />

              <label htmlFor="color" className="text-detail font-semibold">
                Color
              </label>
              <input
                name="color"
                type="text"
                placeholder="Blanco con manchas marrones"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.color}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="specieId" className="text-detail font-semibold">
                Especie
              </label>
              <select
                name="specieId"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.specieId}
                onChange={handleSpecieChange}
                required
              >
                <option value="">Selecciona una especie</option>
                {especies &&
                  especies.map((especie) => (
                    <option
                      key={especie.id}
                      value={especie.id}
                      className="text-black"
                    >
                      {especie.specie}
                    </option>
                  ))}
              </select>

              <label htmlFor="raceId" className="text-detail font-semibold">
                Raza
              </label>
              <select
                name="raceId"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.raceId}
                onChange={handleInputChange}
                disabled={!formValues.specieId}
                required
              >
                <option value="">Selecciona una raza</option>
                {razas.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.race}
                  </option>
                ))}
              </select>

              <label htmlFor="sexId" className="text-detail font-semibold">
                Sexo
              </label>
              <select
                name="sexId"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.sexId}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecciona el sexo</option>
                {sexos.map((sex) => (
                  <option key={sex.id} value={sex.id}>
                    {sex.sex}
                  </option>
                ))}
              </select>

              <label
                htmlFor="weightCurrent"
                className="text-detail font-semibold"
              >
                Peso Actual (kg)
              </label>
              <input
                name="weightCurrent"
                type="number"
                placeholder="8.5"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.weightCurrent}
                onChange={handleInputChange}
              />

              <label
                htmlFor="observation"
                className="text-detail font-semibold"
              >
                Observaciones
              </label>
              <input
                name="observation"
                type="text"
                placeholder="Observaciones adicionales"
                className="w-full bg-transparent border-[.2em] border-gray-600 placeholder:text-gray-400 p-1 rounded-md text-center"
                value={formValues.observation}
                onChange={handleInputChange}
              />

              <ButtonCustom text="Agregar Mascota" type="submit" />
            </form>
          )}
        </div>
      </div>
    </Screen>
  );
};

export default NewPet;
