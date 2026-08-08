import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image_url?: string
  category: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              )
            }
          }
          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      }
    }),
    {
      name: 'sk-academia-cart', // name of the item in the storage (must be unique)
    }
  )
)
