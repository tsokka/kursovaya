import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RequestPopupComponent} from "../../components";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private readonly dialog: MatDialog) {
  }

  protected _openConsultationPopup(): void {
    this.dialog.open(RequestPopupComponent, {
      data: {type: 'consultation'},
      panelClass: 'request-popup-panel'
    });
  }
}
