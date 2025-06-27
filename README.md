🚀 Corrida Estelar: O Enigma das Rotas Celestiais 🌌


Um projeto interativo que resolve o desafio de encontrar a maior sequência de pistas únicas em uma corrida intergaláctica utilizando algoritmos de grafos.

📋 Descrição

Este projeto ajuda a piloto da Nave Valkiria a identificar a maior sequência de pistas únicas que pode percorrer em uma corrida intergaláctica, onde cada portal entre pistas pode ser utilizado apenas uma vez.

✨ Funcionalidades

🎯 Calcula o caminho máximo em um grafo acíclico dirigido (DAG)

🔄 Aceita dois formatos de entrada:

Formato de tupla: [(1,2), (2,3), (3,4)]

Formato JSON: [[1,2], [2,3], [3,4]]

📊 Mostra detalhes do cálculo:

Conversão de formato (quando aplicável)

Estatísticas do grafo

Caminho encontrado

Total de portais utilizados

🛠️ Tecnologias
TypeScript

HTML5

CSS3 com animações modernas

Algoritmos de grafos

📝 Exemplos de Entrada
Formato de tupla:
text
[(1,2), (2,3), (3,4), (1,3)]

Formato JSON:
text
[[1,2], [2,3], [3,4], [1,3]]

📌 Exemplo de Saída
text
Comprimento máximo do caminho: 3

Passos do cálculo:
1. Formato convertido para: [[1,2],[2,3],[3,4],[1,3]]
2. Grafo construído com 4 conexões entre 4 pistas
3. Ordenação topológica aplicada para determinar a sequência de pistas
4. Caminho mais longo encontrado: 1 → 2 → 3 → 4
5. Total de portais utilizados: 3

🎨 Design
Interface com tema espacial

Botões com efeitos de animação modernos

Layout responsivo

Visualização clara dos resultados

⭐️ Inspirado nos desafios da OneBitCode
