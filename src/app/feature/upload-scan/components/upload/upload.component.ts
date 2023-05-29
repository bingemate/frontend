import { Component, Input, ViewChild } from '@angular/core';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { UploadScanService } from '../../upload-scan.service';

interface PreviewFile {
  file: File;
  name: string;
  progress: boolean;
  done: boolean;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.less'],
})
export class UploadComponent {
  @Input() type: 'movie' | 'tv' = 'movie';

  @ViewChild('upload', { static: false }) movieUpload!: NzUploadComponent;

  private uploadQueue: File[] = [];
  public previewFiles: PreviewFile[] = [];
  public uploading = false;

  constructor(private uploadService: UploadScanService) {}

  beforeUpload = (uploadFile: NzUploadFile, files: NzUploadFile[]): boolean => {
    console.log('Handle before upload');
    console.log(uploadFile);
    console.log(files);
    const file = uploadFile as unknown as File;

    if (file.type.startsWith('video')) {
      this.uploadQueue.push(file);
      this.previewFiles.push({
        file: file,
        name: file.name,
        progress: false,
        done: false,
      });
    }
    console.log('UPLOAD QUEUE');
    console.log(this.uploadQueue);
    return false;
  };

  removeFile(file: PreviewFile) {
    const index = this.previewFiles.indexOf(file);
    if (index !== -1) {
      this.previewFiles.splice(index, 1);
      const uploadIndex = this.uploadQueue.indexOf(file.file);
      if (uploadIndex !== -1) {
        this.uploadQueue.splice(uploadIndex, 1);
      }
    }
  }

  handleChange(event: any) {
    console.log('UPLOAD EVENT');
    console.log(event);
  }

  uploadFiles() {
    if (this.uploadQueue.length === 0) {
      return;
    }
    this.uploading = true;
    this.uploadNextFile(0);
  }

  uploadNextFile(index: number): void {
    if (this.uploadQueue.length === 0) {
      // Tous les fichiers ont été envoyés
      return;
    }

    const file = this.uploadQueue[index];
    if (!file) {
      return;
    }
    console.log(`Envoi du fichier (${file.name})`);
    this.previewFiles[index].progress = true;
    // Envoyer la requête d'upload en utilisant HttpClient
    if (this.type === 'movie') {
      this.uploadService.uploadMovie(file).subscribe(() => {
        // Upload terminé pour ce fichier
        this.previewFiles[index].progress = false;
        this.previewFiles[index].done = true;
        if (index < this.uploadQueue.length - 1) {
          this.uploadNextFile(index + 1); // Passer au fichier suivant
        } else {
          this.uploading = false;
          this.uploadQueue = [];
          this.previewFiles = [];
        }
      });
    } else {
      this.uploadService.uploadTVShow(file).subscribe(() => {
        // Upload terminé pour ce fichier
        this.previewFiles[index].progress = false;
        this.previewFiles[index].done = true;
        if (index < this.uploadQueue.length - 1) {
          this.uploadNextFile(index + 1); // Passer au fichier suivant
        } else {
          this.uploading = false;
          this.uploadQueue = [];
          this.previewFiles = [];
        }
      });
    }
  }

  getUploadProgress(): number {
    return (
      (this.previewFiles.filter(f => f.done).length /
        this.previewFiles.length) *
      100
    );
  }

  getIcon(item: PreviewFile): string {
    if (item.file.type.startsWith('video')) {
      return 'video-camera';
    } else {
      return 'file';
    }
  }
}
