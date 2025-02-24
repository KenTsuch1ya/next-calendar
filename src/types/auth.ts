import { User } from "@auth/core/types";

export type UserWithToken = User & {
  accessToken: string;
};
