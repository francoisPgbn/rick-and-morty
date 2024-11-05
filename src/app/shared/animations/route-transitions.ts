import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* => *', [
    query('.layout__loading-screen', [style({ transform: 'translateY(100%)' })]),

    style({ position: 'relative' }),
    query(':enter, :leave', [style({ position: 'absolute', top: '80px', left: 0, width: '100%' })], { optional: true }),
    query(':enter', [style({ opacity: 0, transform: 'translateY(-20px)' })], { optional: true }),

    group([
      query(':leave', [animate('500ms', style({ opacity: 0 }))], { optional: true }),
      query('.footer', [animate('500ms', style({ opacity: 0 }))]),
      query('.layout__loading-screen', [animate('2000ms ease-out', style({ transform: 'translateY(-100%)' }))]),
    ]),
    query(':enter', [animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' }))], { optional: true }),
  ]),
]);
