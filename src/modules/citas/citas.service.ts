import * as repo from "./citas.repository";
import { CreateCitaInput, UpdateCitaInput } from "./citas.schema";

export const getAll            = () => repo.getAllCitas();
export const getById           = (id: number) => repo.getCitaById(id);
export const getByMascota      = (id: number) => repo.getCitasByMascota(id);
export const create            = (data: CreateCitaInput) => repo.createCita(data);
export const update            = (id: number, data: UpdateCitaInput) => repo.updateCita(id, data);
export const remove            = (id: number) => repo.deleteCita(id);
