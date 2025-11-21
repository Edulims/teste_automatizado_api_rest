/// <reference types= "cypress"/>
import produtosSchema from "../contratos/produtos.contrato";

describe('Teste de API - Produtos', () => {

  let token
  beforeEach(() => {
    cy.token('fulano@qa.com', 'teste').then(tkn => {
      token = tkn
    }) 
  });

  it.only('Deve validar contrato de produtos com sucesso', () => {
    cy.request('produtos').then(response =>{
      return produtosSchema.validateAsync(response.body)
    })
  });

  it('Deve listar produtos cadastrados com sucesso - GET', () => {
    cy.request({
      method: 'GET',
      url: 'produtos',
      
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('produtos')
    })
  });

  it('Deve Cadastrar produto com sucesso - POST', () => {
    
    let produto = "Produto Teste " + Math.floor(Math.random() * 10000000)
     cy.cadastrarProduto(token, produto, 99, 'produto teste', 100)
    .should((response) => {
      expect(response.status).equal(201)
      expect(response.body.message).equal("Cadastro realizado com sucesso")
    })

  });

  it('Deve validar mensagem de produto cadastrado anteriomente - POST' ,() => {
     cy.cadastrarProduto(token, 'Cabo USB 001', 10, 'Cabo USB tipo c', 100)
    .should((response) => {
      expect(response.status).equal(400)
      expect(response.body.message).equal("Já existe produto com esse nome")
    })

  });

  it('Deve editar um produto com sucesso - PUT', () => {
    let produto = "Produto Teste Editado " + Math.floor(Math.random() * 10000000)
    cy.cadastrarProduto(token, produto, 199, 'produto teste editado', 199)
    .then(response => {
      let id = response.body._id
      cy.request({
      method: 'PUT',
      url: `produtos/${id}`,
      headers: {authorization: token},
      body: {
        "nome": produto,
        "preco": 500,
        "descricao": "teste editado",
        "quantidade": 100
      }
    }).should(response => {
      expect(response.body.message).to.equal("Registro alterado com sucesso")
      expect(response.status).to.equal(200)
      })

    })
    
  });

  it('Deve deletar um produto com sucesso - DELETE', () =>{
    cy.cadastrarProduto(token, 'Produto teste para ser deletado', 100, 'Delete', 50)
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `produtos/${id}`,
        headers: {authorization:token}
      }).should(response => {
        expect(response.body.message).to.equal("Registro excluído com sucesso")
        expect(response.status).to.equal(200)
      })
    })

  })




})