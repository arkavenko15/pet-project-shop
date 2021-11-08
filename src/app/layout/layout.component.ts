import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showFiller = false;

  constructor(public loaderService:LoaderService) { }

  ngOnInit(): void {
  }

}
