import {
  getAllMascotas,
  getMascotasByPropietario,
  getMascotaById,
  createMascota,
  updateMascota,
  deleteMascota,
} from "./mascotas.repository";
import { CreateMascotaInput, UpdateMascotaInput } from "./mascotas.schema";

export const getAllMascotasService = async (
  rol: string,
  id_propietario?: number,
) => {
  console.log(rol);
  console.log(id_propietario);

  if (rol === "USUARIO" && id_propietario) {
    return await getMascotasByPropietario(id_propietario);
  }
  return await getAllMascotas();
};

export const getMascotaByIdService = async (id: number) => {
  const mascota = await getMascotaById(id);
  if (!mascota) throw new Error("Mascota no encontrada");
  return mascota;
};

export const createMascotaService = async (
  data: CreateMascotaInput,
  rol: string,
  id_propietario?: number,
) => {
  // Si es USUARIO forzamos su id_propietario
  if (rol === "USUARIO" && id_propietario) {
    data.id_propietario = id_propietario;
  }
  return await createMascota(data);
};

export const updateMascotaService = async (
  id: number,
  data: UpdateMascotaInput,
) => {
  const mascota = await updateMascota(id, data);
  if (!mascota) throw new Error("Mascota no encontrada");
  return mascota;
};

export const deleteMascotaService = async (id: number) => {
  const mascota = await deleteMascota(id);
  if (!mascota) throw new Error("Mascota no encontrada");
  return mascota;
};
