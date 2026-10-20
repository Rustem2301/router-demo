export type GroupImage = {
  id: string;
  title: string;
  description: string;
  cover: string;
};

export type GroupAlbum = {
  id: string;
  title: string;
  description: string;
  cover: string;
  images: GroupImage[];
};

export type Group = {
  id: string;
  title: string;
  description: string;
  cover: string;
  members: number;
  albums: GroupAlbum[];
};

export const groups: Group[] = [
  {
    id: '1',
    title: 'Группа 1',
    description:
      'Демонстрационная группа для примера вложенных модальных роутов. Каждый следующий уровень открывается поверх предыдущего и меняет URL.',
    cover: 'linear-gradient(135deg, #0958d9 0%, #69b1ff 100%)',
    members: 128,
    albums: [
      {
        id: '1',
        title: 'Летний отпуск',
        description: 'Море, дорога и немного вечернего света.',
        cover: 'linear-gradient(135deg, #fa8c16 0%, #ffd591 100%)',
        images: [
          {
            id: '1',
            title: 'Фото 1',
            description: 'Первый кадр из альбома «Летний отпуск».',
            cover: 'linear-gradient(135deg, #fa8c16 0%, #ffe7ba 100%)',
          },
          {
            id: '2',
            title: 'Фото 2',
            description: 'Второй кадр из альбома «Летний отпуск».',
            cover: 'linear-gradient(135deg, #d46b08 0%, #ffc069 100%)',
          },
          {
            id: '3',
            title: 'Фото 3',
            description: 'Третий кадр из альбома «Летний отпуск».',
            cover: 'linear-gradient(135deg, #ad4e00 0%, #ffa940 100%)',
          },
        ],
      },
      {
        id: '2',
        title: 'Город',
        description: 'Прогулки по знакомым улицам и новые детали.',
        cover: 'linear-gradient(135deg, #722ed1 0%, #b37feb 100%)',
        images: [
          {
            id: '1',
            title: 'Фото 1',
            description: 'Первый кадр из альбома «Город».',
            cover: 'linear-gradient(135deg, #531dab 0%, #d3adf7 100%)',
          },
          {
            id: '2',
            title: 'Фото 2',
            description: 'Второй кадр из альбома «Город».',
            cover: 'linear-gradient(135deg, #391085 0%, #9254de 100%)',
          },
        ],
      },
    ],
  },
];

export const getGroup = (groupId: string | undefined): Group | null =>
  groups.find((group) => group.id === groupId) || null;

export const getAlbum = (groupId: string | undefined, albumId: string | undefined): GroupAlbum | null => {
  const group = getGroup(groupId);

  if (!group) {
    return null;
  }

  return group.albums.find((album) => album.id === albumId) || null;
};

export const getGroupImage = (
  groupId: string | undefined,
  albumId: string | undefined,
  imageId: string | undefined,
): GroupImage | null => {
  const album = getAlbum(groupId, albumId);

  if (!album) {
    return null;
  }

  return album.images.find((image) => image.id === imageId) || null;
};
