"use server";

import { getLinkPreview } from "link-preview-js";

export const getOpenGraph = async (url: string) => {
  try {
    return await getLinkPreview(url);
  } catch (error) {
    return error instanceof Error ? error : new Error("ERR");
  }
};
