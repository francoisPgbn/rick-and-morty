import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  forwardRef,
  input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface DropdownItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() placeholder: string = '-';
  @Input() items: DropdownItem[] = [];
  @ViewChild('dropdown ') dropdown: ElementRef<HTMLElement>;

  selectedValue: string;
  displayPanel: boolean = false;

  @HostListener('window:click', ['$event'])
  ClosePanel(event: any) {
    if (!this.dropdown.nativeElement.contains(event.target))
      this.displayPanel = false;
  }

  onChange: (value: string) => void;
  onTouched: () => void;

  writeValue(value: string): void {
    this.selectedValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectValue(value: string) {
    console.log(value);
    this.displayPanel = !this.displayPanel;
    this.selectedValue = value;
    this.onChange(value);
  }

  open() {
    this.displayPanel = !this.displayPanel;
  }
}
