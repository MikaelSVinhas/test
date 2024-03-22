const API_URL = Cypress.env('API_BASE_URL')

//const authorization = `Bearer ${Cypress.env('TYPEFORM_ACCESS_TOKEN')}`

Cypress.Commands.add('userLogin', (email, password) => {
    cy.request({
        method: 'POST',
        url: `${API_URL}login`,
        body: {
            "email": email,
            "password": password
        }
    })
})

Cypress.Commands.add('editUser', (userId, name, email, password, adm) => {
    cy.request({
        method: 'PUT',
        url: `${API_URL}usuarios/${userId}`,
        body: {
            "nome": name,
            "email": email,
            "password": password,
            "administrador": adm
        }
    })
})

Cypress.Commands.add('getUserInfo', userId => {
    cy.request({
        method: 'GET',
        url: `${API_URL}usuarios?_id=${userId}`,
    })
})


Cypress.Commands.add('deleteUser', userId => {
    cy.request({
        method: 'DELETE',
        url: `${API_URL}usuarios/${userId}`,
    })
})