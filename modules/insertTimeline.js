import { createNewElement } from './createNewElement.js';

export function insertTimeline(workExperience, education) {
   const experienceContainer = document.getElementById('experienceContainer');
   const contentContainer = createNewElement('div', null, 'contentContainer', null, experienceContainer);
   const timelineContainer = createNewElement('div', null, 'timelineContainer', null, contentContainer);
   const eventsContainer = createNewElement('div', null, 'eventsContainer', null, timelineContainer);
   const yearsContainer = createNewElement('div', null, 'yearsContainer', null, timelineContainer);

   const currentYear = new Date().getFullYear();
   const startYear = 2017;
   const totalYears = currentYear - startYear;
   const totalMonths = totalYears * 12;

   for (let i = startYear; i <= currentYear; i++) {
      let thisYear = false;
      if (i == currentYear) {
         thisYear = true;
      }
      const year = createNewElement('div', null, null, 'yearLabel', yearsContainer);
      const yearText = createNewElement('p', i, null, 'yearText', year);

      if (thisYear) {
         year.style.flexGrow = (new Date().getMonth() + 1) / 12;
      }
      for (let index = 1; index <= 12; index++) {
         if (thisYear && index > (new Date().getMonth() + 1)) {
            break;
         }
         const month = createNewElement('div', null, `${i}-${index.toString().padStart(2, '0')}`, 'month', year);
      }
   }

   workExperience.forEach(job => createEventMarker2(job, 'work'));
   education.forEach(edu => createEventMarker2(edu, 'edu'));

   const meritBars = document.querySelectorAll('.eventBar');
   meritBars.forEach((bar, index) => {
      bar.style.top = (index * 25) + 'px';
   });


   function createEventMarker(event, type) {
      console.log(event);
      const startDate = new Date(event.startTime);
      const endDate = new Date(event.endTime) ?? new Date();
      console.log(startDate, endDate);
      const startPos = (((startDate.getFullYear() - startYear) * 12) + startDate.getMonth()) / totalMonths * 100;
      const endPos = (((endDate.getFullYear() - startYear) * 12) + endDate.getMonth()) / totalMonths * 100;
      const eventDiv = createNewElement('div', event.title, null, 'event ' + type, eventsContainer);
      eventDiv.style.left = `${startPos}%`;
      eventDiv.style.width = `${endPos - startPos}%`;
      console.log('startPos', startPos);
   }
}

function createEventMarker2(event, type) {
   const startElement = document.getElementById(event.startTime);
   const endElement = document.getElementById(event.endTime);

   const timelineContainer = document.getElementById('timelineContainer');
   const eventsContainer = document.getElementById('eventsContainer');

   const startRect = startElement.getBoundingClientRect();
   const endRect = endElement.getBoundingClientRect();
   const timelineRect = timelineContainer.getBoundingClientRect();

   // const startPos = startElement.offsetLeft - timelineContainer.offsetLeft;
   // const endPos = endElement.offsetLeft + endElement.offsetWidth - timelineContainer.offsetLeft;
   const startPos = startRect.left - timelineRect.left;
   const endPos = endRect.left + endRect.width - timelineRect.left;

   const eventBar = createNewElement('div', event.title, null, 'eventBar', eventsContainer);
   eventBar.style.left = startPos + 'px';
   eventBar.style.width = (endPos - startPos) + 'px';
   if (type == 'edu') {
      eventBar.style.transform = 'translateY(60px)';
   }
}