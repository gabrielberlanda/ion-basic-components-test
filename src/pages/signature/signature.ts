import { Component, ViewChild, ElementRef } from '@angular/core';

import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

  @ViewChild('signaturePad')
  public signaturePad: SignaturePad;
  @ViewChild('signatureContainer')
  public signatureContainer: ElementRef;
  public signature: string;
  public isDrawing: boolean = false;

  public signatureConfig: any = {
    minWidth: 2,
    canvasWidth: 500,
    canvasHeight: 300
  }

  constructor() {}

  ionViewDidLoad(){
    this.signaturePad.set('canvasWidth', this.signatureContainer.nativeElement.clientWidth);
  }
  
  onDrawStart() {
    this.isDrawing = true;
    console.log('Drawing begins');
  }

  onDrawComplete() {
    this.isDrawing = false;
    console.log('Not drawing');
    // console.log('Draw complete', this.signaturePad.toDataURL());
  }

  onClearDraw() {
    this.signaturePad.clear();
  }

  onSaveDraw() {
    this.signature = this.signaturePad.toDataURL();
  }
}
