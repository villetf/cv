import { getGithubRepos, getWorkExperience, getEducation } from './modules/apiCalls.js';
import { createGithubDiv } from './modules/createGithubDiv.js';
import { createNewElement } from './modules/createNewElement.js';
import { insertExperienceList } from './modules/insertExperience.js';
import { insertTimeline } from './modules/insertTimeline.js';


const workExperience = await getWorkExperience();
const education = await getEducation();
insertTimeline(workExperience, education);

document.getElementById('timelineRadio').onclick = () => {
   document.getElementById('experienceContainer').innerText = '';
   insertTimeline(workExperience, education);
};

document.getElementById('listRadio').onclick = () => {
   document.getElementById('experienceContainer').innerText = '';
   insertExperienceList(workExperience, education);
};

const repos = await getGithubRepos();
for (const repo in repos) {
   createGithubDiv(repos[repo]);
}



