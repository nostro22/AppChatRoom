import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SplashComponent  implements OnInit {
  constructor(private router: Router, private platform: Platform) { }
  ngOnInit(): void {
  }

  ionViewDidEnter() {
    // Wait for the platform to be ready before hiding the splash screen
    this.platform.ready().then(() => {
      
      SplashScreen.hide().then(() => {
        setTimeout(() => {
         // window.screen.orientation.unlock();
          this.router.navigateByUrl('log',{replaceUrl: true});
        }, 5500);

      });
    });
  }


}
