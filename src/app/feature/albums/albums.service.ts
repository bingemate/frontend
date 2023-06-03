import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AlbumAPIResponse,
  AlbumModel,
  toAlbums,
} from '../../shared/models/album.models';
import { map, Observable } from 'rxjs';

@Injectable()
export class AlbumsService {
  constructor(private readonly http: HttpClient) {}

  getAlbums(): Observable<AlbumModel[]> {
    return this.http
      .get<AlbumAPIResponse[]>('https://jsonplaceholder.typicode.com/albums')
      .pipe(map(response => toAlbums(response)));
  }
}
