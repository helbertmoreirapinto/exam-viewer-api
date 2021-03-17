import faker from 'faker'
import { SignUpController } from '@/presentation/controllers/signup'
import { ValidatorSpy } from '@/tests/presentation/mocks'

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
  test('Should call validator with correct value', async () => {
    const { sut, validatorSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validatorSpy.input).toEqual(request)
  })
})
