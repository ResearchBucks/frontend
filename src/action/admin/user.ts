"use server";

import { UserDetailsSchema } from "@/schema/user/user-details";
import * as z from "zod";
import { BASE_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { getAllUsersResponse } from "@/types/user/users";

type ActionResponse = {
  success: boolean;
  data?: typeof UserDetailsSchema;
  error?: string;
};

export async function createUser(
  data: z.infer<typeof UserDetailsSchema>
): Promise<ActionResponse> {
  try {
    const validationResult = UserDetailsSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.errors[0].message,
      };
    }

    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    const responseData = await response.json();
    revalidatePath("/admin/users");

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to create user");
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create user",
    };
  }
}

export async function deleteUser(id: string): Promise<ActionResponse> {
  try {
    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: "DELETE",
    });

    const responseData = await response.json();
    revalidatePath("/admin/users");

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to delete user");
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete user",
    };
  }
}

export async function updateUser(
  id: string,
  data: z.infer<typeof UserDetailsSchema>
): Promise<ActionResponse> {
  try {
    const validationResult = UserDetailsSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.errors[0].message,
      };
    }

    const response = await fetch(`${BASE_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        updatedAt: new Date().toISOString(),
      }),
    });

    const responseData = await response.json();
    revalidatePath("/admin/users");

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to update user");
    }

    return {
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update user",
    };
  }
}

export async function getUsers(params: {
  page: number;
  limit: number;
  sort: string;
  email: string;
}): Promise<getAllUsersResponse> {
  const response = await fetch(
    `${BASE_URL}/user?page=${params.page}&limit=${params.limit}&sort=${params.sort}&email=${params.email}`
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Failed to fetch users");
  }

  return responseData;
}
