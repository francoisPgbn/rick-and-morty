import { Component } from '@angular/core';
import { routeTransition } from '../../shared/animations/route-transitions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeTransition],
})
export class LayoutComponent {


  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
