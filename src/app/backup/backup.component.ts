import { Component } from '@angular/core';
import { BackupService } from '../services/backup.service';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';



@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css'],
  
})
export class BackupComponent {


  constructor(private backupService: BackupService,
    private messageService: MessageService
  ) { 
    
  }

  descargarDatos() {
    this.backupService.downloadBackup().subscribe((data: Blob) => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.zip';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }




  uploadedFiles: any[] = [];

  originalEvent: Event | null = null; 
  files: File[] = [];
  

 async  onUpload(event:any) {
     for(let file of event.files) {
          this.uploadedFiles.push(file);
     //   await  this.backupService.subirArchivo(file)
      console.log("este es mi archivo zip???",file)
      }

      

      this.messageService.add({severity: 'info', summary: 'Se Subio el Respaldo con Exito', detail: ''});
  }

  

}
