import { httpClient } from "@/shared/lib/http-client";

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export const settingRepository = {
  getUserProfile: async (userId: string): Promise<UserProfile> => {
    const response = await httpClient(`/users/${userId}`, {
      method: 'GET',
    });
    return response;
  },

  updateUserProfile: async (userId: string, data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await httpClient(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  }
}; 