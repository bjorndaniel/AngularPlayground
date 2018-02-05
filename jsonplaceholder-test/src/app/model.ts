export class Album {
  userId: number;
  id: number;
  title: string;
}

export class Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export enum FileType {
  Pdf = 1,
  Excel = 2
}
