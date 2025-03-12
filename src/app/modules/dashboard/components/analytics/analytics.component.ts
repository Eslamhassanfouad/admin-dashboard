import { Component } from '@angular/core';
import { AnalyticsService } from '../../../../shared/services/dashboard/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: false,
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent {
  constructor(private _AnalyticsService: AnalyticsService) {}
  analyticsData: any;
  loading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this._AnalyticsService.getProductsAnalytics().subscribe({
      next: (data) => {
        this.analyticsData = data.slice(0, 6);
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load analytics data. Please try again.';
        console.error('Error fetching analytics:', error);
        this.loading = false;
      },
    });
  }
}
