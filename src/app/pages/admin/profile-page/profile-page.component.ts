import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UploadService} from '../../../services/upload.service';
import {Observable, switchMap} from 'rxjs';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {NgClass, NgIf} from '@angular/common';
import {ProfileService} from '../../../services/profile.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgxSonnerToaster,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
  standalone: true
})
export class ProfilePageComponent implements OnInit{

  profileForm: FormGroup;
  selectedFile: File | null = null;

  title: string = '';
  limiteCaracteres: number = 20;
  profileAvatar = '';
  loading: boolean = false;

  constructor(private uploadService: UploadService, private profileService: ProfileService) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      avatar: new FormControl(''),
    });
  }
  countTitle() {
    return this.title.length;
  }
  ngOnInit(): void {

    this.profileService.getProfile().subscribe(profile => {
      this.profileForm.patchValue(profile);
      this.profileAvatar = profile.avatar;
    });

  }
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.profileForm.valid) {
      console.error('Form is invalid');
      return;
    }
    this.loading = true;

    let updateObservable: Observable<any>;

    if (this.selectedFile) {
      updateObservable = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.profileForm.patchValue({ avatar: response.response.url });
          return this.profileService.updateProfile(this.profileForm.value);
        })
      );
    } else {
      this.profileForm.patchValue({ avatar: this.profileAvatar });
      updateObservable = this.profileService.updateProfile(this.profileForm.value);
    }

    updateObservable.subscribe({
      next: response => {
        toast.success(response.message || 'Perfil atualizado com sucesso!');
        this.loading = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: error => {
        console.error('Update failed', error);
        toast.error(error.error?.message || 'Erro ao atualizar o perfil');
        this.loading = false;
      }
    });
  }

}
