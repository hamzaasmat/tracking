import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LayoutService } from '../shared/services/layout.service';
import { SearchService } from '../shared/services/search.service';
import {
  IUsers,
  ToolBar,
  ModalDialog,
  DeviceStats, Device,
  DeviceRouute,
  DeviceCoordinates,
  DeviceConfig,
  AddEditModel
} from '../shared/models';
import { DeviceConfigComponent } from '../deviceconfig/deviceconfig.component';
import { ReportConfigService } from '../shared/services/reportConfig.service';
import { DeviceService } from '../shared/services/devices.service';
import * as moment from 'moment'
import { MatDialog } from '@angular/material/dialog';
import { WidgetDialogComponent } from '../shared/widgets/widget_dialog/widget_dialog.component';
import { AddEditModalComponent } from './operation/add-edit/add_editModal.component';
import { TrackingDataService } from '../shared/services/trackingService/trackingData.service';
import { MatSnackBar } from '@angular/material';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1000ms', style({ opacity: 1 }))
  ])
]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeAnimation]
})
export class HomeComponent implements OnInit {
  @ViewChild('area', { static: false }) area: ElementRef;
  // AllUsers: Observable<IUsers[]> = null;
  dataFromBottomSheet: DeviceRouute;
  deviceStats: DeviceConfig;
  allRoutes: DeviceRouute;
  allDevices: any[] = [];
  allDevicesSearch: any[] = [];
  onlineDevices: any[] = [];
  offlineDevices: any[] = [];
  deviceAttributesId: number;
  isLoading: boolean = true;
  isLoadingModal: boolean = false;
  lat: number; lng: number;
  isIndexMatched: number;
  isIndexMatchedToggle: boolean = false;
  valueSelectedFromDate: string;
  valueSelectedToDate: string;
  checkStatus: any;
  id: number;
  enabledNav: boolean;
  enabledNavLeft: boolean;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _layoutService: LayoutService,
    private _reportConfigService: ReportConfigService,
    private _deviceService: DeviceService,
    private _dialog: MatDialog,
    private _searchService: SearchService,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit() {

    var titles: ToolBar = { title: '', subTitle: "Dashboard" };
    this._layoutService.setTitlesToolBar(titles);
    this._reportConfigService.configDataEmiter.subscribe((res) => {
      // console.log(res);
    })


    this.getAllVehicles();
    this.enabledRightNav();
    this.enabledLeftNav();
    this._layoutService.isRefreshedData.subscribe(res => {
      if (res == true) {
        this.getAllVehicles();
      }
    })

  }
  maxDistanceArray: any[] = []
  maxDistanceDevice: any[] = []
  largest = 0;
  deviceID
  MaxDistanceDeviceName: string;
  toggle = {};
  areaPressed(i) {
    this.isIndexMatched = i
  }

  devices = {};
  getAllVehicles() {
    this._deviceService.getAllDevices().subscribe(res => {
      this.allDevices = res;
      this.allDevicesSearch = res;
      this.id = res.id
      this.isLoading = false;
      // get max distance
      this._reportConfigService.getDeviceCoordinates().subscribe(res => {
        res.forEach(element => {
          this.maxDistanceArray.push(
            {
              value: element.attributes.totalDistance,
              id: element.deviceId
            }
          );
          this.maxDistanceArray.forEach(element => {
            if (element.value > this.largest) {
              this.largest = element.value;
              this.deviceID = element.id
            }
          });
        });

        this.allDevices.forEach(element => {

          this.checkStatus = moment().diff(moment(element.lastUpdate), 'days');
          if (this.checkStatus <= 1) {
            this.onlineDevices.push(element);
          } else {
            this.offlineDevices.push(element)
          }
          if (element.id == this.deviceID) {
            this.MaxDistanceDeviceName = element.name;
          }
        });
      });



    })
  }
  updateDevice(item) {
    let addEditModelData: AddEditModel = {
      id: item.id,
      name: item.name,
      uniqueId: item.uniqueId,
      model: item.model,
      contact: item.contact,
      category: item.category
    }
    const dialogRef = this._dialog.open(AddEditModalComponent, { data: addEditModelData });
  }
  addDevice() {
    const dialogRef = this._dialog.open(AddEditModalComponent,
      {
        data: null,
      });
  }
  deleteDevice(id) {
    let modalDialog: ModalDialog = {
      title: 'Confirmation',
      message: 'Are you sure?',
      action: true
    }
    const dialogRef = this._dialog.open(WidgetDialogComponent, { data: modalDialog, width: '300px', });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this._deviceService.deleteDevice(id).subscribe(() => {
          this._layoutService.isRefreshed(true);
          let snackBarRef = this._snackBar.open('Deleted successfuly!');
        });

      }
    })
  }
  getCordinates(cordinates: DeviceCoordinates) {

    this._reportConfigService.getDeviceCoordinates().subscribe(res => {
      res.forEach(element => {
        if (cordinates.id == element.deviceId) {
          this.deviceAttributesId = element.deviceId;
          let data: DeviceCoordinates = {
            id: cordinates.id,
            name: cordinates.name,
            lat: element.latitude,
            lng: element.longitude,
            course: element.course,
            category: cordinates.category,
            speed: element.speed
          }
          this._reportConfigService.setDevicePosition(data)
        }
      });

    })
  }
  openBottomSheet(data) {
    this._reportConfigService.setData(data);
    const bottomSheetRef = this._bottomSheet.open(DeviceConfigComponent);

    bottomSheetRef.afterDismissed().subscribe((value: DeviceRouute) => {
      this.dataFromBottomSheet = value
    });

  }

  example() {
    let modalDialog: ModalDialog = {
      title: 'All Device',
      message: this.allDevices.length + ' Device Online'
    }
    const dialogRef = this._dialog.open(WidgetDialogComponent, { data: modalDialog });
  }

  enabledRightNav() {
    this._layoutService.isRightNavEnabled.subscribe(res => {
      this.enabledNav = res;
    })
  }
  enabledLeftNav() {
    this._layoutService.isLeftNavEnabled.subscribe(res => {
      this.enabledNavLeft = res;
    })
  }
  search(name: string) {
    if (!name) {
      this.allDevices = this.allDevicesSearch;
    } else {
      this.allDevices = this._searchService.search({ data: this.allDevicesSearch, onlineOnly: false, name: name });
    }
  }
}
