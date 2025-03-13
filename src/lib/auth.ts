import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient, UserRole } from "@prisma/client";
import { Lucia, RegisteredDatabaseUserAttributes, Session, User } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		},
	},
	getUserAttributes: (attributes: RegisteredDatabaseUserAttributes) => {
		return {
			role: attributes?.role,
			name: attributes?.name,
			email: attributes?.email,
			passport: attributes?.passport,
		}
	}
});

export const getUser = cache(async (): Promise<{ user: User | null, session: Session | null }> => {
	const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return { user: null, session: null };
	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	
	return { user, session };
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			role: UserRole;
			name: string;
			email: string;
			passport: string | null;
		} | null;
	}
}