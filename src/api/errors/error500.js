import express from 'express';

/**
 * Error 500 "Internal Server Error"
 * @param {Error} err
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next
 */
export default function error500(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    code: 500,
    message: (process.env.NODE_ENV === "dev" ? err.message : "Erreur Serveur")
  });
}