import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const responseSerializerMiddlerware =
  (schema: ZodSchema, successMessage: string): RequestHandler =>
  (req, res, next) => {
    const parsedResponseData = schema.safeParse(req.responseData);
    if (!parsedResponseData.success) {
      console.log(parsedResponseData.error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        data: {},
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: successMessage,
      data: parsedResponseData.data,
    });
    return;
  };
