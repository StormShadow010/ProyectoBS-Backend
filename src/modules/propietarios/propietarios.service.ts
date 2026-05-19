import {
  getAllPropietarios,
  getPropietarioById,
  createPropietario,
  updatePropietario,
  deletePropietario,
} from "./propietarios.repository";
import {
  CreatePropietarioInput,
  UpdatePropietarioInput,
} from "./propietarios.schema";

export const getAllPropietariosService = async () => {
  return await getAllPropietarios();
};

export const getPropietarioByIdService = async (id: number) => {
  const propietario = await getPropietarioById(id);
  if (!propietario) throw new Error("Propietario no encontrado");
  return propietario;
};

export const createPropietarioService = async (
  data: CreatePropietarioInput,
) => {
  return await createPropietario(data);
};

export const updatePropietarioService = async (
  id: number,
  data: UpdatePropietarioInput,
) => {
  const propietario = await updatePropietario(id, data);
  if (!propietario) throw new Error("Propietario no encontrado");
  return propietario;
};

export const deletePropietarioService = async (id: number) => {
  const propietario = await deletePropietario(id);
  if (!propietario) throw new Error("Propietario no encontrado");
  return propietario;
};
