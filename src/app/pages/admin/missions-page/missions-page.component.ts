import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {NgxSonnerToaster, toast} from "ngx-sonner";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UploadService} from '../../../services/upload.service';
import {Observable, switchMap} from 'rxjs';
import {MissionService} from '../../../services/mission.service';

@Component({
  selector: 'app-missions-page',
    imports: [
        NgIf,
        NgxSonnerToaster,
        ReactiveFormsModule
    ],
  templateUrl: './missions-page.component.html',
  styleUrl: './missions-page.component.css',
  standalone: true
})
export class MissionsPageComponent implements OnInit {
  missionForm: FormGroup;
  selectedFile: File | null = null;

  image: string = ''; // Ensure it's a string, not undefined
  loading: boolean = false;

  constructor(private uploadService: UploadService, private missionService: MissionService) {
    this.missionForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.missionService.getMission().subscribe(mission => {
      // Fill the form with the mission data
      this.missionForm.patchValue({
        title: mission.title, // Ensure the name is being properly set
        description: mission.description,
        image: mission.image // Correctly fill the logo field
      });
      this.image = mission.image; // Store the current logo image
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.missionForm.valid) {
      console.error('Form is invalid');
      return;
    }
    this.loading = true;

    let updateObservable: Observable<any>;

    if (this.selectedFile) {
      // If a new file is selected, upload it first
      updateObservable = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.missionForm.patchValue({

            image: response.response.url});
          return this.missionService.updateMission(this.missionForm.value);
        })
      );
    } else {
      // No file selected, just keep the existing logo
      this.missionForm.patchValue({
        image: this.image});
      updateObservable = this.missionService.updateMission(this.missionForm.value);
    }

    updateObservable.subscribe({
      next: response => {
        toast.success(response.message || 'Configurações atualizadas com sucesso!');
        this.loading = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error: error => {
        console.error('Update failed', error);
        this.loading = false;
      }
    });
  }

}
