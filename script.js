import { getGithubRepos, getWorkExperience, getEducation } from './modules/apiCalls.js';
import { createGithubDiv } from './modules/createGithubDiv.js';
import { createNewElement } from './modules/createNewElement.js';
import { insertExperienceList } from './modules/insertExperience.js';
import { insertTimeline } from './modules/insertTimeline.js';


const workExperience = await getWorkExperience();
const education = await getEducation();

if (window.innerWidth > 768) {
   insertTimeline(workExperience, education);

   document.getElementById('timelineRadio').onclick = () => {
      document.getElementById('allExperienceContainer').innerText = '';
      insertTimeline(workExperience, education);
   };

   document.getElementById('listRadio').onclick = () => {
      document.getElementById('allExperienceContainer').innerText = '';
      insertExperienceList(workExperience, education);
   };
} else {
   insertExperienceList(workExperience, education);
   document.getElementById('showAsText').remove();
   document.getElementById('radioDiv').remove();

}

const repos = await getGithubRepos();
for (const repo in repos) {
   createGithubDiv(repos[repo]);
}



