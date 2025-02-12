import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BranchService} from '../../../services/branch.service';
import {BranchType} from '../../../types/branch.type';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true
})
export class SidebarComponent implements OnInit{

  branch: BranchType = {
    alias: '', id: 0, logo: '', name: '', url: ''

  }

  constructor(
    private router: Router,
    private branchService: BranchService,
  ) {
  }

  ngOnInit(): void {
     this.branchService.getBranch().subscribe(
      branch => this.branch = branch,
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }


}
