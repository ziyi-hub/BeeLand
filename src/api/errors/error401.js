import express from 'express';

/**
 * Error 401 "Unauthorized"
 * @param {express.Response} res 
 * @param {boolean} tried Is the user tried to login
 */
export default function error401(res, tried = false) {
  if (tried)
    res.status(401).json({ code: 401, message: "Invalid login/password" });
  else
    res.status(401).json({ code: 401, message: `L'accès à cette action requière une authentification` });
}