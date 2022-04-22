import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// mocking server creation
export const server = setupServer(...handlers);
