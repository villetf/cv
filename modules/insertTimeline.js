import { createNewElement } from './createNewElement.js';

export function insertTimeline2(workExperience, education) {
   // const experienceContainer = document.getElementById('experienceContainer');
   // const contentContainer = createNewElement('div', null, 'contentContainer', null, experienceContainer);
   // const timelineContainer = createNewElement('div', null, 'timelineContainer', null, contentContainer);
   // // const eventsContainer = createNewElement('div', null, 'eventsContainer', null, timelineContainer);
   // // const yearsContainer = createNewElement('div', null, 'yearsContainer', null, timelineContainer);

   // const currentYear = new Date().getFullYear();
   // const startYear = 2017;
   // const totalYears = currentYear - startYear;
   // const totalMonths = totalYears * 12;

   // const grid = createNewElement('div', null, 'grid', 'grid', timelineContainer);
   // for (let i = startYear; i <= currentYear; i++) {
   //    createNewElement('div', i, null, 'year', grid);
   //    for (let month = 1; month < 12; month++) {
   //       createNewElement('div', null, null, 'month', grid);
   //    }
   // }

   // // for (let i = startYear; i <= currentYear; i++) {
   // //    let thisYear = false;
   // //    if (i == currentYear) {
   // //       thisYear = true;
   // //    }
   // //    const year = createNewElement('div', null, null, 'yearLabel', yearsContainer);
   // //    const yearText = createNewElement('p', i, null, 'yearText', year);

   // //    if (thisYear) {
   // //       year.style.flexGrow = (new Date().getMonth() + 1) / 12;
   // //    }
   // //    for (let index = 1; index <= 12; index++) {
   // //       if (thisYear && index > (new Date().getMonth() + 1)) {
   // //          break;
   // //       }
   // //       const month = createNewElement('div', null, `${i}-${index.toString().padStart(2, '0')}`, 'month', year);
   // //    }
   // // }

   // workExperience.forEach(job => createEventMarker(job, grid));
   // // education.forEach(edu => createEventMarker(edu, 'edu'));

   // document.querySelectorAll('.event').forEach(event => {
   //    const startYear = 2017;
   //    const year = parseInt(event.dataset.year);
   //    const month = parseInt(event.dataset.month);
   //    const yearOffset = (year - startYear) * 12;
   //    const column = yearOffset + month; // Månader startar på 1

   //    event.style.gridColumn = column; // Placera i rätt månad

   //    // Lägg händelser på olika rader automatiskt
   //    let row = 2;
   //    while (document.querySelector(`.grid > .event[style*="grid-row: ${row}"][style*="grid-column: ${column}"]`)) {
   //       row++;
   //    }
   //    event.style.gridRow = row;
   // });

   const experienceContainer = document.getElementById('experienceContainer');
   const contentContainer = createNewElement('div', null, 'contentContainer', null, experienceContainer);
   const timelineContainer = createNewElement('div', null, 'timelineContainer', null, contentContainer);

   const currentYear = new Date().getFullYear();
   const startYear = 2017;
   const totalYears = currentYear - startYear + 1;
   const totalMonths = totalYears * 12;

   // Skapa huvud-grid för tidslinjen
   const grid = createNewElement('div', null, 'grid', 'grid', timelineContainer);
   grid.style.gridTemplateColumns = `repeat(${totalMonths}, minmax(20px, 1fr))`;

   // Lägg till år
   for (let i = startYear; i <= currentYear; i++) {
      const year = createNewElement('div', i, null, 'year', grid);
      year.style.gridColumn = 'span 12';
   }

   // Lägg till månader
   for (let i = 0; i < totalMonths; i++) {
      createNewElement('div', null, null, 'month', grid);
   }

   // Lägg till händelser
   workExperience.forEach(job => createEventMarker(job, grid));
   education.forEach(edu => createEventMarker(edu, grid));
}

function createEventMarker(data, type) {
   // const eventBar = createNewElement('div', data.title, null, 'eventBar', document.getElementById('eventsContainer'));
   // eventBar.setAttribute('data-month', data.startTime);
   // const event = createNewElement('div', data.title, null, 'event', document.getElementById('grid'));
   // event.setAttribute('data-year', data.startTime.replace(/-.*/, ''));
   // event.setAttribute('data-month', data.startTime.replace(/.*-/, ''));

   const startYear = 2017;
   const [year, month] = data.startTime.split('-').map(Number);
   const yearOffset = (year - startYear) * 12;
   const column = yearOffset + month;

   const event = createNewElement('div', data.title, null, 'event', grid);
   event.style.gridColumnStart = column;
   event.style.gridColumnEnd = column + (data.duration || 1); // Antal månader

   // Hitta ledig rad
   let row = 2;
   while (document.querySelector(`.grid > .event[style*="grid-row: ${row}"][style*="grid-column: ${column}"]`)) {
      row++;
   }
   event.style.gridRow = row;
}


export function insertTimeline(workExperience, education) {
   const experienceContainer = document.getElementById('experienceContainer');
   const contentContainer = createNewElement('div', null, 'contentContainer', null, experienceContainer);
   const timelineContainer = createNewElement('div', null, 'timelineContainer', null, contentContainer);
   // const eventsContainer = createNewElement('div', null, 'eventsContainer', null, timelineContainer);
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
}