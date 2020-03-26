<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        文件压缩上传案例
        <label name="myfile" for="myfile" style="display:block;width:200px;height:200px;border:1px solid #ddd"
               :class="{'is-dragover': dragover}"
               @drop.prevent="onDrop"
               @dragover.prevent="onDragover"
               @dragleave.prevent="dragover = false">
            <input type="file" id="myfile" multiple webkitdirectory @change="selectFile"/>
        </label>
    </div>
</template>

<script>
    // @ is an alias to /src
    import JSZip from 'jszip'
    import axios from 'axios'
    import {saveAs} from 'file-saver'

    export default {
        name: 'home',
        components: {},
        data() {
            return {
                dragover: false
            }
        },
        mounted() {
        },
        methods: {
            selectFile(even) {
                var files = even.target.files
                this.commmon(files)
            },
            onDrop(even) {
                this.dragover = false
                var files = even.dataTransfer.files
                this.commmon(files)
            },
            commmon(files) {
                var zip = new JSZip()
                for (var i = 0; i < files.length; i++) {
                    var f = files[i]
                    zip.file(f.name, f)
                }
                zip.generateAsync({type: 'blob'})
                    .then(function (content) {
                        saveAs(content, 'example.zip')
                        let formData = new FormData()
                        formData.append('file', content)
                        axios({
                            method: 'post',
                            url: '/framework/file/create',
                            data: formData,
                            withCredentials: true, // 默认的
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        })
                    })
            },
            onDragover() {
                this.dragover = true
            }
        }
    }
</script>
<style lang="scss">
    .is-dragover {
        border: 2px solid red !important
    }
</style>
