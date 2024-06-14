import { Routes,RouterModule } from '@angular/router';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionSummaryComponent } from './transaction-summary/transaction-summary.component';

export const routes: Routes = [
    {
        path:'transaction-summary',
        component: TransactionSummaryComponent
    },
    {
        path:'transaction-form',
        component:TransactionFormComponent
    }
];
