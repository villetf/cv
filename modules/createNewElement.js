export function createNewElement(elementType, text, id, classes, parent) {
   const element = document.createElement(elementType);

   if (text) {
      element.innerText = text;
   }

   if (id) {
      element.id = id;
   }

   if (classes) {
      element.classList.add(...classes.split(' '));
   }

   if (parent) {
      parent.appendChild(element);
   }
   return element;
}