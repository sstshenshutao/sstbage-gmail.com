import {DropHandler} from './drop-handler'


let dropSpace = document.getElementById('dropSpace');
let dropInput = document.getElementById("dropInput");

let d = new DropHandler();
// bind the dropSpace
// bind the dropInput
d.bindDropSpace(dropSpace);
d.bindDropInput(dropInput);





