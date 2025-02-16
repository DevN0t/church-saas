import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UploadService} from '../../../services/upload.service';
import {Observable, switchMap} from 'rxjs';
import {BranchService} from '../../../services/branch.service';

@Component({
  selector: 'app-config-page',
  imports: [
    NgIf,
    NgxSonnerToaster,
    ReactiveFormsModule
  ],
  templateUrl: './config-page.component.html',
  standalone: true,
  styleUrls: ['./config-page.component.css']
})
export class ConfigPageComponent implements OnInit {
  branchForm: FormGroup;
  selectedFile: File | null = null;

  logoImage: string = ''; // Ensure it's a string, not undefined
  loading: boolean = false;

  constructor(private uploadService: UploadService, private branchService: BranchService) {
    this.branchForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      logo: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.branchService.getBranch().subscribe(branch => {
      // Fill the form with the branch data
      this.branchForm.patchValue({
        name: branch.name, // Ensure the name is being properly set
        logo: branch.logo // Correctly fill the logo field
      });
      this.logoImage = branch.logo; // Store the current logo image
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.branchForm.valid) {
      console.error('Form is invalid');
      return;
    }
    this.loading = true;

    let updateObservable: Observable<any>;

    if (this.selectedFile) {
      // If a new file is selected, upload it first
      updateObservable = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.branchForm.patchValue({

            logo: response.response.url});
          return this.branchService.updateBranch(this.branchForm.value);
        })
      );
    } else {
      // No file selected, just keep the existing logo
      this.branchForm.patchValue({
        logo: this.logoImage});
      updateObservable = this.branchService.updateBranch(this.branchForm.value);
    }

    updateObservable.subscribe({
      next: response => {
        toast.success(response.message || 'Configurações atualizadas com sucesso!');
        this.loading = false;
        setTimeout(() => {
        }, 2000);
      },
      error: error => {
        console.error('Update failed', error);
        this.loading = false;
      }
    });
  }
}
