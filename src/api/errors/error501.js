import express from 'express';

/**
 * Error 501 "Not Implemented"
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
export default function error501(req, res) {
  res.status(501).json({
    code: 501,
    message: "Fonctionnalité non-implémentée"
  });
}