import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services/request.service";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html',
  styleUrls: ['./request-popup.component.scss']
})
export class RequestPopupComponent {
  isSuccess: boolean = false;
  hasError: boolean = false;

  requestForm = this.fb.group({
    service: [this.data.service || ''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private requestService: RequestService,
              private dialogRef: MatDialogRef<RequestPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { type: 'order' | 'consultation', service?: string }) {
  }

  createRequest(): void {
    if (!this.requestForm.valid || !this.requestForm.value.name || !this.requestForm.value.phone) {
      return;
    }

    this.hasError = false;

    this.requestService.createRequest({
      name: this.requestForm.value.name,
      phone: this.requestForm.value.phone,
      type: this.data.type,
      service: this.data.type === 'order' ? (this.requestForm.value.service || '') : undefined
    })
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this.hasError = true;
            return;
          }
          this.isSuccess = true;
        },
        error: () => {
          this.hasError = true;
        }
      });
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
