import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ReportsComponent } from './components/reports/reports.component';
import { VisitsComponent } from './components/visits/visits.component';
import { RecentOrdersComponent } from './components/recent-orders/recent-orders.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    ReportsComponent,
    VisitsComponent,
    RecentOrdersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    FormsModule,
    LoadingComponent,
  ],
})
export class DashboardModule {}
