import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../transaction';
import { LocalStorageService } from '../local-storage.service';
import { RouterOutlet } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterOutlet, FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
  providers: [BsModalService]
})
export class TransactionFormComponent implements OnInit {
  transactionForm!: FormGroup;
  modalRef?: BsModalRef;
  transactions: Transaction[] = [];
  isShowSummary: boolean = false;
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;
  isUpdate: boolean=false;
  updateIndex!: number;
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      type: ['', Validators.required]
    });
  }
  openModal(addTransactionModal: TemplateRef<void>, transaction?: Transaction,index?:any) {
    this.modalRef = this.modalService.show(addTransactionModal, { class: 'modal-lg' });
    if(transaction){
      this.transactionForm.patchValue(transaction!);
      this.isUpdate=true;
      this.updateIndex = index;
    }
  }
  onSubmit(): void {
    this.transactions.push(this.transactionForm.value);
    this.transactionForm.reset();
    this.localStorageService.setItem('transaction', this.transactions);
    this.modalRef?.hide();
    this.isShowSummary = true;
    this.showData();
  }

  updateTransaction(transaction: Transaction, index: any) {
    this.transactions[index] = transaction;
    this.transactionForm.reset();
    this.localStorageService.setItem('transaction', this.transactions);
    this.modalRef?.hide();
      this.isUpdate=false;
      this.showData();
  }

  deleteTransaction(transaction: Transaction, index: any) {
    this.transactions.splice(index, 1);
    this.showData();
  }

  showData() {
    this.balance = 0;
    this.totalIncome=0;
    this.totalExpense=0;
    this.transactions.forEach((item) => {
      if (item.type == "income") {
        this.totalIncome += item.amount;
      } else if (item.type == "expense") {
        this.totalExpense += item.amount;
      }
      this.balance = this.totalIncome - this.totalExpense;
    });
  }
}


