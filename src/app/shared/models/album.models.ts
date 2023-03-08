export interface AlbumModel {
  userId: number;
  id: number;
  title: string;
}

export interface AlbumsStateModel {
  currentAlbumId: number | null;
  albums: AlbumModel[];
}

export interface AlbumAPIResponse {
  userId: number;
  id: number;
  title: string;
}

export function toAlbums(albums: AlbumAPIResponse[]): AlbumModel[] {
  return albums.map(toAlbum);
}

export function toAlbum(album: AlbumModel): AlbumModel {
  return {
    userId: album.userId,
    id: album.id,
    title: album.title,
  };
}
