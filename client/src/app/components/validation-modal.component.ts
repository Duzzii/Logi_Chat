import { Component } from '@angular/core';

@Component({
  selector: 'app-validation-modal',
  template: `
    <h1 mat-dialog-title>Invalid Input</h1>
    <div mat-dialog-content>
      <p>Please enter valid inputs in all fields.</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </div>
  `,
  styles: [`
    .mat-dialog-content {
      font-size: 1.2rem;
    }

    .mat-dialog-actions {
      text-align: right;
    }
  `]
})
export class ValidationModalComponent {}
