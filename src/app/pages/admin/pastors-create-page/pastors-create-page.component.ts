import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UploadService} from '../../../services/upload.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {Observable, switchMap} from 'rxjs';
import {PastorsService} from '../../../services/pastors.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pastors-create-page',
  imports: [
    NgxSonnerToaster,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './pastors-create-page.component.html',
  standalone: true,
  styleUrl: './pastors-create-page.component.css'
})
export class PastorsCreatePageComponent implements OnInit {

  pastorForm: FormGroup;
  selectedFile: File | null = null;
  image: string | undefined = '';
  loading: boolean = false;
  isEditMode: boolean = false;
  pastorId: string | null = null;

  constructor(
    private uploadService: UploadService,
    private pastorService: PastorsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.pastorForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pastorId = params.get('id'); // Obtém o ID da missão da URL

      if (this.pastorId) {
        this.isEditMode = true;
        this.loadPastorData(this.pastorId);
      }
    });
  }

  loadPastorData(id: string) {
    this.pastorService.getPastorById(id).subscribe(pastor => {
      this.pastorForm.patchValue({
        name: pastor.name,
        image: pastor.image,
      });
      this.image = pastor.image;
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.pastorForm.valid) {
      toast.error('Preencha os campos obrigatórios!');
      return;
    }
    this.loading = true;

    let request$: Observable<any>;

    if (this.selectedFile) {
      request$ = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.pastorForm.patchValue({ image: response.response.url });

          return this.isEditMode
            ? this.pastorService.updatePastorService(this.pastorId!, this.pastorForm.value)
            : this.pastorService.createNewPastorService(this.pastorForm.value);
        })
      );
    } else {
      this.pastorForm.patchValue({ image: this.image });

      request$ = this.isEditMode
        ? this.pastorService.updatePastorService(this.pastorId!, this.pastorForm.value)
        : this.pastorService.createNewPastorService(this.pastorForm.value);
    }

    request$.subscribe({
      next: response => {
        toast.success(this.isEditMode ? 'Pastor atualizado com sucesso!' : 'Pastor criado com sucesso!');
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/painel/pastores']); // Redireciona para a listagem
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
