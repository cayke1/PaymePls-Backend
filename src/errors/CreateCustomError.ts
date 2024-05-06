export function createCustomError(code: number, description: string) {
  return class CustomError extends Error {
    public code: number;
    constructor() {
      super(description);
      this.name = "CustomError";
      this.code = code;
    }
  };
}

export const UnauthorizedError = createCustomError(401, "Unauthorized");
export const ForbiddenError = createCustomError(403, "Forbidden");
export const NotFoundError = createCustomError(404, "Not Found");
