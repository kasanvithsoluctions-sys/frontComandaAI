# Acesso e privacidade

O formulário abre `/cliente/menu` somente após resposta bem-sucedida da sessão de desenvolvimento. O modo de demonstração não envia nome, e-mail ou senha nem cria usuários. A rota de sessão permanece indisponível em produção; o cookie de role também não é aceito em produção. Sem cookie não há mais usuário padrão implícito.

Cadastro na demonstração exige checkbox de termos desmarcado inicialmente. O servidor verifica aceite e versão quando `mode=register`. Isso não constitui um registro persistente de aceite para contas reais.

Antes de disponibilizar autenticação real, integrar o backend que valida credenciais, armazena senhas com hash apropriado, controla tentativas e emite sessões verificáveis. Registrar no servidor o usuário, a versão dos termos e a data do aceite junto à criação da conta, na mesma operação. Não reutilizar o cookie de role de demonstração como autenticação em produção.

O aviso aparece após concluir o cadastro, em uma faixa compacta de largura total, sem botão flutuante. A página de privacidade mantém um botão para rever a escolha. O aviso permite aceitar ou recusar opcionais, consultar detalhes e alterar a decisão. O registro local contém versão, data e escolha e expira em 180 dias. Nenhum rastreador opcional foi instalado. Ferramentas futuras precisam de bloqueio prévio e de nova solicitação de consentimento para suas finalidades. O aceite dos termos é separado da escolha de cookies.

As páginas `/termos` e `/privacidade` descrevem o comportamento atual da demonstração. Para o serviço real, completar identificação e contato do controlador, bases legais, retenção e compartilhamentos conforme a operação efetiva. Referência: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais

Verificação neste ambiente: `git diff --check`. Execução de build e validação no navegador dependem de Node.js/npm, ausentes no ambiente.
