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

export type Dictionary<T> = { [key: string]: T }

export type Primitive = number|string|boolean
