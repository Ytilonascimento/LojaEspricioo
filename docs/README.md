## API Reference

### Produtos

#### GET /produtos
**Descrição**: obtem uma lista de produtos
**Response**: Array de produtos
**Parameters**: Busca um unico produto pelo o idProduto
```
/produto?idProduto=123
```

#### POST /produtos
**Descrição**: Cria um novo produto
**Body**:

{
    "nomeProduto": "produtoExemplo",
    ""
}