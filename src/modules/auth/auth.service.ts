import bcrypt from "bcrypt";
import { pool } from "../../db";
import type { IUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { ILoginUser } from "./auth.interface";

dotenv.config();

export const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at, updated_at
  `;

  const values = [name, email, hashedPassword, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const loginUserFromDB = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;

  const result = await pool.query(query, [email]);

  const user = result.rows[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password does not match");
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};
