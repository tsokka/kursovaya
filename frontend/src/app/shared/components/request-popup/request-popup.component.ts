import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RequestService} from "../../services";
import {RequestPopupDataType, DefaultResponseType} from "../../../../types";

@Component({
  selector: 'app-request-popup',
  templateUrl: './request-popup.component.html',
  styleUrls: ['./request-popup.component.scss']
})
export class RequestPopupComponent {
  protected _isSuccess: boolean = false;
  protected _hasError: boolean = false;
  protected _serviceOpen: boolean = false;
  protected readonly _serviceOptions: string[] = ['Создание сайтов', 'Продвижение', 'Реклама', 'Копирайтинг'];

  protected readonly _requestForm = this.fb.group({
    service: [this.data.service || ''],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor(private readonly fb: FormBuilder,
              private readonly requestService: RequestService,
              private readonly dialogRef: MatDialogRef<RequestPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RequestPopupDataType) {
  }

  protected _createRequest(): void {
    if (!this._requestForm.valid || !this._requestForm.value.name || !this._requestForm.value.phone) {
      return;
    }

    this._hasError = false;

    this.requestService.createRequest({
      name: this._requestForm.value.name,
      phone: this._requestForm.value.phone,
      type: this.data.type,
      service: this.data.type === 'order' ? (this._requestForm.value.service || '') : undefined
    })
      .subscribe({
        next: (data: DefaultResponseType) => {
          if (data.error) {
            this._hasError = true;
            return;
          }
          this._isSuccess = true;
        },
        error: () => {
          this._hasError = true;
        }
      });
  }

  protected _closePopup(): void {
    this.dialogRef.close();
  }

  protected _toggleServices(): void {
    this._serviceOpen = !this._serviceOpen;
  }

  protected _selectService(service: string): void {
    this._requestForm.get('service')?.setValue(service);
    this._serviceOpen = false;
  }

  protected _closeServices(): void {
    this._serviceOpen = false;
  }
}
