import { Component, OnInit ,Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Library } from '../../models';
import { Platform } from 'ionic-angular';

@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailsPage implements OnInit {
  constructor(public navCtrl: NavController,
  	public platform: Platform,
	private navParams: NavParams) {
  }

  @Input() public library: Library;
  @Input() public mapThumbnailUri: String;

  ngOnInit() {
  	this.library = this.navParams.get('library');
  	this.mapThumbnailUri = this.getMapsThumbnail();
  }

  getMapsThumbnail() {
    // 640 is max free maps api call
  	let platformWidth = Math.min(this.platform.width(), 640);
  	let platformHeight = Math.min(this.platform.height()/2, 640); // fixing this for simplicity
  	let latitude = this.library.location.latitude;
  	let longitude = this.library.location.longitude;
  	let apiKey = 'AIzaSyAMv4m5Y7mRBrFh1nZOtCyvA-iHTYUDl4E'
  	let googleMapUri = 'https://maps.googleapis.com/maps/api/staticmap';
  	let mapSize = `${platformWidth}x${platformHeight}`;
  	let mapThumbnailUri = `${googleMapUri}?&size=${mapSize}&markers=label:${this.library.name_}%7C${latitude},${longitude}&key=${apiKey}`;

  	return mapThumbnailUri;
  }
}
