import { google } from "googleapis";

const customsearch = google.customsearch("v1");

export const searchResults = async (query: string) => {
  const res = await customsearch.cse.list({
    cx: process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID,
    q: query,
    auth: process.env.GOOGLE_CUSTOM_SEARCH_API_KEY,
  });
  return res.data;
};
