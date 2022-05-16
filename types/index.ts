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

export type Dictionary<T> = { [key: string]: T }

export type Primitive = number|string|boolean
