import { axiosApi } from './axiosInstans';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
}

export const authApi = {
  login: (body: LoginRequest) =>
    axiosApi.post<LoginResponse>('/auth/login', body).then((res) => res.data),

  signup: (body: SignupRequest) =>
    axiosApi.post<void>('/auth/signup', body),

  sendEmailCode: (email: string) =>
    axiosApi.post<void>('/auth/email/send', { email }),

  verifyEmailCode: (email: string, code: string) =>
    axiosApi.post<void>('/auth/email/verify', { email, code }),

  resetPassword: (email: string, newPassword: string) =>
    axiosApi.patch<void>('/auth/password/reset', { email, newPassword }),
};
