import * as repository from "./especialidades.repository";

export const getAll = () => repository.findAll();
export const create = (nombre: string, desc: string) =>
  repository.create(nombre, desc);
export const update = (id: number, nombre: string, desc: string) =>
  repository.update(id, nombre, desc);
export const remove = (id: number) => repository.remove(id);
