import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import MatDialogRef and MAT_DIALOG_DATA
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-iframe-modal',
  templateUrl: './iframe-modal.component.html',
  styleUrls: ['./iframe-modal.component.css']
})

export class IframeModalComponent {
  iframeUrl: string;
  closeIcon = '../assets/img/closeIcon.png'; 
  constructor(
    public dialogRef: MatDialogRef<IframeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer // Inject DomSanitizer here
  ) {
    this.iframeUrl = data.iframeUrl;
  }
  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
