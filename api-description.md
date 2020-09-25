
| Método | URL              |                                                                           |
|:------:|:----------------:|:-------------------------------------------------------------------------:|
| POST   | /api/v1/signup   | Cria um novo usuário no banco                                             |
| GET    | /api/v1/login    | Faz login se os dados existem, retorna o usuário e token jwt              |
| GET    | /api/v1/users    | Retorna todos os usuários se token for válido \(cabem outras validações\) |
| POST   | /api/v1/document | Cria um novo document no banco e gera um arquivo em disco                 |
| GET    | /api/v1/document | Retorna todos os documents criados por aquele usuário                     |
| GET    | /api/v1/me       | Retorna os dados dados do usuário logado no momento                       |
