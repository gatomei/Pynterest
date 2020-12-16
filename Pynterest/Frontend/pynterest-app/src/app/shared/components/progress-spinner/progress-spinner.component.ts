import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/shared/services/loader.service';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss'],
})
export class ProgressSpinnerComponent implements OnInit {

  isLoading: boolean;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.isLoading.subscribe(isLoading_ => this.isLoading = isLoading_);
  }
}
