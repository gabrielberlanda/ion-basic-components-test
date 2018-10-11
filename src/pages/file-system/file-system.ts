import { Component } from '@angular/core';
import { File, Entry } from '@ionic-native/file';
import { ModalController, ToastController, AlertController, Platform } from 'ionic-angular';
import { FileFormModal } from './file-form/file-form';

@Component({
  selector: 'page-file-system',
  templateUrl: 'file-system.html',
})
export class FileSystemPage {

  files: Entry[];
  error: any;
  path: string;

  constructor(
    public file: File,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
    private platform: Platform
  ) {}

  async ionViewDidLoad() {
    console.log(`
      Application directory ${this.file.applicationDirectory}
      Application storage directory ${this.file.applicationStorageDirectory}
      Data directory ${this.file.dataDirectory}
    `);
    
    this.path = await this.getPath();
    console.log("Path", this.path);

    this.listFiles();
  }

  async listDir(path) {
    return new Promise<any>((resolve, reject) => {
      this.file
        .resolveDirectoryUrl(path)
        .then((fileSystem) => {
          const reader = fileSystem.createReader();
          reader.readEntries(
            (entries) => resolve(entries), 
            (err) => reject(err)
          );
        }, err => console.error('Ocorreu um erro ao tentar resolveLocalFileSystemUrl com o path ' + path))
    })
  }

  async listFiles() {
    this.listDir(this.path).then((entries) => {
      this.files = entries;
      this.error = null;
    }, (err) => {
      this.toastController.create({message: `Erro ao ler ${err}`, duration: 2000}).present();
      this.error = err;
    });
  }

  async getPath(): Promise<string> {
    return new Promise<string>(async(resolve, reject) => {
      const directoryEntry = await this.file.resolveLocalFilesystemUrl(this.file.cacheDirectory);
      resolve(directoryEntry.toURL());
    })
  }
  

  onAddTXTFile() {
    const fileFormModal = this.modalController.create(FileFormModal, { batata: 123 });
    const onDismissCallback = (data: any) => {
      if(data) {
        this.file
            .writeFile(this.path + '', `${data.name}.txt`, data.content)
            .then((data) => {
              console.log('Data', data);
              this.toastController.create({message: 'Arquivo criado com sucesso', duration: 2000}).present();
              this.listFiles();
            }, err => console.error('Ocorreu um erro ao criar o arquivo', err));
      }
    }
    fileFormModal.present();
    fileFormModal.onDidDismiss(onDismissCallback);
  }

  onReadTXTFile(file: Entry) {
    console.log('file', file);
    if(file.name.indexOf('.txt') > -1) {
      this.file.readAsText(this.path + '', file.name).then((text) => {
        this.alertController.create({title: file.name, message: text}).present();
      }, err => console.error(err));
    } else {
      this.toastController.create({message: 'Apenas arquivos .txt', duration: 2000}).present();
    }
  }

  onRemoveTXTFile(file: Entry) {
    if(file.name.indexOf('.txt') > -1) {
      file.remove(() => {
        this.toastController.create({message: 'Arquivo removido com sucesso', duration: 2000}).present();
        this.listFiles();
      }, (err) => {
        console.error(err);
        this.toastController.create({message: 'Erro ao apagar o arquivo', duration: 2000}).present();
      });
    } else {
      this.toastController.create({message: 'Apenas arquivos .txt', duration: 2000}).present();
    }
  }

}
