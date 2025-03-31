import { startTyping, startTypingBackwards } from './startTyping.js';

export function startTextAnimations() {
   if (window.innerWidth > 768) {
      const text = 'const name = document.createElement(\'h1\');name.id = \'nameText\';name.innerText = \'Vilhelm Fontell\';document.getElementById(\'nameDiv\').appendChild(name);';
      const typeWriterelement = document.getElementById('typewriterDiv');
      startTyping(text, typeWriterelement, 15);
      setTimeout(() => {
         startTyping('Vilhelm Fontell', document.getElementById('nameText'), 100);
         setTimeout(() => {
            startTyping('Webbutvecklare', document.getElementById('nameSubtext'), 50);
            setTimeout(() => {
               document.getElementById('typewriterDiv').remove();
            }, 800);
         }, 1500);
      }, 2500);
   } else {
      document.getElementById('nameText').innerText = 'Vilhelm Fontell';
      document.getElementById('nameSubtext').innerText = 'Webbutvecklare';
   }

   startContactAnimation();
   setInterval(() => {
      startContactAnimation();
   }, 12000);
}


function startContactAnimation() {
   const contactText = 'Vill du veta mer?';
   const title = document.getElementById('contactTitle');
   startTyping(contactText, title, 200);
   setTimeout(() => {
      startTypingBackwards(contactText, title, 50);
      setTimeout(() => {
         startTyping('Hör av dig!', title, 200);
         setTimeout(() => {
            startTypingBackwards('Hör av dig!', title, 50);
         }, 4000);
      }, 2000);
   }, 4000);

}