import { Validator } from '@/presentation/protocols'

export class ValidatorSpy implements Validator {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}
