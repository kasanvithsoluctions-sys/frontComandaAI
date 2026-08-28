# Arquitetura por áreas e roles

O projeto continua sendo uma única aplicação Next.js. As áreas são rotas App Router, não projetos separados:

```text
app/
  cliente/  → CLIENTE
  garcom/   → GARCOM
  cozinha/  → COZINHA
  dono/     → DONO
```

Rotas do cliente: `/cliente/menu`, `/cliente/cardapio`, `/cliente/carrinho`, `/cliente/pedido`, `/cliente/pedidos`, `/cliente/mesa` e `/cliente/perfil`.

Rotas principais do dono: `/dono/restaurante`, `/dono/menu`, `/dono/mesas`, `/dono/pedidos` e `/dono/perfil`.

Cada área possui um `layout.tsx` que chama `RoleGuard` no servidor. Ele lê a sessão centralizada em `lib/auth/session.ts`, redireciona usuários não autenticados para `/login` e usuários sem permissão para a rota inicial da própria role.

Para revisar visualmente todas as áreas sem sessão, use `BYPASS_ROLE_GUARD=true` em `.env.local`. Remova essa variável ou defina `false` antes de publicar.

O seletor em `/login` existe apenas para desenvolvimento e é bloqueado em produção. Na integração real, substitua a leitura do cookie em `getCurrentUser()` por uma sessão/JWT validada pelo Spring Boot. O backend precisa aplicar as mesmas regras de autorização nos endpoints: a proteção de rota do Next melhora a experiência, mas não substitui a segurança da API.

Chamadas HTTP continuam isoladas em `lib/api/`; componentes não acessam `fetch` diretamente.
