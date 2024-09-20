"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { authenticate } from "@/actions/auth-actions";
import MicrosoftIcon from "@/components/auth/microsoft-icon"; // Adjust the path based on your file structure

import { Loader2 } from "lucide-react";
function SingleSingOnButton() {
  const { pending } = useFormStatus();
  return (
    // <section className="flex flex-col items-center">
    //   <div className="text-center mb-8">
    //     <h1 className="text-4xl font-bold mb-2">
    //       {siteConfig.brand}
    //     </h1>
    //     <h2 className="text-xl">{siteConfig.name}</h2>
    //   </div>

    <Button
      type="submit"
      disabled={pending}
      className="w-full"
      color="secondary"
    >
      {pending && (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
      {!pending && (
        <div className="flex items-center justify-center gap-2">
          <MicrosoftIcon stroke="2" />
          Continue with Microsoft Entra ID
        </div>
      )}
    </Button>
  );
}

export default function LoginForm() {
  const [errorMessage, signIn] = useFormState(authenticate, undefined);

  return (
    <form action={signIn} className="mt-8 space-y-6">
      <div className="space-y-4">
        <SingleSingOnButton />
      </div>
      {errorMessage && (
        <p role="alert" className="text-red-500 pt-6">
          {errorMessage}
        </p>
      )}
    </form>
    // <form action={signIn}>
    //   <SingleSingOnButton />
    //   {errorMessage && (
    //     <p role="alert" className="text-red-500 pt-6">
    //       {errorMessage}
    //     </p>
    //   )}
    // </form>
  );
}
