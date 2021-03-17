import { Controller, HttpResponse, Validator } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly validator: Validator
  ) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    this.validator.validate(request)
    return Promise.resolve(null)
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
