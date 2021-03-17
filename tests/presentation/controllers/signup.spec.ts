import faker from 'faker'
import { SignUpController } from '@/presentation/controllers/signup'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { ValidatorSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: SignUpController
  validatorSpy: ValidatorSpy
}

const mockRequest = (): SignUpController.Request => {
  const fakePassword = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: fakePassword,
    passwordConfirmation: fakePassword
  }
}

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy()
  const sut = new SignUpController(validatorSpy)
  return {
    sut,
    validatorSpy
  }
}

describe('SignUp controller',() => {
  describe('validator tests',() => {
    test('Should call validator with correct value', async () => {
      const { sut, validatorSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validatorSpy.input).toEqual(request)
    })

    test('Should return 500 if validator throws', async () => {
      const { sut, validatorSpy } = makeSut()
      jest.spyOn(validatorSpy, 'validate').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(serverError(new Error()))
    })

    test('Should return 400 if validator fails', async () => {
      const { sut, validatorSpy } = makeSut()
      validatorSpy.error = new MissingParamError(faker.random.word())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(badRequest(validatorSpy.error))
    })
  })
})
