import type { Request, Response, NextFunction } from 'express';
import { type ZodSchema, ZodError } from 'zod';

/**
 * Validation Middleware Factory
 * Wraps a Zod schema to validate req.body.
 * Returns 422 Unprocessable Entity with field-level error messages on failure.
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Parse and coerce the body — replaces req.body with the validated+typed result
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = (error as any).errors.map((e: any) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        res.status(422).json({
          message: 'Validation failed. Please check your input.',
          errors,
        });
        return;
      }
      next(error);
    }
  };
};
