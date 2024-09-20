// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT, DefaultJWT } from "next-auth/jwt";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    // Microsoft Graph API `/me` Response - https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http#response-1
    "@odata.context"?: string;
    businessPhones?: string[];
    displayName?: string;
    givenName?: string;
    jobTitle?: string | null;
    mail?: string | null;
    mobilePhone?: string | null;
    officeLocation?: string | null;
    preferredLanguage?: string | null;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
    roles?: string[];
  }

  interface Session {
    user?: User;
    expires: string;
    access_token?: (string & DefaultSession) | unknown;
    idToken?: string | null;
    roles?: string[];
    exp?: number;
  }

  interface Auth {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJwt{
    userDetails?: User;
    access_token: string & DefaultJWT;
    idToken?: string | null;
    roles: string[];
  }
}
