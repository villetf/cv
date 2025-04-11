export function getGithubRepos() {
   return fetch('https://api.github.com/users/villetf/repos')
      .then((response) => response.json())
      .then((data) => {
         return data.sort((a, b) => {
            return new Date(b.updated_at) - new Date(a.updated_at);
         });
      });
}

export function getRepoLanguages(url) {
   return fetch(url)
      .then(response => response.json());
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