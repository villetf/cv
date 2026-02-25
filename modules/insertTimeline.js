import { createNewElement } from './createNewElement.js';


export async function insertTimeline(workExperience, education) {
   const experienceContainer = document.getElementById('allExperienceContainer');
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

   // Skapar containrar för varje månad sedan startåret
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

   // Lägger till streck vid varje årsskifte
   const allMonthOne = document.querySelectorAll('[month="1"]');
   allMonthOne.forEach(monthElement => {
      if (monthElement.classList.contains('month')) {
         monthElement.style.borderLeft = '1px solid #fff9e2';
         monthElement.innerText = monthElement.getAttribute('year');
         monthElement.classList.add('january');
      }
   });

   const experiencesList = [];

   // Lägger till alla jobberfarenheter i listan
   workExperience.forEach(work => {
      work.type = 'work';
      experiencesList.push(work);
   });

   // Lägger till alla utbildningar i listan
   education.forEach(education => {
      education.type = 'edu';
      experiencesList.push(education);
   });


   // Skapar ruta för varje merit och justerar bredden
   experiencesList.forEach(experience => {
      if (new Date(experience.endTime) > new Date() || experience.endTime == 'Nuvarande') {
         experience.endTime = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;
      }

      const correctCell = document.getElementById(`${experience.startTime}-${experience.type}Holder`);
      const eventDiv = createNewElement('div', null, null, 'eventDiv', correctCell);
      const marker = createNewElement('div', null, `${experience.startTime}-marker`, `eventMarker ${experience.type}Marker`, eventDiv);
      createNewElement('p', experience.title, null, 'markerText', marker);
      marker.onmouseenter = () => expandEvent(marker, experience);
      adjustEventWidth(experience, marker, correctCell);
      checkOverflow(marker);
   });

   // Kollar ifall meriter överlappar varandra och flyttar dem isåfall uppåt
   adjustEventPositions('work');
   adjustEventPositions('edu');

   // Gör så att tidslinjen som default är skrollad längst till höger
   timelineContainer.scrollLeft = timelineContainer.scrollWidth;


   // Vid ändring av fönsterstorlek, justera bredden på rutor
   window.onresize = () => {
      workExperience.forEach(work => {
         adjustEventWidth(work, document.getElementById(`${work.startTime}-marker`), document.getElementById(`${work.startTime}-workHolder`));
         checkOverflow(document.getElementById(`${work.startTime}-marker`));
      });
      education.forEach(edu => {
         adjustEventWidth(edu, document.getElementById(`${edu.startTime}-marker`), document.getElementById(`${edu.startTime}-workHolder`));
         checkOverflow(document.getElementById(`${edu.startTime}-marker`));
      });
   };
}

// Kolla ifall texten svämmar över, isåfall lägg till klass för att lägga till fade
function checkOverflow(element) {
   if (element.scrollWidth > element.clientWidth) {
      element.querySelector('.markerText').classList.add('fadedMarkerText');
   } else {
      element.querySelector('.markerText').classList.remove('fadedMarkerText');
   }
}

// Expandera event när man håller musen över
function expandEvent(element, data) {
   const timeout = setTimeout(() => {
      element.classList.remove('collapseEvent');
      element.classList.add('expandedEvent');
      element.style.zIndex = 5;
      element.innerText = '';

      if (element.getBoundingClientRect().left + 400 > document.getElementById('timelineContainer').getBoundingClientRect().right) {
         localStorage.setItem('oldTransform', element.style.transform);
         const computedStyle = window.getComputedStyle(element);
         const matrix = new DOMMatrix(computedStyle.transform);
         const currentY = matrix.m42;
         element.style.transform = `translate(-${(458 - element.getBoundingClientRect().width)}px, ${currentY}px)`;
      }
      addEventDetails(element, data);
      if (element.classList.contains('eduMarker')) {
         element.style.top = '-24px';
      }
   }, 400);
   element.onmouseleave = () => {
      if (localStorage.getItem('oldTransform')) {
         element.style.transform = localStorage.getItem('oldTransform');
         localStorage.removeItem('oldTransform');
      }
      element.classList.remove('expandedEvent');
      setTimeout(() => {
         element.style.zIndex = 1;
      }, 500);
      element.classList.add('collapseEvent');
      element.firstChild.remove();
      createNewElement('p', data.title, null, 'markerText', element);
      checkOverflow(element);
      clearTimeout(timeout);
   };
}

// Lägg till detaljer om event när man håller musen över
function addEventDetails(element, data) {
   const expandedDiv = createNewElement('div', null, null, 'expandedDiv', element);
   const workCalendarDiv = createNewElement('div', null, null, 'flex', expandedDiv);
   createNewElement('i', null, null, 'fa-solid fa-calendar-days', workCalendarDiv);
   createNewElement('h4', data.duration, null, null, workCalendarDiv);
   createNewElement('h2', data.title, null, null, expandedDiv);
   const workPinDiv = createNewElement('div', null, null, 'flex', expandedDiv);
   createNewElement('i', null, null, 'fa-solid fa-map-pin', workPinDiv);
   createNewElement('h4', data.place, null, null, createNewElement('i', null, null, null, workPinDiv));
   const workDescription = createNewElement('p', null, null, 'workDescription', expandedDiv);
   workDescription.innerHTML = data.description;
}

// Justera eventbredd
function adjustEventWidth(event, marker, correctCell) {
   const rawDate = new Date(event.endTime);
   const endCell = document.getElementById(`${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(2, '0')}-workHolder`);
   if (marker) {
      marker.style.width = `${(endCell.getBoundingClientRect().left + endCell.getBoundingClientRect().width) - correctCell.getBoundingClientRect().left - 2}px`;
   }
}

// Justera event i höjdled ifall de överlappar
function adjustEventPositions(type) {
   let merits;
   let unit;
   let extraMovement;
   if (type == 'work') {
      merits = document.querySelectorAll('.workMarker');
      unit = '-';
      extraMovement = 0;
   } else {
      merits = document.querySelectorAll('.eduMarker');
      unit = '';
      extraMovement = 25;
   }

   merits.forEach(element => {
      element.style.transform = '';
   });

   const placedItems = [];
   merits.forEach(merit => {
      const rect = merit.getBoundingClientRect();

      // Hitta vilka nivåer som är blockerade av överlappande element
      const blockedLevels = new Set();
      placedItems.forEach(item => {
         if (rect.left < item.right) {
            blockedLevels.add(item.level);
         }
      });

      // Välj lägsta lediga nivå
      let level = 0;
      while (blockedLevels.has(level)) {
         level++;
      }

      merit.style.transform = `translateY(${unit}${(rect.height * level) + extraMovement + (5 * (level + 1))}px)`;
      // Lägger till varje element i listan över tidigare element
      placedItems.push({
         level,
         right: rect.left + rect.width
      });
   });
}
