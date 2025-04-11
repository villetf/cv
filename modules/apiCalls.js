import { createNewElement } from './createNewElement.js';

export function getGithubRepos() {
   return fetch('https://api.github.com/users/villetf/repos')
      .then((response) => {
         if (response.status == 403) {
            insertApiCallError();
         }
         return response.json();
      })
      .then((data) => {
         return data.sort((first, second) => {
            return new Date(second.updated_at) - new Date(first.updated_at);
         });
      });
}

export function getRepoLanguages(url) {
   return fetch(url)
      .then(response => {
         if (response.status == 403) {
            insertApiCallError();
         }
         return response.json();
      });
}

export function getGithubLangColor() {
   return fetch('https://raw.githubusercontent.com/ozh/github-colors/refs/heads/master/colors.json')
      .then(res => res.json());
}

export async function getWorkExperience() {
   return fetch('data/workExp.json')
      .then(res => res.json());
}

export async function getEducation() {
   return fetch('data/education.json')
      .then(res => res.json());
}

export function insertApiCallError() {
   if (document.getElementById('githubError')) {
      return;
   }
   const title = document.querySelector('#githubSection h1');
   const errorText = 'Du har uppnått din gräns för oautentiserade anrop mot Github (60 st/timme), och därför saknas viss info här. Om en stund kommer allt funka som det ska igen.';
   createNewElement('p', errorText, 'githubError', null, title);
   title.style.textAlign = 'center';
}