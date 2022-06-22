import express from 'express';
import error401 from '../errors/error401.js';
import sha256 from "crypto-js/sha256.js";
import { Admin } from '../../database/models/Admin.js';

/**
 * Log every requests
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export default async function mustBeAdmin(req, res, next) {
  if (!req.headers.authorization) { error401(res); return; }

  const base64Auth = req.headers.authorization.split(" ");

  if (base64Auth[0] !== "Basic" || base64Auth.length !== 2) { res.status(422).json({ code: "422", message: "La méthode d'authentification comporte des erreurs" }); return; }

  const auth = Buffer.from(base64Auth[1], "base64").toString();

  let login, password;
  [login, password] = auth.split(":");

  const encryptedPassword = sha256(password).toString();

  const user = await Admin.findOne({ where: { login: login, password: encryptedPassword } });

  if (!user) { error401(res, true); return; }

  next();
}