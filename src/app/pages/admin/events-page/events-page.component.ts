import {Component, OnInit} from '@angular/core';
import {UploadService} from '../../../services/upload.service';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {EventsService} from '../../../services/events.service';
import {EventsType} from '../../../types/events.type';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-events-page',
  imports: [
    NgxSonnerToaster,
    NgIf,
    NgForOf
  ],
  templateUrl: './events-page.component.html',
  standalone: true,
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent implements OnInit{

  events : EventsType[] = [];

  showDeleteModal: boolean = false;
  eventToDeleteId: string | null = null;

  constructor(private eventsService: EventsService, private router: Router, private uploadService: UploadService) {

  }

  ngOnInit(): void {
    this.eventsService.getEventsList().subscribe(events => {
      this.events = events;
    });
  }
  currentPage = 1;
  itemsPerPage = 5;

  get paginatedEvents() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.events.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.events.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }


  truncateContent(content: string | undefined, limit: number = 10): string {

    if (content === undefined) {
      return '';
    }
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  loadEvents() {
    this.eventsService.getEventsList().subscribe(events => {
      this.events = events;
    });
  }


  openDeleteModal(eventId: string | undefined) {
    if (!eventId) {
      return;
    }
    this.eventToDeleteId = eventId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.eventToDeleteId = null;
  }

  confirmDelete() {
    if (this.eventToDeleteId) {
      const eventToDelete = this.events.find(m => String(m.id) === String(this.eventToDeleteId));

      if (!eventToDelete) {
        toast.error('Erro: Evento não encontrado.');
        return;
      }

      this.eventsService.deleteEvents(this.eventToDeleteId).subscribe({
        next: () => {
          toast.success('Evento excluído com sucesso!');
          this.showDeleteModal = false;
          this.eventToDeleteId = null;

          // Verifica se há uma imagem associada antes de excluir
          if (eventToDelete.image) {
            this.uploadService.delete(eventToDelete.image).subscribe({
              next: () => {
                this.loadEvents(); // Atualiza a lista
              },
            });
          } else {
            this.loadEvents(); // Atualiza a lista mesmo sem imagem
          }
        },
        error: () => toast.error('Erro ao excluir event.')
      });
    }
  }

}
