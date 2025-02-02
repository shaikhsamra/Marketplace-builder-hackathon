import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import payment_method from './payment_method'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product , payment_method],
}
