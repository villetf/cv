import { createNewElement } from './createNewElement.js';

export function insertExperience(experienceList, container, title) {
   console.log('hej');
   console.log(experienceList);
   console.log(container);
   createNewElement('h3', title, null, null, container);
   const expTable = createNewElement('div', null, 'expTable', null, container);
   for (const item of experienceList) {
      const expRow = createNewElement('div', null, null, 'expRow', expTable);
      const timeCell = createNewElement('div', item.duration, null, 'timeCell', expRow);
      createNewElement('i', null, null, 'fa-solid fa-angle-right clickArrow', expRow);
      const titleCell = createNewElement('div', item.title, null, 'titleCell', expRow);
      const placeText = createNewElement('p', item.place, null, null, titleCell);
      const description = createNewElement('p', item.description, null, 'hidden', titleCell);

      expRow.onclick = () => {
         description.classList.toggle('hidden');
      };
   }
}