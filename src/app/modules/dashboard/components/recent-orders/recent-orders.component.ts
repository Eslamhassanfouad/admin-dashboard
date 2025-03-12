import { Component } from '@angular/core';
import { AnalyticsService } from '../../../../shared/services/dashboard/analytics.service';

@Component({
  selector: 'app-recent-orders',
  standalone: false,
  templateUrl: './recent-orders.component.html',
  styleUrl: './recent-orders.component.scss',
})
export class RecentOrdersComponent {
  recentOrdersData: any;
  loading = true;
  headers: any;
  errorMessage: string = '';

  constructor(private _AnalyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this._AnalyticsService.getProductsAnalytics().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.recentOrdersData = data.slice(0, 6);
          this.getHeaders();
        } else {
          this.errorMessage = 'No recent orders available.';
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching analytics:', error);
        this.errorMessage =
          'Failed to fetch recent orders. Please try again later.';
        this.loading = false;
      },
    });
  }

  getHeaders() {
    if (!this.recentOrdersData || this.recentOrdersData.length === 0) return;

    const order = ['image', 'category', 'price', 'rate'];
    this.headers = order.filter((key) =>
      key === 'rate'
        ? this.recentOrdersData.some((item: any) => item.rating)
        : Object.keys(this.recentOrdersData[0] || {}).includes(key)
    );
  }
}
