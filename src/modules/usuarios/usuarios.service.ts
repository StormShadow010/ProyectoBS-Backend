import * as repo from "./usuarios.repository";
import { CreateUsuarioInput, UpdateUsuarioInput } from "./usuarios.schema";

export const getAll  = () => repo.getAllUsuarios();
export const getById = (id: number) => repo.getUsuarioById(id);
export const create  = (data: CreateUsuarioInput) => repo.createUsuario(data);
export const update  = (id: number, data: UpdateUsuarioInput) => repo.updateUsuario(id, data);
export const remove  = (id: number) => repo.deleteUsuario(id);
