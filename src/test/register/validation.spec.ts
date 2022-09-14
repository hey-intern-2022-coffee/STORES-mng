import { test, expect } from 'vitest'
import { validation } from '../../modules/stockManager/online/models'

test('register', () => {
  expect(
    validation({
      id: 0,
      name: '',
      image_url: '',
      price: 0,
      online_stock: { stock_quantity: 0 }
    })
  ).toStrictEqual({
    isShowAnnotations: {
      name: true,
      image_url: true,
      price: true,
      online_stock: true
    },
    isValid: false
  })
  expect(
    validation({
      name: '',
      image_url: '',
      price: 0,
      online_stock: { stock_quantity: 0 }
    })
  ).toStrictEqual({
    isShowAnnotations: {
      name: true,
      image_url: true,
      price: true,
      online_stock: true
    },
    isValid: false
  }),
    expect(
      validation({
        name: 'sdfsaf',
        image_url: 'sdfsdf',
        price: 100,
        online_stock: { stock_quantity: 10 }
      })
    ).toStrictEqual({
      isShowAnnotations: {
        name: false,
        image_url: false,
        price: false,
        online_stock: false
      },
      isValid: true
    })
})
