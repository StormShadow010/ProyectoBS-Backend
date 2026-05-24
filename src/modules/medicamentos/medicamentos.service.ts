import * as repo from "./medicamentos.repository";
import { CreateMedicamentoInput, UpdateMedicamentoInput } from "./medicamentos.schema";

export const getAll      = () => repo.getAllMedicamentos();
export const getById     = (id: number) => repo.getMedicamentoById(id);
export const create      = (data: CreateMedicamentoInput) => repo.createMedicamento(data);
export const update      = (id: number, data: UpdateMedicamentoInput) => repo.updateMedicamento(id, data);
export const ajustarStock = (id: number, cantidad: number) => repo.ajustarStock(id, cantidad);
export const remove      = (id: number) => repo.deleteMedicamento(id);
