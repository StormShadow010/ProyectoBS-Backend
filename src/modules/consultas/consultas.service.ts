import * as repo from "./consultas.repository";
import { CreateConsultaInput, UpdateConsultaInput } from "./consultas.schema";

export const getAll  = () => repo.getAllConsultas();
export const getById = (id: number) => repo.getConsultaById(id);
export const create  = (data: CreateConsultaInput) => repo.createConsulta(data);
export const update  = (id: number, data: UpdateConsultaInput) => repo.updateConsulta(id, data);
