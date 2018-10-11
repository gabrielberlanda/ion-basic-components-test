import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { File } from '../file';

@Component({
    selector: 'page-file-modal',
    templateUrl: 'file-form.html',
})
export class FileFormModal {
    
    file: File;

    constructor(
        private params: NavParams,
        private viewCtrl: ViewController
    ) {
        this.file = new File();
    }

    ionViewDidLoad(){
        console.log('Data no form', this.viewCtrl.data);
        console.log('Params data', this.params.data);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    onSaveFile() {
        this.viewCtrl.dismiss(this.file);
    }
}
