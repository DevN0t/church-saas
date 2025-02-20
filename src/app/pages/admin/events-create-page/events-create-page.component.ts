import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { format, parse } from 'date-fns';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { Observable, switchMap } from 'rxjs';
import { EventsService } from '../../../services/events.service';
import { NgIf } from '@angular/common';
import { EventsType } from '../../../types/events.type';

@Component({
  selector: 'app-events-create-page',
  imports: [
    ReactiveFormsModule,
    NgxSonnerToaster,
    NgIf
  ],
  templateUrl: './events-create-page.component.html',
  standalone: true,
  styleUrl: './events-create-page.component.css'
})
export class EventsCreatePageComponent implements OnInit {

  eventsForm: FormGroup;
  selectedFile: File | null = null;
  image: string | undefined = '';
  loading: boolean = false;
  isEditMode: boolean = false;
  eventsId: string | null = null;

  constructor(
    private uploadService: UploadService,
    private eventsService: EventsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.eventsForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      image: new FormControl(''),
      date: new FormControl('', [Validators.required]),  // Apenas a data
      time: new FormControl('', [Validators.required]),  // Apenas a hora
      hiddenDate: new FormControl(''), // Campo invisível para o usuário
      location: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventsId = params.get('id'); // Obtém o ID da missão da URL

      if (this.eventsId) {
        this.isEditMode = true;
        this.loadEventData(this.eventsId);
      }
    });
  }
  formatDateInput(event: any) {
    let formattedDate = event.target.value.replace(/[^0-9]/g, '');  // Remover tudo que não for número

    // Formatar data para dd/MM/yyyy
    if (formattedDate.length >= 2 && formattedDate.length <= 4) {
      formattedDate = formattedDate.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    } else if (formattedDate.length > 4) {
      formattedDate = formattedDate.replace(/(\d{2})(\d{2})(\d{0,4})/, '$1/$2/$3');
    }

    if (formattedDate.length > 10) {
      formattedDate = formattedDate.substring(0, 10);
    }

    this.eventsForm.controls['date'].setValue(formattedDate);
  }

  formatTimeInput(event: any) {
    let formattedTime = event.target.value.replace(/[^0-9]/g, '');  // Remover tudo que não for número (remover ":" também)

    // Formatar hora para HH:mm
    if (formattedTime.length >= 3) {
      formattedTime = formattedTime.replace(/(\d{2})(\d{0,2})/, '$1:$2');  // Insere ':' depois dos dois primeiros números
    }

    // Se o formato já tiver um ":", evitar que o usuário digite mais de um
    if (formattedTime.indexOf(':') !== formattedTime.lastIndexOf(':')) {
      formattedTime = formattedTime.substring(0, formattedTime.lastIndexOf(':') + 3);  // Mantém apenas a primeira parte com ':'
    }
    if (formattedTime.length > 5) {
      formattedTime = formattedTime.substring(0, 5);
    }

    this.eventsForm.controls['time'].setValue(formattedTime);
  }

  loadEventData(id: string) {
    this.eventsService.getEventById(id).subscribe(events => {
      if (events && events.date && Array.isArray(events.date)) {
        // Desestruturando os valores do array "date"
        const [year, month, day, hour, minute] = events.date;

        // Criando um objeto Date a partir do array (ano, mês, dia, hora, minuto)
        const eventDate = new Date(year, month - 1, day, hour, minute); // Mês começa de 0, então subtrai 1.

        // 🔹 Formata para exibição no formulário
        const formattedDate = format(eventDate, 'dd/MM/yyyy'); // Exemplo: "10/10/2020"
        const formattedTime = format(eventDate, 'HH:mm'); // Exemplo: "22:00"

        // 🔥 Atualiza os inputs corretamente
        this.eventsForm.patchValue({
          title: events.title,
          description: events.description,
          image: events.image,
          date: formattedDate, // Usuário verá apenas "10/10/2020"
          time: formattedTime, // Usuário verá apenas "22:00"
          location: events.location
        });

        this.image = events.image;
      } else {
        console.error('Data não encontrada no evento ou formato inválido');
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submit() {
    if (!this.eventsForm.valid) {
      toast.error('Preencha os campos obrigatórios!');
      return;
    }
    this.loading = true;

    const dateInput = this.eventsForm.controls['date'].value;
    const timeInput = this.eventsForm.controls['time'].value;

    if (!dateInput || !timeInput) {
      console.error('Data ou hora não informadas');
      return;
    }

    // 🚀 Concatena data + hora
    const formattedInput = `${dateInput} ${timeInput}`;
    const parsedDate = parse(formattedInput, 'dd/MM/yyyy HH:mm', new Date());

    if (isNaN(parsedDate.getTime())) {
      console.error('Erro ao interpretar a data e hora');
      return;
    }

    // 🔥 Converte para o formato LocalDateTime esperado pelo backend
    const formattedLocalDateTime = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss"); // SEM timezone

    console.log('Valor formatado para o backend:', formattedLocalDateTime);

    // ✅ Apenas "hiddenDate" recebe o valor formatado
    this.eventsForm.patchValue({ hiddenDate: formattedLocalDateTime });

    let request$: Observable<any>;



    if (this.selectedFile) {
      request$ = this.uploadService.upload(this.selectedFile).pipe(
        switchMap(response => {
          this.eventsForm.patchValue({ image: response.response.url });
          const payload: EventsType = {
            ...this.eventsForm.value,
            date: this.eventsForm.value.hiddenDate  // 🔥 Usa a versão interna
          };
          return this.isEditMode
            ? this.eventsService.updateEventService(this.eventsId!, payload)
            : this.eventsService.createNewEventService(payload);
        })
      );
    } else {
      this.eventsForm.patchValue({ image: this.image });
      const payload: EventsType = {
        ...this.eventsForm.value,
        date: this.eventsForm.value.hiddenDate  // 🔥 Usa a versão interna
      };
      request$ = this.isEditMode
        ? this.eventsService.updateEventService(this.eventsId!, payload)
        : this.eventsService.createNewEventService(payload);
    }

    request$.subscribe({
      next: response => {
        toast.success(this.isEditMode ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!');
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/painel/eventos']); // Redireciona para a listagem
        }, 2000);
      },
      error: error => {
        console.error('Erro ao salvar o evento', error);
        toast.error('Ocorreu um erro ao salvar!');
        this.loading = false;
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
