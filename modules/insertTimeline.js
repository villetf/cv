import { getEducation, getWorkExperience } from './apiCalls.js';
import { createNewElement } from './createNewElement.js';


export async function insertTimeline(workExperience, education) {
   const experienceContainer = document.getElementById('experienceContainer');
   const contentContainer = createNewElement('div', null, 'contentContainer', null, experienceContainer);
   const timelineContainer = createNewElement('div', null, 'timelineContainer', null, contentContainer);
   const yearsContainer = createNewElement('div', null, 'yearsContainer', null, timelineContainer);

   const currentYear = new Date().getFullYear();
   const startYear = 2017;
   const totalFullYears = currentYear - startYear;
   const totalMonths = (totalFullYears * 12) + new Date().getMonth() + 1;

   yearsContainer.gridTemplateColumns = `repeat(${totalMonths}, 1fr)`;

   let loopYear = startYear;
   let loopMonth = 1;
   for (let index = 1; index <= totalMonths; index++) {
      if (loopMonth > 12) {
         loopYear++;
         loopMonth = 1;
      }

      const workHolder = createNewElement('div', null, `${loopYear}-${loopMonth.toString().padStart(2, '0')}-workHolder`, 'workHolder', yearsContainer);
      workHolder.setAttribute('year', loopYear);
      workHolder.setAttribute('month', loopMonth);
      if (loopMonth != 2) {
         const month = createNewElement('div', null, `${loopYear}-${loopMonth.toString().padStart(2, '0')}`, 'month', yearsContainer);
         month.setAttribute('year', loopYear);
         month.setAttribute('month', loopMonth);
      }

      const eduHolder = createNewElement('div', null, `${loopYear}-${loopMonth.toString().padStart(2, '0')}-eduHolder`, 'eduHolder', yearsContainer);
      eduHolder.setAttribute('year', loopYear);
      eduHolder.setAttribute('month', loopMonth);
      loopMonth++;
   }

   const allMonthOne = document.querySelectorAll('[month="1"]');
   allMonthOne.forEach(monthElement => {
      if (monthElement.classList.contains('month')) {
         monthElement.style.borderLeft = '1px solid black';
         monthElement.innerText = monthElement.getAttribute('year');
         monthElement.classList.add('january');
      }
   });

   const experiencesList = [];

   workExperience.forEach(work => {
      work.type = 'work';
      experiencesList.push(work);
   });

   education.forEach(education => {
      education.type = 'edu';
      experiencesList.push(education);
   });

   experiencesList.forEach(experience => {
      const correctCell = document.getElementById(`${experience.startTime}-${experience.type}Holder`);
      const eventDiv = createNewElement('div', null, null, 'eventDiv', correctCell);
      const marker = createNewElement('div', experience.title, `${experience.startTime}-marker`, `eventMarker ${experience.type}Marker`, eventDiv);
      marker.onmouseenter = () => expandEvent(marker, experience);
      adjustEventWidth(experience, marker, correctCell);
   });

   // education.forEach(education => {
   //    const correctCell = document.getElementById(`${education.startTime}-eduHolder`);
   //    const eventDiv = createNewElement('div', null, null, 'eventDiv', correctCell);
   //    const marker = createNewElement('div', education.title, `${education.startTime}-marker`, 'eventMarker eduMarker', eventDiv);
   //    adjustEventWidth(education, marker, correctCell);
   // });

   adjustEventPositions('work');
   adjustEventPositions('edu');

   timelineContainer.scrollLeft = timelineContainer.scrollWidth;

   window.onresize = () => {
      adjustEventPositions('work');
      workExperience.forEach(work => {
         adjustEventWidth(work, document.getElementById(`${work.startTime}-marker`), document.getElementById(`${work.startTime}-workHolder`));
      });
      education.forEach(edu => {
         adjustEventWidth(edu, document.getElementById(`${edu.startTime}-marker`), document.getElementById(`${edu.startTime}-workHolder`));
      });
   };
}

function expandEvent(element, data) {
   const oldInnerText = element.innerText;
   const timeout = setTimeout(() => {
      element.classList.remove('collapseEvent');
      element.classList.add('expandedEvent');
      element.style.zIndex = 5;
      element.innerText = '';
      addEventDetails(element, data);
      if (element.classList.contains('eduMarker')) {
         element.style.top = '-24px';
      }
   }, 400);
   element.onmouseleave = () => {
      element.classList.remove('expandedEvent');
      setTimeout(() => {
         element.style.zIndex = 1;
      }, 500);
      element.classList.add('collapseEvent');
      element.innerText = oldInnerText;
      clearTimeout(timeout);
   };
}

function addEventDetails(element, data) {
   const expandedDiv = createNewElement('div', null, null, 'expandedDiv', element);
   const workCalendarDiv = createNewElement('div', null, null, 'flex', expandedDiv);
   const workCalendar = createNewElement('i', null, null, 'fa-solid fa-calendar-days', workCalendarDiv);
   const workTime = createNewElement('h4', data.duration, null, null, workCalendarDiv);
   const workTitle = createNewElement('h2', data.title, null, null, expandedDiv);
   const workPinDiv = createNewElement('div', null, null, 'flex', expandedDiv);
   const workPin = createNewElement('i', null, null, 'fa-solid fa-map-pin', workPinDiv);
   const workPlace = createNewElement('h4', data.place, null, null, createNewElement('i', null, null, null, workPinDiv));
   const workDescription = createNewElement('p', data.description, null, null, expandedDiv);
}

function adjustEventWidth(event, marker, correctCell) {
   const rawDate = new Date(event.endTime);
   const endCell = document.getElementById(`${rawDate.getFullYear()}-${String(rawDate.getMonth() + 2).padStart(2, '0')}-workHolder`);
   marker.style.width = `${endCell.getBoundingClientRect().left - correctCell.getBoundingClientRect().left - 2}px`;
}

function adjustEventPositions(type) {
   let merits;
   let unit;
   let extraMovement;
   let operator;
   if (type == 'work') {
      merits = document.querySelectorAll('.workMarker');
      unit = '-';
      extraMovement = 0;
      operator = '+';
   } else {
      merits = document.querySelectorAll('.eduMarker');
      unit = '';
      extraMovement = 25;
      operator = '-';
   }

   merits.forEach(element => {
      element.style.transform = '';
   });

   const elementEndpoints = [];
   merits.forEach(merit => {
      const rect = merit.getBoundingClientRect();

      let matchingElements = 0;
      elementEndpoints.forEach(element => {
         // Beräknar med hjälp av caluclateDynamicOp för att kunna välja plus eller minus dynamiskt
         const elementBottom = calculateDynamicOp(element.bottom, extraMovement + ((5 * (matchingElements + 1))), operator);
         // Kollar ifall merit har mindre vänsterutrymme än element (merits vänsterkant är vänster om elements vänsterkant),
         // samt ifall de är på samma nivå i höjdled
         if (rect.left < element.left && rect.bottom == elementBottom) {
            console.log('inne i ifen');
            matchingElements++;
         }
      });

      merit.style.transform = `translateY(${unit}${(rect.height * matchingElements) + extraMovement + ((5 * (matchingElements + 1)))}px)`;

      // Lägger till varje element i listan över tidigare element
      elementEndpoints.push({
         left: rect.left + rect.width,
         bottom: merit.getBoundingClientRect().bottom
      });
   });
}

function calculateDynamicOp(elementBottom, extraMovement, operator) {
   return operator === '+' ? elementBottom + extraMovement : elementBottom - extraMovement;
}