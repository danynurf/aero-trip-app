"use server";

import { getUser, lucia } from "@/lib/auth";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<ActionResult> {
    const { session } = await getUser();

    if (!session) {
        return { 
            errorTitle: "Unauthorized",
            errorMessage: "You are not authorized to access this page",
         };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    
    return redirect("/auth/login");
}

