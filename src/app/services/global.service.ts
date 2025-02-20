import {Injectable} from '@angular/core';
import {LayoutService} from './layout.service';
import {LayoutType} from '../types/layout.type';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  layout: LayoutType = {
    bgColor: '',
    bannerFontColor: '',
    fontColor: '',
    fontHighlightColor: '',
    headerBgColor: ''
  };

  constructor(private layoutService: LayoutService) {}

  async initialize(): Promise<void> {
    try {
      this.layout = await firstValueFrom(this.layoutService.getLayout());
    } catch (err) {
      console.error('Erro ao carregar layout:', err);
    }
  }
}
