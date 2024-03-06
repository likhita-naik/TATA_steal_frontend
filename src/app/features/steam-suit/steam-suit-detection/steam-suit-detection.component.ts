import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-steam-suit-detection',
  templateUrl: './steam-suit-detection.component.html',
  styleUrls: ['./steam-suit-detection.component.css']
})
export class SteamSuitDetectionComponent implements AfterViewInit,OnInit  {
  activeIndex:number=0
  constructor(private Router:Router, private activatedRoute: ActivatedRoute){
                activatedRoute.url.subscribe((data:any)=>{
                  this.activeIndex=0
                  this.Router.navigate(['app/SteamSuitDetection/Details'])
                  if (data[1] && data[1].path === 'Settings') {
                    this.activeIndex = 1;
                  } else {

                    this.activeIndex = 0;
                  }
                })
                
    // this.Router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     // Do something before navigation starts
    //     this.Router.navigate(['app/SteamSuitDetection/Details'])

    //   }
    // })
  }

  ngOnInit(): void {
    
    // this.Router.navigate(['app/SteamSuitDetection/Details'])

  }
  

  ngAfterViewInit(): void {
    // this.activeIndex=0
    // this.OnTabChange({index:0})
    // this.Router.navigate(['app/SteamSuitDetection/Details'])

  }

  OnTabChange(event:any){
    console.log(event)
    if(event.index==0){
      this.activeIndex=0
      this.Router.navigate(['app', 'SteamSuitDetection', 'Details']);   }

    
   else{
    this.activeIndex=1
    this.Router.navigate(['app', 'SteamSuitDetection', 'Settings']);

   }
  }
}
