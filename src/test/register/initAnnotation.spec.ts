import { test, expect } from 'vitest'
import { initAnnotation } from '../../modules/stockManager/online/models'

test('initAnnotation', () => {
  expect(initAnnotation()).toStrictEqual({
    name: false,
    price: false,
    image_url: false,
    online_stock: false // FIXME: 型修正(本当はネストした中でboolを持ちたい)
  })
})
