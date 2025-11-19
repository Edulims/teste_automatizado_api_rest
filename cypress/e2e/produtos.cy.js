/// <reference types= "cypress"/>

describe('Teste de API - Produtos', () => {

  let token
  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
      token = tkn
    }) 
  });

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
    
    let produto = "Produto Teste " + Math.floor(Math.random() * 10000000)
    cy.request({
      method: 'POST',
      url: 'produtos',
      headers: {authorization: token},
      body: {
        "nome": produto,
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