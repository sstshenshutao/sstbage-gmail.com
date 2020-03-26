import {Zip} from './zip'

export class DropHandler {
    bindDropInput(dropInput) {
        dropInput.addEventListener("change", function (event) {
            let files = event.target.files;
            Zip.zip(files);
        });
    }

    bindDropSpace(dropZone) {
        dropZone.addEventListener("dragenter", function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);

        dropZone.addEventListener("dragover", function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);

        dropZone.addEventListener("dragleave", function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            e.stopPropagation();
            console.log("dropEvent", e);
            let items = e.dataTransfer.items;
            this.dealWithFolders(items).then(files => Zip.zip(files));
        });
    }
    //ref:
    // https://juejin.im/post/5e001b52518825126874d0f4
    // change it for the async call.
    async dealWithFolders(items) {
        if (items.length > 1) {
            this.loading = false;
            console.log("一次只允许上传一个文件夹");
            return;
        }
        let item = items[0].webkitGetAsEntry();
        if (item) {
            return await this.checkFolders(item);
        }
    }

    async checkFolders(item) {
        if (item.isDirectory) {
            return await this.traverseFileTree(item);
        } else {
            this.loading = false;
            console.log("只支持上传文件夹");
            return undefined;
        }
    }


    async traverseFileTree(item) {
        let res = [];

        async function internalProces(item, path, res) {
            if (item.isFile) {
                await new Promise((resolve) => {
                    item.file(file => {
                        file.path = path + file.name;
                        let newFile = new File([file], file.path, {type: file.type});
                        res.push(newFile);
                        resolve();
                    })
                })
            } else if (item.isDirectory) {
                let dirReader = item.createReader();
                let entries = await new Promise((resolve, reject) => {
                    dirReader.readEntries(resolve, reject)
                });
                for (let i = 0; i < entries.length; i++) {
                    await internalProces(entries[i], path + item.name + "/", res);
                }
            }
        }

        await internalProces(item, "", res);
        return res;
    }
}
