# Contratos das APIs

Estrutura vazia para preencher a partir dos contratos reais do backend.
Os arquivos usam `export {}` somente para serem módulos TypeScript válidos.

Cada funcionalidade possui:

- `models.ts`: dados da entidade retornada pela API.
- `requests.ts`: corpos, parâmetros de rota e filtros enviados à API.
- `responses.ts`: respostas específicas das operações.
- `index.ts`: exportações de tipos da funcionalidade.

`shared/` reserva espaço para paginação, erros e envelopes comuns de resposta.

Importe os contratos pela funcionalidade, por exemplo `@/app/types/api/mesas`.
Ao preencher, use nomes específicos como `Mesa`, `CriarMesaRequest` e
`ListarMesasResponse` para evitar colisões.

Esta pasta não executa requisições. As chamadas HTTP ficam em `lib/api/`.
Os tipos existentes em `app/types/`, `types/` e nos serviços foram preservados.
Migre os serviços para os novos contratos quando os campos reais forem definidos.
