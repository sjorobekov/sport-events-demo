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
  website?: string,
  planId?: string,
  plan?: Plan,
  logo?: string,
  portalProtected?: boolean,
  teamSheetsProtected?: boolean,
  announcementsProtected?: boolean,
  email?: string,
  password?: string,
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
  sport: Sport,
  seasonId: string,
  gender: string,
  age: string,
  ability: string,
  name: string,
  coachId: string,
  coach: User,
  schoolId: string,
  publishTeam: boolean,
  publishResults: string,
  createdAt: string,
  updatedAt: string,
  file?: File,
  photo?: string,
}

export type Location = {
  id: string,
  name: string,
  address: string,
  schoolId: string,
  coordinates: {
    lng: number,
    lat: number,
  },
  createdAt: string,
  updatedAt: string,
}

export type Season = {
  id: string,
  start: string,
  end: string,
  status: 'CURRENT' | 'UPCOMING' | 'PAST',
  createdAt: string,
  updatedAt: string,
}

export type Dictionary<T> = { [key: string]: T }

export type Primitive = number|string|boolean
