import { test, expect } from 'vitest'

test('初期表示', () => {
  expect(((a: number, b: number) => a + b)(1, 2)).toBe(3)
})
