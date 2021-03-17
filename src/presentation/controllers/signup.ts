import { Controller, HttpResponse, Validator } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request)
      if (error) return badRequest(error)

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
