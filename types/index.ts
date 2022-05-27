export type Plan = {
  id: string,
  name: string,
}

export type School = {
  id: string,
  name: string,
  street?: string,
  country?: string,
  city?: string,
  state?: string,
  zip?: string,
  readonly usersCount?: number,
  portal?: boolean,
  portalAddress?: string,
  readonly lastActive?: string,
  planId?: string,
  plan?: Plan,
}

export type Sport = {
  id: string,
  name: string,
  color: string,
  icon: string,
  file?: File,
}

export type User = {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  displayName: string,
  phone: string,
  jobRole: string,
  userRole: string,
  enabled: boolean,
  displaySportsContact: boolean,
  mainSportsContact: boolean,
  lastActive: string,
  schoolId: string,
  createdAt: string,
  updatedAt: string,
}

export type InHouseTeam = {
  id: string,
  name: string,
  schoolId: string,
  color: string,
  createdAt: string,
  updatedAt: string,
}

export type Student = {
  id: string,
  firstname: string,
  lastname: string,
  birthday: string,
  yearGroup: number,
  gender: string,
  inHouseTeamId: string,
  inHouseTeam?: InHouseTeam,
  schoolId: string,
  createdAt: string,
  updatedAt: string,
}

export type Team = {
  id: string,
  sportId: string,
  seasonId: string,
  gender: string,
  ageLevel: string,
  abilityLevel: string,
  name: string,
  coachId: string,
  schoolId: string,
  publishTeam: boolean,
  publishResults: boolean,
  createdAt: string,
  updatedAt: string,
  file?: File,
}

export type Dictionary<T> = { [key: string]: T }

export type Primitive = number|string|boolean
