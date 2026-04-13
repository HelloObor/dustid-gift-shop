export interface DustidAddress {
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip?: string;
  country: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

export interface DustidFriendSummary {
  id: string;
  name: string;
  email?: string;
}

export interface DustidFriend extends DustidFriendSummary {
  address: DustidAddress;
}

export interface DustidProfile {
  id: string;
  phoneNumber: string;
  name: string;
  friends: DustidFriend[];
}

interface MessageResponse {
  message: string;
  otp?: string;
}

interface ValidateOtpResponse {
  message: string;
  token: string;
}

interface SearchContactsResponse {
  results: DustidFriendSummary[];
}

interface ProfileResponse {
  contact: DustidProfile;
}

const API_BASE_URL = (import.meta.env.VITE_DUSTID_API_URL || "http://localhost:3000").replace(/\/$/, "");

export class DustidApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "DustidApiError";
    this.status = status;
    this.details = details;
  }
}

export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong.") {
  if (error instanceof DustidApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

async function apiRequest<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && "message" in payload
        ? String(payload.message)
        : `Request failed with status ${response.status}.`;

    throw new DustidApiError(message, response.status, payload);
  }

  return payload as T;
}

export function requestOtp(phoneNumber: string) {
  return apiRequest<MessageResponse>("/verify", {
    method: "POST",
    body: JSON.stringify({ phoneNumber: normalizePhoneNumber(phoneNumber) }),
  });
}

export function validateOtp(phoneNumber: string, otp: string) {
  return apiRequest<ValidateOtpResponse>("/validate-otp", {
    method: "POST",
    body: JSON.stringify({
      phoneNumber: normalizePhoneNumber(phoneNumber),
      otp: otp.trim(),
    }),
  });
}

export function getProfile(phoneNumber: string) {
  return apiRequest<ProfileResponse>("/profile", {
    method: "POST",
    body: JSON.stringify({ phoneNumber: normalizePhoneNumber(phoneNumber) }),
  });
}

export function searchContacts(phoneNumber: string, token: string, query = "") {
  return apiRequest<SearchContactsResponse>("/search", {
    method: "POST",
    body: JSON.stringify({
      phoneNumber: normalizePhoneNumber(phoneNumber),
      query: query.trim(),
    }),
  }, token);
}

export function getFriendDetails(friendId: string, token: string) {
  return apiRequest<DustidFriend>(`/friends/${friendId}`, { method: "GET" }, token);
}
