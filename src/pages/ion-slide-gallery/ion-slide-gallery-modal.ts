import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { NavParams, Slides, Slide, ViewController } from 'ionic-angular';
import { PinchZoomComponent } from 'ngx-pinch-zoom';

@Component({
    selector: 'ion-slide-gallery-modal',
    template: `
        <ion-content fullscreen>
            <div style="background: transparent; position: absolute; top: 0; width: 100%; flex: 1; z-index: 9999999;">
                <ion-row justify-content-end align-items-end>
                    <ion-col col-auto>
                        <button ion-button (click)="close()">
                            <ion-icon name="close"></ion-icon>
                        </button>
                    </ion-col>
                </ion-row>                        
            </div>
           <ion-slides pager="false" style="background: #222;" (ionSlideDrag)="slideStart($event)" #slider>
                <ion-slide *ngFor="let photo of photos">
                    
                    <pinch-zoom (touchstart)="onHorizontalSwipe($event)" [zoom-button]="false" (pinch)="onHorizontalSwipe($event)">
                        <img [src]="photo.url"/>
                    </pinch-zoom>
                </ion-slide>
            </ion-slides>
            <div style="background: rgba(0,0,0,0.5); position: absolute; padding-bottom: 16px; padding-top: 16px; bottom: 0; width: 100%; flex: 1; z-index: 9999999;">
                <ion-row justify-content-center align-items-center> 
                    <span style="color: #FFF" ion-text text-wrap>{{ photoTitle }}</span>
                </ion-row>
                <ion-row justify-content-center align-items-center margin-top>
                    <span style="color: #FFF" text-sm >{{pageIndicator}}</span>
                </ion-row>
            </div>
        </ion-content>
    
    `,
    styles: [``]
})
// <ion-toolbar style="position: absolute; bottom: 0; left: 0;">
// <ion-title>bla bla </ion-title>
// </ion-toolbar>
export class IonSlideGalleryModal implements OnInit, AfterViewInit {
    @ViewChild(Slides)
    slides: Slides;
    
    @ViewChildren(PinchZoomComponent)
    pinchZoomComponent: QueryList<PinchZoomComponent>;

    photos: any[];
    initialSlide: number;

    constructor(private navParams: NavParams, private viewController: ViewController) {
        this.photos = navParams.get('photos');
        this.initialSlide = navParams.get('initialSlide')
    }

    ngAfterViewInit(): void {
        console.log('Slidessssssssss', this.slides);
        console.log('this.pinchZoomComponent', this.pinchZoomComponent);
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        // this.slides.zoomMax = 10;
        // this.slides.freeMode = true;
        // this.slides.freeModeSticky = true;
    }

    
    ngOnInit(): void { }

    close() {
        this.viewController.dismiss();
    }

    get activeIndex() {
        const activeIndex = this.slides.getActiveIndex();
        // return activeIndex;
        return activeIndex + 1 > this.photos.length ? activeIndex -1 : activeIndex; //Handle last element
    }

    get photoTitle() {
        if(!this.slides || !this.photos) return;
        const photo = this.photos[this.activeIndex];
        return photo ? photo.title : ''
    }
    /**
     * 
     */
    get pageIndicator() {
        if(!this.slides || !this.photos) return;

        return `(${this.activeIndex + 1}/${this.photos.length})`;
    }
    slideStart(ev) {
        console.log('Ev slide start', ev, this.pinchZoomComponent);
        const pinchZoomComponent: PinchZoomComponent = this.pinchZoomComponent.toArray()[this.slides.getActiveIndex()];
        
        if(!pinchZoomComponent) return;

        if(pinchZoomComponent.scale !== 1) this.slides.lockSwipes(true);
        else this.slides.lockSwipes(false);
    }

    onHorizontalSwipe(ev) {
        this.slides.slideTo(this.slides.getActiveIndex());
        console.log('Ev horizontal swipe', ev, this.pinchZoomComponent);
    }
}
