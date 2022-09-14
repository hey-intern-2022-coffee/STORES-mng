import { test, expect } from 'vitest'
import { initForm } from '../../modules/stockManager/online/models'

test('initForm', () => {
  expect(initForm()).toStrictEqual({
    name: '',
    price: 0,
    image_url: '',
    online_stock: {
      stock_quantity: 0
    }
  })
})
