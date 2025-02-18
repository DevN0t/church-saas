import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { MissionService } from '../../../services/mission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-mission-create-page',
  imports: [
    NgxSonnerToaster,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './mission-create-page.component.html',
  standalone: true,
  styleUrl: './mission-create-page.component.css'
})
export class MissionCreatePageComponent implements OnInit {

  missionForm: FormGroup;
  selectedFile: File | null = null;
  image: string = '';
  loading: boolean = false;
  isEditMode: boolean = false;
  missionId: string | null = null; // ID da missão (se for edição)

  constructor(
    private uploadService: UploadService,
    private missionService: MissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.missionForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.missionId = params.get('id'); // Obtém o ID da missão da URL

      if (this.missionId) {
        this.isEditMode = true;
        this.loadMissionData(this.missionId);
      }
    });
  }

  loadMissionData(id: string) {
    this.missionService.getMissionById(id).subscribe(mission => {
      this.missionForm.patchValue({
        title: mission.title,
        description: mission.description,
        image: mission.image
      });
      this.image = mission.image;
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
      toast.error('Preencha os campos obrigatórios!');
      return;
    }
    this.loading = true;

    let request$: Observable<any>;

    if (this.selectedFile) {
      request$ = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.missionForm.patchValue({ image: response.response.url });

          return this.isEditMode
            ? this.missionService.updateMissionService(this.missionId!, this.missionForm.value)
            : this.missionService.createNewMissionService(this.missionForm.value);
        })
      );
    } else {
      this.missionForm.patchValue({ image: this.image });

      request$ = this.isEditMode
        ? this.missionService.updateMissionService(this.missionId!, this.missionForm.value)
        : this.missionService.createNewMissionService(this.missionForm.value);
    }

    request$.subscribe({
      next: response => {
        toast.success(this.isEditMode ? 'Ministério atualizado com sucesso!' : 'Ministério criado com sucesso!');
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/painel/ministerio']); // Redireciona para a listagem
        }, 2000);
      },
      error: error => {
        console.error('Erro ao salvar missão', error);
        toast.error('Ocorreu um erro ao salvar!');
        this.loading = false;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
