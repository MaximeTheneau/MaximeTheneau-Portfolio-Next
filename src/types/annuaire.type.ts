export type DepartmentType = { slug: string; name: string; code: string }

export type CategoryType = { id?: number; slug: string; name: string }

export type CityType = {
  slug: string
  name: string
  inseeCode: string | null
  department: DepartmentType
}

export type CompanyFormType = {
  email: string
  first_name: string
  last_name: string
  company_name: string
  siret: string
  phone: string
  category_ids: string[]
  place_id: string
  formatted_address: string
  city_name: string
  website?: string
  description?: string
  postal_code?: string
  department_name?: string
  department_code?: string
  lat?: string
  lng?: string
}

export type CompanyType = {
  slug: string
  name: string
  phone: string
  website: string | null
  description: string | null
  siret: string
  img?: string | null
  altImg?: string | null
  imgWidth?: number | null
  imgHeight?: number | null
  category: CategoryType | null
  address: {
    formatted: string
    lat: string
    lng: string
    postalCode: string
    city: CityType
  }
}
