import React from 'react';
import CardCustom from '@/components/cardCustom';
import Link from 'next/link';
import PATHROUTES from '@/helpers/path-routes';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { SectionContentProps } from '@/types/interfaces';
import { InformationModule } from './informationModule';


export const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  const { user, loginContext } = useUser();

  switch (section) {
    case "sinUser":
      return (
        <p>No hay datos de usuario</p>
      )
    case "Información":
      return (
        <InformationModule user={user} modifyContext={loginContext} />
      );
    case "Mascotas":
      return (
        <div className='w-full'>
          <h3 className="text-xl">Mascotas</h3>
          <div className='flex flex-row gap-5 m-5 '>
            {user?.mascotas?.map((mascota, index) => (
              <CardCustom key={index} isSelect={"not"} size='300px'>
                <Link href={PATHROUTES.PET}>
                  <Image src={"/mascota.png"} alt={`Imagen de `} width={100} height={100} />
                  <h3 className='text-xl text-black dark:text-white'>
                    Nombre: { }
                  </h3 >
                  <p className='text-black dark:text-white'>Tipo: { }</p>
                  <p className='text-black dark:text-white'>Edad: { }</p>
                  Editar</Link>
              </CardCustom>
            ))}
          </div>
        </div>
      );
    case "Turnos":
      return (
        <div>
          <h3 className="text-xl">Turnos</h3>

          {user && user?.turnos ?
            (<div>
              <h3>
                Turnos agendados
              </h3>

              <ul>
                {user?.turnos?.map((turno, index) => (
                  <li key={index}>{turno}</li>
                ))}
              </ul>
            </div>)
            :
            (<p>No hay turnos agendados</p>)

          }
        </div>
      );
    case "Facturas":
      return (
        <div>
          <h3 className="text-xl">Facturas</h3>
          {/* Renderizar las facturas */}
        </div>
      );
    case "Veterinaria Favorita":
      return (
        <div>
          <h3 className="text-xl">Veterinaria Favorita</h3>
          <p>{user?.veterinariafavorita}</p>
          <button>change</button>
        </div>
      );
    default:
      return null;
  }
};

export default SectionContent;