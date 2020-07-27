import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject, from } from 'rxjs';
import { MouseEvent } from '@agm/core';
import * as map from '../index'
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';
import { DeviceCoordinates, DevicePositions } from 'src/app/shared/models/deviceConfig';
import { WebsocketService } from 'src/app/shared/services/trackingService/tracking.service';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/map';
import { Message } from '../../shared/models/tracking'
import { TrackingDataService } from 'src/app/shared/services/trackingService/trackingData.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { LayoutModel } from 'src/app/shared/models/layout';
import { DeviceService } from 'src/app/shared/services/devices.service';
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}


@Component({
  selector: 'com-map',
  templateUrl: './commap.component.html',
  styleUrls: ['./commap.component.scss']
})
export class ComMapComponent implements OnInit {
  zoom: number = 12;
  @Input() lat: number = 31.505572;
  @Input() lng: number = 74.335348;
  @Input() mapPolyline: any;
  @Output() clicked: EventEmitter<any> = new EventEmitter();
  deviceId: number;
  mode: any
  mapMode;
  dark;
  light;
  devicePositions: DevicePositions
  isLoading: boolean = false;
  public messages: Subject<Message>;
  liveData: any[] = [];
  checkMode: any;
  course: number;
  iconurl: any;
  iconurl2: any
  category: string;
  mapPointerUrl: string;
  polyline: any[] = [];
  deviceName: string;
  deviceSpeed: number;
  markers: any[] = [];
  deviceRotaion:any;
  constructor(
    private _reportConfigService: ReportConfigService,
    private _trackingDataService: TrackingDataService,
    private _deviceService: DeviceService,
    private _layoutService: LayoutService,
  ) {


    // this.messages.map(
    //   (response: Message): Message => {
    //     let data = JSON.parse(response.data);
    //     return data;
    //   }
    // );
  }



  ngOnInit() {
    this.checkMode = localStorage.getItem('checkMode');
    this.dark = map.mapStyle;
    this.light = map.mapLight;
    if (this.checkMode == 'true') {
      this.mode = this.dark
      // alert(this.mode)
    } else {
      this.mode = this.light
    }
    this._layoutService.themeModeDetect.subscribe(res => {
      localStorage.setItem('checkMode', res);
      this.checkMode = localStorage.getItem('checkMode');
      if (this.checkMode == 'true') {
        this.mode = this.dark
      } else {
        this.mode = this.light
      }
    })





    this.getLiveTracking()
    this.getAllMarkers();
  }
  zoomIn() {
    this.zoom++
  }
  zoomOut() {
    this.zoom--
  }
  getAllMarkers() {
    // this._deviceService.getAllDevices().subscribe(res => {

    // })
    this._reportConfigService.getDeviceCoordinates().subscribe((res) => {

      res.forEach(element => {
        this.markers.push({
          lat: element.latitude,
          lng: element.longitude,
          course: element.course,
          icon: 'assets/images/navigation.png'
        })
        this.deviceRotaion = {
          path: '',
          'transform': 'rotate(' + this.markers + 'deg)'
        }
      });
      // console.log('latlng: ' + JSON.stringify(this.markers))
      
    })
  }
  getDevceCoordinates() {
    // this.isLoading = true;
    this._reportConfigService.devicePositionEmiter.subscribe((res: DeviceCoordinates) => {

      this.lat = res.lat;
      this.lng = res.lng;
      // console.log(this.lat + ' - ' + this.lng)
      // alert(JSON.stringify(res))
    })
  }
  getLiveTracking() {
    this._reportConfigService.devicePositionEmiter.subscribe((res: DeviceCoordinates) => {

      this.deviceId = res.id
      this.lat = res.lat;
      this.lng = res.lng;
      this.course = res.course;
      this.category = res.category;
      this.deviceName = res.name;
      this.deviceSpeed = res.speed;
      this.zoom = 16
      this.iconurl = {
        path: '',
        'transform': 'rotate(' + this.course + 'deg)',
        'transition': '1s all'
      }
      this.iconurl2 = {
        path: '',
        'transform': 'rotate(' + (-this.course) + 'deg)',
        'transition': '1s all'
      }
      if (this.category == 'motorcycle') {
        this.mapPointerUrl = 'assets/images/scooty3.png';
      } else if (this.category == 'car') {
        this.mapPointerUrl = 'assets/images/car2.png';
      } else if (this.category == null) {
        this.mapPointerUrl = 'assets/images/navigation.png';
      }


      this._trackingDataService.positionsUpdated.subscribe(result => {
        if (result) {
          var newData = this._trackingDataService.getPositionById(this.deviceId);
          if (newData) {
            if (this.lat == newData.latitude && this.lng == newData.longitude) {
              //empty
              // console.log('Old =')
            }
            else {
              this.lat = newData.latitude;
              this.lng = newData.longitude;
              this.course = newData.course;
              this.iconurl = {
                path: '',
                'transform': 'rotate(' + this.course + 'deg)'
              }
              this.polyline.push({ lat: this.lat, lng: this.lng });
            }
          }
        }

      });


    })
  }
  // clickedMarker(label: string, index: number) {
  //   console.log(`clicked the marker: ${label || index}`)
  // }

  // mapClicked($event: MouseEvent) {
  //   this.markers.push({
  //     lat: $event.coords.lat,
  //     lng: $event.coords.lng,
  //     draggable: true
  //   });
  // }

  // markerDragEnd(m: marker, $event: MouseEvent) {
  //   console.log('dragEnd', m, $event);
  // }

  // markers: marker[] = [
  //   {
  //     lat: 51.673858,
  //     lng: 7.815982,
  //     label: 'A',
  //     draggable: true
  //   },
  //   {
  //     lat: 51.373858,
  //     lng: 7.215982,
  //     label: 'B',
  //     draggable: false
  //   },
  //   {
  //     lat: 51.723858,
  //     lng: 7.895982,
  //     label: 'C',
  //     draggable: true
  //   }
  // ]


}
