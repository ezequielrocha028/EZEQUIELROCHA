# Site NA MISSÃO — Ezequiel Rocha

Para ver o site, abra o arquivo `index.html` no navegador.

## Fotos que faltam

Coloque as fotos na pasta `imagens/` com exatamente estes nomes. Enquanto uma foto não existir, aparece um quadro verde no lugar dela.

| Arquivo | Onde aparece |
|---|---|
| `imagens/capa.jpg` | Fundo da capa (fica em preto e branco com filtro verde) |
| `imagens/perfil.jpg` | Seção "Quem sou eu" (foto vertical) |
| `imagens/parceria.jpg` | Seção "Parceria" |
| `imagens/qrcode-whatsapp.png` | QR Code do WhatsApp |
| `imagens/galeria/01.jpg` até `08.jpg` | Galeria "Pés no campo" (8 fotos; a 01 aparece maior) |
| `imagens/livros/haryporia.jpg` | Capa do livro Haryporia |
| `imagens/livros/upinima.jpg` | Capa do livro Ūpinima |

## Cores

Paleta: verde `#009C53` (principal), laranja `#FF5300`, amarelo `#FFD332`, azul `#0C3EFF` e branco `#FFFFFF`. As cores ficam no começo do arquivo `style.css`.

Regra de contraste usada em todo o site: sobre verde, laranja ou amarelo o texto é sempre escuro; sobre azul ou sobre o fundo escuro o texto é branco. Todos os textos passam no padrão de acessibilidade WCAG AA.

## Filtro das fotos da galeria

As 8 fotos da galeria passam pelo mesmo filtro de cor, para todas ficarem com a mesma cara. Para tratar uma foto nova do mesmo jeito: `python3 ferramentas/filtro-galeria.py foto-original.jpg site/imagens/galeria/09.jpg`
