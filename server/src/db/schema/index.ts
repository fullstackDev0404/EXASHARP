import * as authSchema from "./auth-schema";
import * as hrmsSchema from "./hrms-schema/index";
import * as platformSchema from "./platform-schema/index";

export const schema = {
  ...hrmsSchema,
  ...authSchema,
  ...platformSchema,
};


