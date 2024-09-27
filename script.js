const githubContainer = document.getElementById('githubContainer');



fetch('https://api.github.com/users/villetf/repos')
   .then((response) => {
      return response.json();
   })
   .then((data) => {
      return data.sort((a, b) => {
         return new Date(b.created_at) - new Date(a.created_at);
      });
   })
   .then((repos) => {
      console.log(repos);
      for (const repo in repos) {
         console.log(repos[repo].name);
         console.log(repos[repo].created_at);
         createGithubDiv(repos[repo]);
      }
   });

function createGithubDiv(repo) {
   const githubDiv = document.createElement('div');
   githubDiv.classList.add('githubDiv');

   const repoName = document.createElement('h3');
   repoName.innerText = repo.name;
   githubDiv.appendChild(repoName);

   const repoDesc = document.createElement('p');
   repoDesc.innerText = repo.description;
   githubDiv.appendChild(repoDesc);

   githubContainer.appendChild(githubDiv);

   
}