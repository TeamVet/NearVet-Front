import ButtonCustom from "@/components/ButtonCustom";
import Screen from "@/components/Screen";
import PATHROUTES from "@/helpers/path-routes";
import React from "react";

const About = () => {
  return (
    <Screen>
      <h2 className="text-3xl text-detail">Sobre nosotros</h2>
      <p className="text-lightText dark:text-darkText w-2/3 mx-auto my-2">
        NearVet es una aplicacion web destinada a que usuarios como vos puedan
        tener un claro seguimiento de la salud de su mascota, acceder a la
        historia clinica sin niguna complicacion, poder revisar las atenciones,
        recordar las recetas medicamentos o tratamientos que la veterinaria le
        haya indicado y que tu mascota debe recibir, tambien facilitar y
        asegurar turnos en la veterinaria con una atencion personalziada y
        rapida.
      </p>
      <ButtonCustom text="Tengo dudas" href={PATHROUTES.FAQ}></ButtonCustom>
    </Screen>
  );
};

export default About;
