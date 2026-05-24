import * as repo from "./facturas.repository";
import { CreateFacturaInput, UpdateFacturaInput } from "./facturas.schema";

export const getAll  = () => repo.getAllFacturas();
export const getById = (id: number) => repo.getFacturaById(id);
export const create  = (data: CreateFacturaInput) => repo.createFactura(data);
export const update  = (id: number, data: UpdateFacturaInput) => repo.updateFactura(id, data);
