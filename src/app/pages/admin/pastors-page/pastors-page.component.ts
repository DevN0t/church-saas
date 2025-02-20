import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {PastorType} from '../../../types/pastor.type';
import {PastorsService} from '../../../services/pastors.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-pastors-page',
  imports: [
    NgxSonnerToaster,
    NgForOf,
    NgIf
  ],
  templateUrl: './pastors-page.component.html',
  standalone: true,
  styleUrl: './pastors-page.component.css'
})
export class PastorsPageComponent implements OnInit{

  pastors : PastorType[] = [];

  showDeleteModal: boolean = false;
  pastorToDeleteId: string | null = null;

  constructor(private pastorsService: PastorsService, private router: Router, private uploadService: UploadService) {

  }

  ngOnInit(): void {
    this.pastorsService.getPastorsList().subscribe(pastors => {
      this.pastors = pastors;
    });
  }
  currentPage = 1;
  itemsPerPage = 5;

  get paginatedPastors() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.pastors.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.pastors.length / this.itemsPerPage);
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

  loadPastors() {
    this.pastorsService.getPastorsList().subscribe(pastors => {
      this.pastors = pastors;
    });
  }


  openDeleteModal(pastorId: string | undefined) {
    if (!pastorId) {
      return;
    }
    this.pastorToDeleteId = pastorId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.pastorToDeleteId = null;
  }

  confirmDelete() {
    if (this.pastorToDeleteId) {
      const pastorToDelete = this.pastors.find(m => String(m.id) === String(this.pastorToDeleteId));

      if (!pastorToDelete) {
        toast.error('Erro: Pastor não encontrado.');
        return;
      }

      this.pastorsService.deletePastors(this.pastorToDeleteId).subscribe({
        next: () => {
          toast.success('Pastor excluído com sucesso!');
          this.showDeleteModal = false;
          this.pastorToDeleteId = null;

          // Verifica se há uma imagem associada antes de excluir
          if (pastorToDelete.image) {
            this.uploadService.delete(pastorToDelete.image).subscribe({
              next: () => {
                this.loadPastors(); // Atualiza a lista
              },
            });
          } else {
            this.loadPastors(); // Atualiza a lista mesmo sem imagem
          }
        },
        error: () => toast.error('Erro ao excluir pastor.')
      });
    }
  }

}
