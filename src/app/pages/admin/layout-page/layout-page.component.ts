import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {ColorPickerModule, OutputFormat} from 'ngx-color-picker';
import {LayoutService} from '../../../services/layout.service';
import {NgIf} from '@angular/common';
import {LayoutType} from '../../../types/layout.type';

@Component({
  selector: 'app-layout-page',
  imports: [
    ReactiveFormsModule,
    NgxSonnerToaster,
    ColorPickerModule,
    NgIf,
  ],
  templateUrl: './layout-page.component.html',
  standalone: true,
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent implements OnInit {

  layoutForm: FormGroup;
  loading: boolean = false;
  cpPosition: string = 'bottom';

  layout: LayoutType = {
    headerBgColor: '#ffffff',
    bannerFontColor: '#ffffff',
    fontHighlightColor: '#f87979',
    bgColor: '#ffffff',
    fontColor: '#000000'
  }
  hex: OutputFormat = 'hex';


  constructor(private layoutService: LayoutService) {
    this.layoutForm = new FormGroup({
      bgColor: new FormControl('', [Validators.required]),
      fontHighlightColor: new FormControl('', [Validators.required]),
      bannerFontColor: new FormControl('', [Validators.required]),
      fontColor: new FormControl('', [Validators.required]),
      headerBgColor: new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {
    this.layoutService.getLayout().subscribe(layout => {
      this.layoutForm.patchValue(layout);
      this.layout.bgColor = layout.bgColor;
      this.layout.fontColor = layout.fontColor;
      this.layout.bannerFontColor = layout.bannerFontColor;
      this.layout.fontHighlightColor = layout.fontHighlightColor;
      this.layout.headerBgColor = layout.headerBgColor;
    });

  }
  submit() {
    if (!this.layoutForm.valid) {
      console.error('Form is invalid');
      return;
    }
    this.loading = true;


    this.layoutForm.value.bgColor = this.layout.bgColor;
    this.layoutForm.value.fontHighlightColor = this.layout.fontHighlightColor;
    this.layoutForm.value.bannerFontColor = this.layout.bannerFontColor;
    this.layoutForm.value.fontColor = this.layout.fontColor
    this.layoutForm.value.headerBgColor = this.layout.headerBgColor;
    this.layoutService.updateLayout(
      this.layoutForm.value
    ).subscribe(
      response  => {
        toast.success(response.message);
        this.loading = false;
        setTimeout(() => {
          window.location.reload();

        }, 2000);
      },
      response => {
        toast.error(response.message);
        this.loading = false;
      }
    );
  }
}
