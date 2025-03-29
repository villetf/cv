import { getEducation, getWorkExperience } from './apiCalls.js';
import { createNewElement } from './createNewElement.js';

export async function insertExperienceList(workExp, education) {
   const workContainer = createNewElement('div', null, 'workListContainer', 'experienceContainer', document.getElementById('allExperienceContainer'));
   insertExperience(workExp, workContainer, 'Arbetslivserfarenhet');

   const eduContainer = createNewElement('div', null, 'eduListContainer', 'experienceContainer', document.getElementById('allExperienceContainer'));
   insertExperience(education, eduContainer, 'Utbildning');
}

function insertExperience(experienceList, container, title) {
   createNewElement('h3', title, null, null, container);
   const expTable = createNewElement('div', null, 'expTable', null, container);
   for (const item of experienceList) {
      const expRow = createNewElement('div', null, null, 'expRow', expTable);
      const timeCell = createNewElement('div', item.duration, null, 'timeCell', expRow);
      const arrow = createNewElement('i', null, null, 'fa-solid fa-angle-right clickArrow', expRow);
      const titleCell = createNewElement('div', item.title, null, 'titleCell', expRow);
      const placeText = createNewElement('p', item.place, null, 'placeText', titleCell);
      const description = createNewElement('p', null, null, 'hidden experienceDescription', titleCell);
      description.innerHTML = item.description;

      expRow.onclick = () => {
         description.classList.toggle('hidden');
         if (arrow.classList.contains('rotateArrow')) {
            arrow.classList.add('rerotateArrow');
         } else {
            arrow.classList.remove('rerotateArrow');
         }
         arrow.classList.toggle('rotateArrow');
      };
   }
}