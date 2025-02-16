import { getGithubLangColor } from './apiCalls.js';

export async function getLanguageColor(language) {
   const result = await getGithubLangColor();
   return result[language].color;
}