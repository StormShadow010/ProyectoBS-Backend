import * as repo from "./tratamientos.repository";
import { CreateTratamientoInput } from "./tratamientos.schema";

export const getAll          = () => repo.getAllTratamientos();
export const getByConsulta   = (id: number) => repo.getTratamientosByConsulta(id);
export const create          = (data: CreateTratamientoInput) => repo.createTratamiento(data);
export const remove          = (id: number) => repo.deleteTratamiento(id);
