export function insertCursor() {
   const span = document.createElement('span');
   span.innerText = '|';
   span.id = 'blinkingCursor';
   setInterval(() => {
      span.classList.toggle('hiddenCursor');
   }, 500);

   return span;
}
