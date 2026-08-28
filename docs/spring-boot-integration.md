# Integração com Spring Boot

Configure `NEXT_PUBLIC_API_BASE_URL` com a URL base do backend, por exemplo `http://localhost:8080/api`.

Os adapters em `lib/api/` são o único ponto que conhece HTTP. Componentes de interface não fazem `fetch` diretamente.

| Serviço | Endpoint esperado | Uso |
| --- | --- | --- |
| `menuService.list()` | `GET /products` | Cardápio |
| `menuService.getById(id)` | `GET /products/{id}` | Detalhes |
| `orderService.create(payload)` | `POST /orders` | Criar pedido |
| `orderService.getById(id)` | `GET /orders/{id}` | Status do pedido |
| `orderService.cancel(id)` | `DELETE /orders/{id}` | Cancelamento |

`CreateOrderPayload` envia `tableId` e uma lista de `{ id, quantity }`. Os contratos de resposta usam os tipos de domínio existentes em `types/`. Ao substituir os mocks, use os serviços na camada de estado/hook da tela; a UI pode permanecer inalterada.
