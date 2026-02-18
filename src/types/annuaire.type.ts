export type DepartmentType = { slug: string; name: string; code: string }

export type CategoryType = { slug: string; name: string }

export type CityType = {
  slug: string
  name: string
  inseeCode: string | null
  department: DepartmentType
}

export type CompanyType = {
  slug: string
  name: string
  phone: string
  website: string | null
  description: string | null
  siret: string
  category: CategoryType | null
  address: {
    formatted: string
    lat: string
    lng: string
    postalCode: string
    city: CityType
  }
}
