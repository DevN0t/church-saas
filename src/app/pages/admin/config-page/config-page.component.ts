import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UploadService} from '../../../services/upload.service';
import {BannerService} from '../../../services/banner.service';
import {ToastrService} from 'ngx-toastr';
import {Observable, switchMap} from 'rxjs';

@Component({
  selector: 'app-config-page',
  imports: [
    NgIf,
    NgxSonnerToaster,
    ReactiveFormsModule
  ],
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.css'
})
export class ConfigPageComponent implements OnInit {
  bannerForm: FormGroup;
  selectedFile: File | null = null;

  bannerImage = '';
  loading: boolean = false;

  constructor(private uploadService: UploadService, private bannerService: BannerService, private toastr: ToastrService) {
    this.bannerForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      url: new FormControl(''),
      image: new FormControl('')
    });
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
          this.bannerForm.patchValue({image: response.response.url});
          return this.bannerService.updateBanner(this.bannerForm.value);
        })
      );
    } else {
      this.bannerForm.patchValue({image: this.bannerImage});
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
