import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(private http: HttpClient) { }
  private baseUrl = environment.url;
  private headers = { 'Content-Type': 'application/json' };
  
  downloadBackup() {
    return   this.http.get(`${this.baseUrl}/backup/download`, {
      responseType: 'blob'
    } )

   
  }


  subirArchivo(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post <any>(`${this.baseUrl}/api/files/upload`, formData);
  }

}
