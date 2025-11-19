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

  it('Cadastrar produto com SUCESSO - POST', () => {
    
    let produto = "Produto Teste " + Math.floor(Math.random() * 10000000)
     cy.cadastrarProduto(token, produto, 99, 'produto teste', 100)
    .should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal("Cadastro realizado com sucesso")
    })

  });

  it('Deve validar mensagem de produto cadastrado anteriomente' ,() => {
     cy.cadastrarProduto(token, 'Cabo USB 001', 10, 'Cabo USB tipo c', 100)
    .should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).equal("Já existe produto com esse nome")
    })

  });




})