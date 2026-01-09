import { Response } from "express";

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  errors?: any;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message?: string,
  data?: any,
  errors?: any
): Response => {
  const response: ApiResponse = { success };

  if (message) response.message = message;
  response.data = data !== undefined && data !== null ? data : [];
  if (errors) response.errors = errors;

  return res.status(statusCode).json(response);
};
