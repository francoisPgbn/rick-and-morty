export enum Status {
  NONE = '',
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export const StringtoStatus = (value: string | undefined): Status => {
  switch (value?.trim().toLowerCase()) {
    case 'alive':
      return Status.ALIVE;

    case 'dead':
      return Status.DEAD;

    case 'unknow':
      return Status.UNKNOWN;

    default:
      return Status.NONE;
  }
};

// export const StatusTranslation = (Sat) = {

// }
