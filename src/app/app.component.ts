import { Component } from '@angular/core';
import { TREENODES } from './sun-tree/model';
import { TreeNode, TreeService } from './sun-tree/tree.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog-app';
  nodes: TreeNode[] = TREENODES;
  editor: any;

  public options: Object = {
    toolbarButtons: {
      // Key represents the more button from the toolbar.
      moreText: {
        // List of buttons used in the  group.
        buttons: ['bold', 'fontSize', 'backgroundColor', 'textColor', 'underline', 'italic', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'inlineClass', 'inlineStyle', 'clearFormatting'],
        // Alignment of the group in the toolbar.
        align: 'left',
        // By default, 3 buttons are shown in the main toolbar. The rest of them are available when using the more button.
        buttonsVisible: 3
      },
      moreParagraph: {
        buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        align: 'left',
        buttonsVisible: 3
      },
      moreRich: {
        buttons: ['insertImage', 'insertTable', 'insertLink', 'insertVideo', 'specialCharacters', 'insertFile', 'insertHR'],//'emoticons','fontAwesome','embedly',
        align: 'left',
        buttonsVisible: 3
      },
      moreMisc: {
        buttons: ['undo', 'redo', 'fullscreen', 'print', 'spellChecker', 'selectAll', 'html', 'help'],
        align: 'right',
        buttonsVisible: 2
      }
    },
    alwaysVisible: true,
    documentReady: false,

    toolbarVisiable: false,
    pasteAllowedStyleProps: ['font-size', 'color'],
    placeholderText: '请输入内容!',
    language: 'zh_cn',
    tabSpaces: 4,
    saveInterval: 0,//0为不自动保存，默认为1000
    saveURL: 'http://localhost:4200/autosave?key=qwqewqeqeqe',
    saveParams: { id: 1 },
    charCounterCount: true,
    theme: 'dark',
    height: '80vh',
    zIndex: 2003,
    // toolbarSticky: true,
    // upload file
    fileUploadURL: 'http://localhost:4200/UploadFiles',
    fileMaxSize: 20 * 1024 * 1024,
    fileAllowedTypes: ['*'],
    // upload image
    imageInsertButtons: ['imageUpload', 'imageByURL'],
    imageUploadMethod: 'POST',
    imageUploadParams: { id: 1 },
    imageUploadURL: 'http://localhost:4200/upload_image?key=qwqewqeqeqe', // https://froala.com/wysiwyg-editor/docs/server/dotnet_core/file-upload/
    imageMaxSize: 5 * 1024 * 1024,
    imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg+xml'],
    // upload video
    videoMaxSize: 50 * 1024 * 1024,
    videoAllowedTypes: ['avi', 'mov', 'mp4', 'm4v', 'mpeg', 'mpg', 'wmv', 'ogv'],
    videoUploadURL: 'http://localhost:4200/upload_image?key=qwqewqeqeqe', //{"link": "图片的绝对地址"}
    videoUploadParams: { id: 1 },
    events: {
      'initialized': (editor: any) => {
        this.editor = editor;
        //editor._editor.edit.off();
      }
    }
  }

  public editorContent: string = '<p id="isPasted" style=" color: rgb(230, 230, 230); font-size: 16px;"><span style="color: rgb(65, 168, 95);">.NET MAUI 为本机设备功能提供跨平台 API。 用于访问设备功能的 .NET MAUI 提供的功能示例包括：</span></p><ul style=" color: rgb(230, 230, 230); font-size: 16px;"><li style="color: rgb(65, 168, 95);">访问设备上的传感器，例如加速计、指南针和陀螺仪。</li><li style="color: rgb(65, 168, 95);">能够检查设备的网络连接状态并检测更改。</li><li style="color: rgb(65, 168, 95);">提供有关应用正在运行的设备的信息。</li><li style="color: rgb(65, 168, 95);">在应用之间将文本复制并粘贴到系统剪贴板。</li><li style="color: rgb(65, 168, 95);">从设备中选择一个或多个文件。</li><li style="color: rgb(65, 168, 95);">以键/值对的形式安全地Microsoft Store数据。</li><li style="color: rgb(65, 168, 95);">利用内置文本转语音引擎从设备读取文本。</li><li style="color: rgb(65, 168, 95);">启动基于浏览器的身份验证流，该流侦听特定应用注册的 URL 的回调。</li></ul><table style="width: 100%;"><tbody><tr><td style="width: 33.3333%;">啦啦啦</td><td style="width: 33.3333%;">得得</td><td style="width: 33.3333%;">阿萨大大</td></tr><tr><td style="width: 33.3333%;">大飒飒</td><td style="width: 33.3333%;">大撒大撒</td><td style="width: 33.3333%;">大撒大撒</td></tr></tbody></table>';

  public constructor(public service: TreeService) {
    this.service.nodes = this.nodes;
    this.service.onMove.subscribe({ next: (node: TreeNode) => { console.log(node) }, error: (err: any) => { console.log(err) } })
    this.service.onSelected.subscribe({ next: (node: TreeNode) => { console.log(node) }, error: (err: any) => { console.log(err) } })
  }

  save() {
    //this.editor._editor.edit.on();
    this.editor._editor.edit
    console.log(this.options)
    console.log(this.editorContent);
  }

  onAddNode() {
    this.service.addNode();
  }
  onUpdateNode() {
    this.service.updateNode();
  }
  onDeleteNode() {
    try {
      this.service.removeNode();
    } catch (error) {
      console.error(error);
    }
  }
}

