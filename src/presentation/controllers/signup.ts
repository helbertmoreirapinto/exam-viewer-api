import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validator.validate(request)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
