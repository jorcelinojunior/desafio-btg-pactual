import { generateCPF } from './generateCPF'

export const newCPF = generateCPF()

export const newEmail = `${parseInt(Math.random() * 10000).toString()}jorcelino@live.com`

export const newPassword = '123456'

export const hashBasicAuth = 'MDFqb3JjZWxpbm9AbGl2ZS5jb206MTIzNDU2' // 01jorcelino@live.com:123456

export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWY2YzI1MGY1NjYzNGEyMGU4Nzg5MWQ0IiwiaWF0IjoxNjAxMDIyNjgxLCJleHAiOjE2MDE2Mjc0ODF9.0yqqHagSzldx9KSGbKfijHBIiCAhmQiOjFsxncVooJE"
