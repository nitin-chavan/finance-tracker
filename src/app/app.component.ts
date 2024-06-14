import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TransactionFormComponent } from "./transaction-form/transaction-form.component";
import { TransactionSummaryComponent } from "./transaction-summary/transaction-summary.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TransactionFormComponent, RouterLink, RouterLinkActive, TransactionSummaryComponent]
})
export class AppComponent {
  title = 'finance-tracker';
}
