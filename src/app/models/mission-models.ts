export interface missionThemeDTO{
  id:number;
  title:string;
}

export interface missionDTO{
  id:number;
  title:string;
  organization: string;
  shortDescription: string;
  description: string;
  startDate:string;
  endDate:string;
  registrationDeadlineDate:string;
  countryId:number;
  cityId:number;
  totalSeats:number;
  themeId:number;
  availability:string;
  missionType:string;
  skills: skillDTO[];
}

export interface skillDTO{
  skillId: number;
  skillName: string;
  status: number;
}
