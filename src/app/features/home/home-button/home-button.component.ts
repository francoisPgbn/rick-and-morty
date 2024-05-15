import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.scss',
})
export class HomeButtonComponent implements OnInit {
  @Input() label: string = '';
  @Input() link: (string | number)[] =  [];

  a: any;
  ngOnInit(): void {
    this.a = [`/${this.link}`, 1];
  }
}
