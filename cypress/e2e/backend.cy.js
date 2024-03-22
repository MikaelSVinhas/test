import { faker } from '@faker-js/faker'

const USER_ID = Cypress.env('USER_ID')
const USER_EMAIL_LOGIN = Cypress.env('USER_EMAIL_LOGIN')
const USER_PASSWORD = Cypress.env('USER_PASSWORD')
const API_URL = Cypress.env('API_BASE_URL')

const USER_EDIT = Cypress.env('USER_EDIT')
const NAME_EDIT = faker.internet.userName()
const EMAIL_EDIT = faker.internet.email()
const PASSWORD_EDIT = faker.internet.password()
const ADM_EDIT = "false"

let userId;

describe('api testing', () => {

  it('retrieves user information', () => {

    cy.getUserInfo(USER_ID).should(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.quantidade).to.eq(1)
      expect(body.usuarios[0].administrador).to.eq('true')
      expect(body.usuarios[0].email).to.eq(Cypress.env('USER_EMAIL'))
      expect(body.usuarios[0].nome).to.eq(Cypress.env('USER_NAME'))
      expect(body.usuarios[0].password).to.exist
      expect(body.usuarios[0]._id).to.exist
    })
  })

  it('user login', () => {

    cy.userLogin(USER_EMAIL_LOGIN, USER_PASSWORD).should(({ status, body }) => {
      const { message, authorization } = body

      expect(status).to.eq(200)
      expect(message).to.eq('Login realizado com sucesso')
      expect(authorization).to.exist
    })
  })

  it('edit user', () => {

    cy.editUser(USER_EDIT, NAME_EDIT, EMAIL_EDIT, PASSWORD_EDIT, ADM_EDIT).should(({ status, body }) => {
      const { message } = body

      expect(status).to.eq(200)
      expect(message).to.eq('Registro alterado com sucesso')
    })
  })

  it('delete user', () => {

    // create user
    cy.request({
      method: 'POST',
      url: `${API_URL}usuarios`,
      body: {
        "nome": "Mc Carty",
        "email": faker.internet.email(),
        "password": "teste",
        "administrador": "true"
      }
    }).then((response) => {
      expect(response).property('status').to.equal(201)
      expect(response.body).property('_id').to.not.be.oneOf([null, ""])
      const body = (response.body)
      userId = body['_id']

      // delete user
      cy.deleteUser(userId).should(({ status, body }) => {
        const { message } = body

        expect(status).to.eq(200)
        expect(message).to.eq('Registro excluído com sucesso')

      })
    })
  })
})