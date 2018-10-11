import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-qr-code-reader',
  templateUrl: 'qr-code-reader.html',
})
export class QrCodeReaderPage {
  public scannedBarcode: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCodeReaderPage');
  }

  onReadQRCode() {
    this.barcodeScanner.scan().then((barcodeData: BarcodeScanResult) => { 
      if(!barcodeData.cancelled) this.scannedBarcode = barcodeData.text;
      else this.toastCtrl.create({message: 'Leitura cancelada', duration: 2000}).present();
    })
    .catch(err => console.error(err));
  }
}
