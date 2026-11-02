# Integração com Spring Boot

Configure `NEXT_PUBLIC_API_BASE_URL` com a URL base do backend, por exemplo `http://localhost:8080/api`.

Os adapters em `lib/api/` são o único ponto que conhece HTTP. Componentes de interface não fazem `fetch` diretamente.

| Serviço | Endpoint esperado | Uso |
| --- | --- | --- |
| `menuService.list()` | `GET /products` | Cardápio |
| `menuService.getById(id)` | `GET /products/{id}` | Detalhes |
| `menuService.delete(id)` | `DELETE /products/{id}` | Excluir produto do menu |
| `orderService.create(payload)` | `POST /orders` | Criar pedido |
| `orderService.getById(id)` | `GET /orders/{id}` | Status do pedido |
| `orderService.cancel(id)` | `DELETE /orders/{id}` | Cancelamento |
| `restaurantService.getCurrent()` | `GET /restaurants/current` | Verificar restaurante do dono |
| `restaurantService.create(payload)` | `POST /restaurants` | Criar restaurante |
| `restaurantService.update(id, payload)` | `PATCH /restaurants/{id}` | Configurar endereço e horários |
| `tableService.list(restaurantId)` | `GET /restaurants/{restaurantId}/tables` | Listar mesas e seus acessos |
| `tableService.create(restaurantId, payload)` | `POST /restaurants/{restaurantId}/tables` | Criar mesa, token e QR Code |
| `tableService.update(restaurantId, tableId, payload)` | `PATCH /restaurants/{restaurantId}/tables/{tableId}` | Atualizar número, nome e status |
| `tableService.delete(restaurantId, tableId)` | `DELETE /restaurants/{restaurantId}/tables/{tableId}` | Excluir mesa e invalidar acesso público |
| `tableService.regenerateQrCode(restaurantId, tableId)` | `POST /restaurants/{restaurantId}/tables/{tableId}/qr-code/regenerate` | Invalidar token antigo e gerar novo QR Code |

`CreateOrderPayload` envia `tableId` e uma lista de `{ id, quantity }`. Os contratos de resposta usam os tipos de domínio existentes em `types/`. Ao substituir os mocks, use os serviços na camada de estado/hook da tela; a UI pode permanecer inalterada.

Ao criar uma mesa, o backend deve criar atomicamente seu `publicToken`, `publicUrl` e `qrCodeImageUrl`. A URL pública identifica restaurante e mesa sem expor IDs sequenciais. A regeneração deve invalidar o token anterior. `qrCodeImageUrl` deve apontar para uma imagem PNG ou SVG acessível para visualização e download. O backend deve validar o restaurante da URL contra a sessão do dono.

Mesas usam `identifier` textual de 1 a 20 caracteres, permitindo valores como `15`, `A1`, `Varanda` ou `Balcão 2`. O backend deve normalizar espaços, comparar identificadores sem diferenciar maiúsculas/minúsculas e impedir duplicidade dentro do mesmo restaurante.

`CreateRestaurantPayload` envia `name`, `slug`, `address` e `openingHours`. `address` contém `country`, `state`, `city`, `postalCode`, `neighborhood`, `street`, `number` e `complement` opcional. `openingHours` contém `days`, `opensAt` e `closesAt`. O backend deve repetir todas as validações de formato, limites e autorização feitas no frontend.
