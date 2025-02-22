import { getRepoLanguages } from './apiCalls.js';
import { createNewElement } from './createNewElement.js';
import { getLanguageColor } from './getLanguageColor.js';

export async function createGithubDiv(repo) {
   const githubContainer = document.getElementById('githubContainer');

   const githubLink = createNewElement('a', null, null, 'githubLink', githubContainer);
   githubLink.href = repo.html_url;
   githubLink.target = '_blank';
   const githubDiv = createNewElement('div', null, null, 'githubDiv', githubLink);
   const topicsWrapper = createNewElement('div', null, null, 'topicsWrapper', githubDiv);
   const contentWrapper = createNewElement('div', null, null, 'contentWrapper', githubDiv);

   const topicsDiv = createNewElement('div', null, 'topicsDiv', null, topicsWrapper);
   repo.topics.forEach(topic => {
      const topicDiv = createNewElement('div', topic, 'topicDiv', null, topicsDiv);
   });
   const repoName = createNewElement('h3', repo.name, null, null, contentWrapper);

   const updatedAtDate = new Date(repo.updated_at);
   const localeUpdatedAtDate = updatedAtDate.toLocaleString(undefined, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
   });

   const lastUpdated = createNewElement('p', `Senast uppdaterad: ${localeUpdatedAtDate}`, null, 'lastUpdated', contentWrapper);
   if (repo.description) {
      const repoDesc = createNewElement('p', repo.description, null, 'repoDesc', contentWrapper);
   }

   const languagesContainer = createNewElement('div', null, null, 'languagesContainer', githubDiv);
   const languagesBar = createNewElement('div', null, null, 'languagesBar', languagesContainer);

   const languagesTextContainer = createNewElement('div', null, 'languagesTextContainer', null, languagesContainer);

   const languages = await getRepoLanguages(repo.languages_url);

   let totalSize = 0;
   for (const language in languages) {
      totalSize += languages[language];
   }


   for (const language in languages) {
      const languageAmount = Math.round(languages[language] / totalSize * 100);
      const languageColor = await getLanguageColor(language);
      const currentLanguageBar = createNewElement('div', null, null, 'currentLanguageBar', languagesBar);
      currentLanguageBar.style.width = `${languageAmount}%`;
      currentLanguageBar.style.backgroundColor = languageColor;
      const languageDiv = createNewElement('div', null, 'languageDiv', null, languagesTextContainer);
      const languageDot = createNewElement('div', null, 'languageDot', null, languageDiv);
      languageDot.style.backgroundColor = languageColor;
      const languageTitle = createNewElement('div', `${language} (${languageAmount}%)`, null, 'languageText', languageDiv);
   }
}
