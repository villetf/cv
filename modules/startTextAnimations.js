import { startTyping, startTypingBackwards } from './startTyping.js';

export function startTextAnimations() {
   if (window.innerWidth > 768) {
      const text = 'const name = document.createElement(\'h1\');name.id = \'nameText\';name.innerText = \'Vilhelm Fontell\';document.getElementById(\'nameDiv\').appendChild(name);';
      const typeWriterelement = document.getElementById('typewriterDiv');
      startTyping(text, typeWriterelement, 15);
      setTimeout(() => {
         startTyping('Vilhelm Fontell', document.getElementById('nameText'), 100);
         setTimeout(() => {
            document.getElementById('typewriterDiv').remove();
            setTimeout(() => {
               startTyping('Webbutvecklare', document.getElementById('nameSubtext'), 50);
               setTimeout(() => {
               }, 800);
            }, 1500);
         }, 50);
      }, 2500);
   } else {
      document.getElementById('nameText').innerText = 'Vilhelm Fontell';
      document.getElementById('nameSubtext').innerText = 'Webbutvecklare';
   }


   let contactInterval;
   startContactInterval();
   document.onvisibilitychange = () => {
      if (document.visibilityState === 'hidden') {
         stopContactInterval();
      } else {
         stopContactInterval();
         startContactInterval();
      }
   };

   function startContactInterval() {
      if (!document.getElementById('contactTitle').innerText) {
         startContactAnimation();
      }

      if (!contactInterval) {
         contactInterval = setInterval(() => {
            startContactAnimation();
         }, 12000);
      }
   }

   function stopContactInterval() {
      clearInterval(contactInterval);
      contactInterval = null;
   }
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