import { MinMaxFormat } from '@types-internal/filtration/min-max-filter'

export interface FilterOptions {
  availableCount?: number
  date?: Date | null
  price?: MinMaxFormat<number>
  city?: {
    start?: string
    end?: string
  }
  order?: OrderFilterOption
}

export interface OrderFilterOption {
  by: string
  direction: 'DESC' | 'ASC'
}
