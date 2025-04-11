import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const requestBodyParse =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    const parsedBody = schema.safeParse(req.body);
    if (!parsedBody.success) {
      const fieldErrors = parsedBody.error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(fieldErrors)?.[0]?.[0];
      res.status(400).json({
        success: false,
        message: firstErrorMessage,
        data: fieldErrors,
      });
      return;
    }
    req.parsedBody = parsedBody.data;
    next();
  };

export const requestQueryParse =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    const parsedQuery = schema.safeParse(req.query);
    if (!parsedQuery.success) {
      const fieldErrors = parsedQuery.error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(fieldErrors)?.[0]?.[0];
      res.status(400).json({
        success: false,
        message: firstErrorMessage,
        data: fieldErrors,
      });
      return;
    }
    req.parsedQuery = parsedQuery.data;
    next();
  };

export const requestPathParse =
  (schema: ZodSchema): RequestHandler =>
  (req, res, next) => {
    const parsedPath = schema.safeParse(req.params);
    if (!parsedPath.success) {
      const fieldErrors = parsedPath.error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(fieldErrors)?.[0]?.[0];
      res.status(400).json({
        success: false,
        message: firstErrorMessage,
        data: fieldErrors,
      });
      return;
    }
    req.parsedPath = parsedPath.data;
    next();
  };
