/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import * as jose from "jose";

export async function getCurrentUser() {
  // Get token from cookies
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return null;
  }

  try {
    // Verify and decode token
    const { payload: jwtData } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET!)
    );
    const decoded = jwtData as {
      slug: string;
      email: string;
      role: string;
      name: string;
      school_slug: string;
      profilePhoto: string;
    };

    // Fetch user with populated school
    const user = decoded;

    if (!user) {
      return null;
    }

    // Return user data without sensitive fields
    return {
      email: user.email,
      name: user.name,
      profilePhoto: user.profilePhoto,
      role: user.role,
      slug: user.slug,
      school_slug: user.school_slug,
    };
  } catch (error) {
    return null;
  }
}

export async function logout() {
  // Remove authentication cookie
  (await cookies()).delete("access_token");
}
