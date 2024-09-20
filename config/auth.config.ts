import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";
import { getUserDetails } from "@/lib/ms-graph-api";
import { authEnvConfig } from "@/config/env.config";
import type { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import { tokenEndpoint, scope } from "@/config/constants";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    // https://authjs.dev/getting-started/providers/microsoft-entra-id
    MicrosoftEntraID({
      clientId: authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: {
        // https://learn.microsoft.com/en-us/graph/permissions-overview
        params: {
          scope: scope
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      let tokenExp: number | undefined = 0;
      if(token?.idToken){
        const decodedToken = jwtDecode(token.idToken as string) as { exp?: number };
        tokenExp = decodedToken.exp;
      }
      if (account?.access_token) {
        try {
          const userDetails = await getUserDetails(account.access_token);
          token.userDetails = userDetails;
          token.idToken = account.id_token;
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          
          if (token.idToken) {
            const decodedToken = jwtDecode(token.idToken as string) as { roles?: string[], exp?: number };
            token.roles = decodedToken.roles || [];
            token.exp = decodedToken.exp;
          }
        } catch (error) {
          console.error("Failed to fetch user details", error);
        }
      } else if (tokenExp && tokenExp > Math.floor(Date.now() / 1000)) {
        return token;
      } else {
        if (!token.refreshToken) {
          throw new Error("No refresh token available");
        }
    
        try {
          const response = await fetch(tokenEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=refresh_token`
                  + `&client_secret=${authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_SECRET}`
                  + `&refresh_token=${token.refreshToken}`
                  + `&client_id=${authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_ID}`
                  + `&scope=${encodeURIComponent(scope)}`
          });
    
          const tokensOrError = await response.json();
    
          if (!response.ok) {
            throw tokensOrError;
          }
    
          const newTokens = tokensOrError;
    
          token.accessToken = newTokens.access_token;
          token.idToken = newTokens.id_token;
          token.exp = Math.floor(Date.now() / 1000 + newTokens.expires_in);
    
          if (newTokens.refresh_token) {
            token.refreshToken = newTokens.refresh_token;
          }
    
          return token;
        } catch (error) {
          console.error("Error refreshing access token", error);
          token.error = "RefreshTokenError";
          return token;
        }
      }
    
      return token;
    },
    async session({ session, token }) {
      if (token.userDetails) {
        session.user = { ...session.user, ...token.userDetails };
      }
      
      if(token.idToken){
        session.idToken = token.idToken as string;
      }

      session.roles = Array.isArray(token.roles) ? token.roles : [];
      session.user.roles = Array.isArray(token.roles) ? token.roles : [];
      session.exp = token.exp;
      return session;
    },
    async authorized({ auth }) {
      return !!auth?.user;
    },
  },
  secret: authEnvConfig.AUTH_SECRET,
} satisfies NextAuthConfig;
