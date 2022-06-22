import express from 'express';

/**
 * Error 400 "Bad Request"
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export default function error400(req, res) {
  res.status(400).json({
    code: 400,
    message: `URL ${req.url} inconnue`
  });
}