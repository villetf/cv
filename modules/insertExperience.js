import { getEducation, getWorkExperience } from './apiCalls.js';
import { createNewElement } from './createNewElement.js';

export async function insertExperienceList(workExp, education) {
   const workContainer = createNewElement('div', null, null, 'experienceContainer', document.getElementById('experienceContainer'));
   insertExperience(workExp, workContainer, 'Arbetslivserfarenhet');

   const eduContainer = createNewElement('div', null, null, 'experienceContainer', document.getElementById('experienceContainer'));
   insertExperience(education, eduContainer, 'Utbildning');
}

function insertExperience(experienceList, container, title) {
   console.log('hej');
   console.log(experienceList);
   console.log(container);
   createNewElement('h3', title, null, null, container);
   const expTable = createNewElement('div', null, 'expTable', null, container);
   for (const item of experienceList) {
      const expRow = createNewElement('div', null, null, 'expRow', expTable);
      const timeCell = createNewElement('div', item.duration, null, 'timeCell', expRow);
      const arrow = createNewElement('i', null, null, 'fa-solid fa-angle-right clickArrow', expRow);
      const titleCell = createNewElement('div', item.title, null, 'titleCell', expRow);
      const placeText = createNewElement('p', item.place, null, null, titleCell);
      const description = createNewElement('p', item.description, null, 'hidden', titleCell);

      expRow.onclick = () => {
         description.classList.toggle('hidden');
         arrow.classList.toggle('fa-angle-right');
         arrow.classList.toggle('fa-angle-down');
      };
   }
}