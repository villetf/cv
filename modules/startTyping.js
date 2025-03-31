export function startTyping(text, element, speed) {
   let index = 0;
   element.innerText = '';

   function typeLetter() {
      if (index < text.length) {
         element.innerHTML += checkFontColor(text.charAt(index), index, text.match('const'));
         if (text.charAt(index) == ';') {
            element.appendChild(document.createElement('br'));
         }
         index++;
         setTimeout(typeLetter, speed);
      }
   }

   index = 0;
   typeLetter();
}

export function startTypingBackwards(text, element, speed) {
   let index = text.length;
   element.innerText = text;

   function typeLetter() {
      if (index > 0) {
         text = text.slice(0, -1);
         element.innerHTML = text;
         index--;
         setTimeout(typeLetter, speed);
      }
   }

   index = text.length;
   typeLetter();
}

function checkFontColor(letter, index, isCodeString) {
   if (!isCodeString) {
      return letter;
   }

   if ([0, 1, 2, 3, 4].includes(index)) {
      return `<span style="color:#6393C7;">${letter}</span>`;
   }

   if ([6, 7, 8, 9, 42, 43, 44, 45, 63, 64, 65, 66, 145, 146, 147, 148].includes(index)) {
      return `<span style="color:#6FBFF9;">${letter}</span>`;
   }

   if ([13, 14, 15, 16, 17, 18, 19, 20, 47, 48].includes(index) || (index >= 68 && index <= 76) || (index >= 98 && index <= 105)) {
      return `<span style="color:#A0CDEA;">${letter}</span>`;
   }

   if ((index >= 22 && index <= 34) || (index >= 107 && index <= 120) || (index >= 133 && index <= 143)) {
      return `<span style="color:#DCDCAF;">${letter}</span>`;
   }

   if (['(', ')'].includes(letter)) {
      return `<span style="color:#F9D849;">${letter}</span>`;
   }

   if ([36, 37, 38, 39].includes(index) || (index >= 80 && index <= 96) || (index >= 52 && index <= 61) || (index >= 122 && index <= 130)) {
      return `<span style="color:#B78974;">${letter}</span>`;
   }

   return `<span style="color:#C3C3C3;">${letter}</span>`;
}