import * as repo from "./veterinarios.repository";
import { UpdateVeterinarioInput } from "./veterinarios.schema";

export const getAll = () => repo.getAllVeterinarios();
export const getById = (id: number) => repo.getVeterinarioById(id);
export const create = (data: any) => repo.createVeterinario(data);
export const update = (id: number, data: UpdateVeterinarioInput) =>
  repo.updateVeterinario(id, data);
export const remove = (id: number) => repo.deleteVeterinario(id);
