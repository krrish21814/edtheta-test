/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import UserGetAction from "@/lib/actions/user/user";
import { User } from "@/types/user";
import { getCurrentUser } from "@/utils/authentication";
import { useEffect, useState } from "react";

export const useCurrentUser = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await UserGetAction();
      setUser(userData as User);
    } catch (err) {
      setError("Failed to load user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, []);

  return { user, loading, error, refetch: handleFetchUser };
};
