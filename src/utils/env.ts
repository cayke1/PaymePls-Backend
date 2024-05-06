import { z } from "zod";
import "dotenv/config";

const schema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.string(),
});

const env = schema.parse(process.env);
export { env };
