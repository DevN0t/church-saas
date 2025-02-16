import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import {BannerService} from '../../../services/banner.service';
import {Observable, switchMap} from 'rxjs';
import {NgClass, NgIf} from '@angular/common';
import {NgxSonnerToaster, toast} from 'ngx-sonner';

@Component({
  selector: 'app-banner-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgxSonnerToaster, NgClass],
  templateUrl: './banner-page.component.html',
  styleUrl: './banner-page.component.css'
})
export class BannerPageComponent implements OnInit{
  bannerForm: FormGroup;
  selectedFile: File | null = null;

  title: string = '';
  limiteCaracteres: number = 50;
  bannerImage = '';
  loading: boolean = false;


  subtitle: string = '';
  subtitlelimiteCaracteres: number = 150;

  constructor(private uploadService: UploadService, private bannerService: BannerService) {
    this.bannerForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      url: new FormControl(''),
      image: new FormControl(''),
      subtitle: new FormControl('', [Validators.required]),
    });
  }

  countSubitle() {
    return this.subtitle.length;
  }


  // Função para contar os caracteres
  countTitle() {
    return this.title.length;
  }

  ngOnInit(): void {

    this.bannerService.getBanner().subscribe(banner => {
      this.bannerForm.patchValue(banner);
      this.bannerImage = banner.image;
    });

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.bannerForm.valid) {
      console.error('Form is invalid');
      return;
    }
    this.loading = true;

    let updateObservable: Observable<any>;

    if (this.selectedFile) {
      updateObservable = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.bannerForm.patchValue({ image: response.response.url });
          return this.bannerService.updateBanner(this.bannerForm.value);
        })
      );
    } else {
      this.bannerForm.patchValue({ image: this.bannerImage });
      updateObservable = this.bannerService.updateBanner(this.bannerForm.value);

    }

    updateObservable.subscribe({
      next: response => {

        toast.success('Banner updated successfully');
        this.loading = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      },
      error: error => {
        console.error('Update failed', error);
      }
    });
  }

}
