/// <reference types= "cypress"/>

describe('Teste de API - Produtos', () => {
  it('Deve listar produtos cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'produtos',
      
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('produtos')
    })
  });

  it.only('Cadastrar produto - POST', () => {
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BxYS5jb20iLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzYzMzk5MjU3LCJleHAiOjE3NjMzOTk4NTd9.VHW53zPjKhZTpgTDYOdsUO0VJhY3EJePJWH-Ss_i0JM"
    cy.request({
      method: 'POST',
      url: 'produtos',
      headers: {authorization: token},
      body: {
        "nome": "Cabo USB 001",
        "preco": 15,
        "descricao": "cabo usb tipo c",
        "quantidade": 100
      }
      
    }).should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal("Cadastro realizado com sucesso")
    })

  });

})