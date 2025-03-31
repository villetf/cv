import { insertCursor } from './modules/insertCursor.js';
import { getGithubRepos, getWorkExperience, getEducation } from './modules/apiCalls.js';
import { createGithubDiv } from './modules/createGithubDiv.js';
import { insertExperienceList } from './modules/insertExperience.js';
import { insertTimeline } from './modules/insertTimeline.js';
import { startTextAnimations } from './modules/startTextAnimations.js';

startTextAnimations();

document.getElementById('contactTitleParent').appendChild(insertCursor());

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
