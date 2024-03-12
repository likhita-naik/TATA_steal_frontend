import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SteamSuitDetailsModule } from './steam-suit-details.module';
import { SteamSuitService } from '../steam-suit-detection/steamSuitDetection.service';
import { Lightbox } from 'ngx-lightbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-steam-suit-details',
  templateUrl: './steam-suit-details.component.html',
  styleUrls: ['./steam-suit-details.component.css']
})
export class SteamSuitDetailsComponent implements OnInit, OnDestroy, OnDestroy, AfterViewInit {
  Details: any[] = []
  violationDetails: any = null
  showHistory: boolean = false
  isLoading: boolean = false
  allViolations: any
  intervalVar: any
  IP: number
  delay: number
  appIsOn: boolean = false
  dataFetchStatus: string = ''
  responseMessage: string = ''
  constructor(public Server: SteamSuitService, public lightbox: Lightbox, public Router: Router) {
    this.IP = this.Server.IP
    this.delay = this.Server.steamDataDelay
    this.Server.CheckApplicationStatus().subscribe((response: any) => {

      if (response.success) {
        var process = response.message.find((el: any) => {

          return el.process_name == 'tg_steamsuit' ? el : ''
        })

        this.appIsOn = process?.process_status

        // this.isActive=true

      }
    })
  }

  ngOnInit(): void {
    console.log('details component')
    this.showHistory = false
    
    this.dataFetchStatus = 'init'
    if (this.showHistory == false) {
      this.Server.GetCurrentViolations().subscribe((response: any) => {
        console.log(response)
        if (response.success) {
          this.dataFetchStatus = 'success'

          if (this.showHistory == false) {
            this.violationDetails = response.message
          }
        }
        else {
          this.dataFetchStatus = 'fail'
          this.responseMessage = response.message
        }

      }, Err => {
        this.dataFetchStatus = 'error'

      })

      this.intervalVar = setInterval(() => {
        if (this.showHistory == false) {
          this.GetCurrentViolation()
        }
      }, this.delay

      )

    }
  }
    ngAfterViewInit(): void {
      this.GetCurrentViolation()
    }
    BackToLive(){
      this.showHistory = false
      this.intervalVar = setInterval(() => {
        this.GetCurrentViolation()
      }, this.delay
      )

    }
    GetDetails(){
      clearInterval(this.intervalVar)
      this.showHistory = true

      this.Router.navigate(['app/violations/Steam-SuitDetection'])
      this.Server.GetAnalyticsData().subscribe((response: any) => {
        if (response.success) {
          this.allViolations = response.message
        }
        else {

        }
      })
    }

    GetCurrentViolation(){
      let container = document.getElementById('container')
      container ? container.classList.add('loading') : ''
      if (this.showHistory == false) {
        this.Server.GetCurrentViolations().subscribe((response: any) => {
          console.log(response)
          if (response.success) {

            container ? container.classList.remove('loading') : ''
            if (this.showHistory == false) {
              this.violationDetails = response.message
            }
          }
          else {
            container ? container.classList.remove('loading') : ''

          }

        }, Err => {
          container ? container.classList.remove('loading') : ''

        })
      }
    }

    ngOnDestroy(): void {
      clearInterval(this.intervalVar)
    }
    onImageClick(violation: any, type ?: string){
      var imgArr: any[] = [{
        src: this.Server.IP + '/STEAMVIOLATIONIMAGE/' + violation.image_name,

        thumb: this.Server.IP + '/STEAMVIOLATIONIMAGE/' + violation.image_name,
        caption: ` ${violation.message}`,
      }]
      console.log(imgArr)
      this.lightbox.open(imgArr, 0)

    }

  }
