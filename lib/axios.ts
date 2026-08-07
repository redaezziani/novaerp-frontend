// lib/axios.ts
// Shared axios instance for the real API. Not used by services.mock.ts yet —
// once Salma's API is ready, services/*.mock.ts get replaced with calls through this client.

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
