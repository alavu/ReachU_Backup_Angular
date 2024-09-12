import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PartnerService } from '../services/partner.service';
import { ValidationPatterns } from 'src/app/validator/regular_expressions';

@Component({
  selector: 'app-edit-partner-modal',
  templateUrl: './edit-partner-modal.component.html',
  styleUrls: ['./edit-partner-modal.component.scss']
})
export class EditPartnerModalComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditPartnerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private partnerService: PartnerService
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.partner.name, [Validators.required, Validators.pattern(ValidationPatterns.name)]],
      phone: [this.data.partner.phone, [Validators.required, Validators.pattern(ValidationPatterns.phone)]],
      email: [this.data.partner.email, [Validators.required, Validators.email]], // Email field readonly
      service: [this.data.partner.service, [Validators.required, Validators.pattern(ValidationPatterns.service)]],
    });
  }

  // Close modal
  close(): void {
    this.dialogRef.close();
  }

  // Save changes
  save(): void {
    if (this.editForm.valid) {
      const updatedPartner = { ...this.data.partner, ...this.editForm.value };
      this.partnerService.updatePartner(updatedPartner).subscribe(
        response => {
          console.log('Partner updated successfully:', response);
          this.dialogRef.close(response); // Close the modal and pass the updated data
        },
        error => {
          console.error('Failed to update partner:', error);
        }
      );
    }
  }
}
