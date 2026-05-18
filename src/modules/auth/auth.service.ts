import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByUsername, createUser } from "./auth.repository";
import { LoginInput, RegisterInput } from "./auth.schema";

export const loginService = async (data: LoginInput) => {
  const user = await findUserByUsername(data.username);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const passwordValida = await bcrypt.compare(
    data.password,
    user.password_hash,
  );

  if (!passwordValida) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign(
    { id: user.id_usuario, username: user.username, rol: user.rol },
    process.env.JWT_SECRET!,
    { expiresIn: "8h" },
  );

  return {
    token,
    user: {
      id: user.id_usuario,
      username: user.username,
      email: user.email,
      rol: user.rol,
    },
  };
};

export const registerService = async (data: RegisterInput) => {
  const existe = await findUserByUsername(data.username);

  if (existe) {
    throw new Error("El username ya está registrado");
  }

  const password_hash = await bcrypt.hash(data.password, 10);

  const user = await createUser({ ...data, password_hash });

  return user;
};
