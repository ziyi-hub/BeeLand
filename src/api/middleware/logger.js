import express from 'express';

/**
 * Log every requests
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
export default function logger(req, res, next) {
  const now = new Date;
  console.log(`[${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}] ${req.method} ${req.originalUrl}`);
  next();
}