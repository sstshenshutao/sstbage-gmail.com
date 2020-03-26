import JSZip from 'jszip'
import {saveAs} from 'file-saver'

export class Zip {
    static zip(files) {
        //check the "webkitRelativePath"
        let zip = new JSZip();
        for (let file of files) {
            console.log("file['webkitRelativePath']", file['webkitRelativePath']);
            if (file['webkitRelativePath']) {
                console.log("webkitRelativePath");
                // can be used as the filename in zip
                zip.file(file['webkitRelativePath'], file);
            } else {
                //use the name
                console.log("use the name:", file['name']);
                zip.file(file['name'], file);
            }
        }

        zip.generateAsync({type: 'blob'})
            .then(content => {
                saveAs(content, 'example.zip')
            })
    }
}
