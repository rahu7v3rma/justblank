import { User } from "./types";

declare global {
  namespace Express {
    interface Request {
      user: User;
      parsedBody: any;
      parsedQuery: any;
      parsedPath: any;
      responseData: any;
      paramUser: User;
    }
  }
}

export {};
