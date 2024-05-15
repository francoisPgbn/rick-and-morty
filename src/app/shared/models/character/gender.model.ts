export enum Gender {
  NONE = '',
  FEMALE = 'Female',
  MALE = 'Male',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export const StringToGender = (value: string | undefined): Gender => {
  switch (value?.trim().toLowerCase()) {
    case 'female':
      return Gender.FEMALE;

    case 'male':
      return Gender.MALE;

    case 'genderless':
      return Gender.GENDERLESS;

    case 'unknow':
      return Gender.UNKNOWN;

    default:
      return Gender.NONE;
  }
};

 