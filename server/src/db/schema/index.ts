import * as authSchema from "./auth-schema";
import * as hrmsSchema from "./hrms-schema/index";

export const schema = {
  ...hrmsSchema,
  ...authSchema,
};


