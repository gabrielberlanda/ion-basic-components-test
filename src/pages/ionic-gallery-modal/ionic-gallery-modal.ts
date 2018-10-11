import { Component } from '@angular/core';
import { ImageProvider } from '../../providers/image-provider';
import { ModalController } from 'ionic-angular';
import { GalleryModal } from 'ionic-gallery-modal';

@Component({
  selector: 'page-ionic-gallery-modal',
  templateUrl: 'ionic-gallery-modal.html',
})
export class IonicGalleryModalPage {

  images: any[];

  constructor(private imageProvider: ImageProvider, private modalController: ModalController) {}

  ionViewDidLoad() {
    this.imageProvider.loadImages().then((result) => {
      this.images = result.images.map(image => {
        return {
          url: image.large_url,
          title: `Title ${image.id}`,
        }
      });
    }, err => console.error(err));
  }

  onOpenGallery() {
    let modal = this.modalController.create(GalleryModal, { photos: this.images, initialSlide: 0 }, {showBackdrop: false, enableBackdropDismiss: false})
    modal.present();
  }


}
