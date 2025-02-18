import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {MissionsType} from '../../../types/missions.type';
import {MissionService} from '../../../services/mission.service';
import {Router} from '@angular/router';
import {NgxSonnerToaster, toast} from 'ngx-sonner';
import {UploadService} from '../../../services/upload.service';

@Component({
  selector: 'app-missions-list-page',
  imports: [
    NgForOf,
    NgIf,
    NgxSonnerToaster
  ],
  templateUrl: './missions-list-page.component.html',
  standalone: true,
  styleUrl: './missions-list-page.component.css'
})
export class MissionsListPageComponent implements OnInit{

  missions : MissionsType[] = [];

  showDeleteModal: boolean = false;
  missionToDeleteId: string | null = null;

  constructor(private missionService: MissionService, private router: Router, private uploadService: UploadService) {

  }

  ngOnInit(): void {
    this.missionService.getMissionList().subscribe(missions => {
      this.missions = missions;
    });
  }
  currentPage = 1;
  itemsPerPage = 5;

  get paginatedMissions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.missions.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.missions.length / this.itemsPerPage);
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

  loadMissions() {
    this.missionService.getMissionList().subscribe(missions => {
      this.missions = missions;
    });
  }


  openDeleteModal(missionId: string | undefined) {
    if (!missionId) {
      return;
    }
    this.missionToDeleteId = missionId;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.missionToDeleteId = null;
  }

  confirmDelete() {
    if (this.missionToDeleteId) {
      // Encontrar o ministério correspondente pelo ID
      const missionToDelete = this.missions.find(m => String(m.id) === String(this.missionToDeleteId));

      if (!missionToDelete) {
        toast.error('Erro: Ministério não encontrado.');
        return;
      }

      this.missionService.deleteMissionService(this.missionToDeleteId).subscribe({
        next: () => {
          toast.success('Ministério excluído com sucesso!');
          this.showDeleteModal = false;
          this.missionToDeleteId = null;

          // Verifica se há uma imagem associada antes de excluir
          if (missionToDelete.image) {
            this.uploadService.delete(missionToDelete.image).subscribe({
              next: () => {
                this.loadMissions(); // Atualiza a lista
              },
            });
          } else {
            this.loadMissions(); // Atualiza a lista mesmo sem imagem
          }
        },
        error: () => toast.error('Erro ao excluir ministério.')
      });
    }
  }

}
