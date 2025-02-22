import { getGithubRepos, getWorkExperience, getEducation } from './modules/apiCalls.js';
import { createGithubDiv } from './modules/createGithubDiv.js';
import { insertExperience, } from './modules/insertExperience.js';
import { insertTimeline } from './modules/insertTimeline.js';

const workContainer = document.getElementById('workContainer');
const workExp = await getWorkExperience();
const education = await getEducation();
// insertExperience(workExp, workContainer, 'Arbetslivserfarenhet');
insertTimeline(workExp, education);


const repos = await getGithubRepos();
for (const repo in repos) {
   createGithubDiv(repos[repo]);
}



