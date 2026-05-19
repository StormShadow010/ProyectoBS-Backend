import {
  getAllEspecies,
  getEspecieById,
  createEspecie,
  updateEspecie,
  deleteEspecie,
} from "./especies.repository";
import { CreateEspecieInput, UpdateEspecieInput } from "./especies.schema";

export const getAllEspeciesService = async () => {
  return await getAllEspecies();
};

export const getEspecieByIdService = async (id: number) => {
  const especie = await getEspecieById(id);
  if (!especie) throw new Error("Especie no encontrada");
  return especie;
};

export const createEspecieService = async (data: CreateEspecieInput) => {
  return await createEspecie(data);
};

export const updateEspecieService = async (
  id: number,
  data: UpdateEspecieInput,
) => {
  const especie = await updateEspecie(id, data);
  if (!especie) throw new Error("Especie no encontrada");
  return especie;
};

export const deleteEspecieService = async (id: number) => {
  const especie = await deleteEspecie(id);
  if (!especie) throw new Error("Especie no encontrada");
  return especie;
};
