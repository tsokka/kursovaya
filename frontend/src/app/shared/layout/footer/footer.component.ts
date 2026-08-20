import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RequestPopupComponent} from "../../components/request-popup/request-popup.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private dialog: MatDialog) {
  }

  openConsultationPopup(): void {
    this.dialog.open(RequestPopupComponent, {
      data: {type: 'consultation'},
      panelClass: 'request-popup-panel'
    });
  }
}
