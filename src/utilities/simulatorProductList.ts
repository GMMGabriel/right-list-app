export type TProductList = {
  title: string
  data: IData[]
}[]

export interface IData {
  id: string
  name: string
  amount: number
  quantity: number
  promotionalAmount: number
  promotionalQuantity: number
  section: string
  isCollected: boolean
}

export function generateSectionListItems() {
  const sectionList = simulatorProductList.reduce((acc, product) => {
    // Verifica se já existe uma seção com o mesmo nome
    const sectionIndex = acc.findIndex(section => section.title === product.section)

    // Se a seção não existir, cria uma nova
    if (sectionIndex === -1) {
      acc.push({
        title: product.section,
        data: [product],
      })
    } else {
      // Se a seção já existir, adiciona o produto à seção correspondente
      acc[sectionIndex].data.push(product)
    }

    return acc
  }, [] as TProductList)

  // Ordena as seções por título
  sectionList.sort((sa, sb) => sa.title.localeCompare(sb.title))

  // Ordena os produtos dentro de cada seção
  sectionList.forEach(section => {
    section.data.sort((pa, pb) => pa.name.localeCompare(pb.name))
  })

  return sectionList
}

export const simulatorProductList: IData[] = [
  {
    id: '1',
    name: 'Maçã',
    amount: 3,
    quantity: 5,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Alimento',
    isCollected: false
  },
  {
    id: '2',
    name: 'Banana',
    amount: 2.5,
    quantity: 6,
    promotionalAmount: 2,
    promotionalQuantity: 6,
    section: 'Alimento',
    isCollected: true
  },
  {
    id: '3',
    name: 'Cândida 2L - Super Cândida',
    amount: 4.99,
    quantity: 2,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Limpeza',
    isCollected: true
  },
  {
    id: '4',
    name: 'Esponja',
    amount: 3.49,
    quantity: 1,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Limpeza',
    isCollected: true
  },
  {
    id: '5',
    name: 'Café solúvel - Lór',
    amount: 29.9,
    quantity: 1,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Alimento',
    isCollected: false
  },
  {
    id: '6',
    name: 'Absorvente',
    amount: 13.5,
    quantity: 1,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Higiene',
    isCollected: true
  },
  {
    id: '7',
    name: 'Papel higiênico L16P15 - Max',
    amount: 23.07,
    quantity: 1,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Higiene',
    isCollected: false
  },
  {
    id: '8',
    name: 'Leite integral - Italac',
    amount: 5.59,
    quantity: 2,
    promotionalAmount: 0,
    promotionalQuantity: 0,
    section: 'Alimento',
    isCollected: true
  },
  {
    id: '9',
    name: 'Sabonete - Francis',
    amount: 3.35,
    quantity: 8,
    promotionalAmount: 3.19,
    promotionalQuantity: 3,
    section: 'Higiene',
    isCollected: true
  },
  {
    id: '10',
    name: 'Detergente - Minuano',
    amount: 2.05,
    quantity: 4,
    promotionalAmount: 1.95,
    promotionalQuantity: 3,
    section: 'Limpeza',
    isCollected: false
  },
]