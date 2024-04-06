import { API_URL } from "../main.js";
import { removeLoader, showLoader } from "./loader.js";

export const getData = async (url) => {
  showLoader();
  try {
    const response = await fetch(`${API_URL}/${url}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return [];
  } finally {
    removeLoader();
  }
};
