import { authEnvConfig } from "@/config/env.config";

export const tokenEndpoint = `https://login.microsoftonline.com/${authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID}/oauth2/v2.0/token`;
export const scope = "openid profile email User.Read offline_access";