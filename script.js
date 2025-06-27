"use strict";
// Função para converter string no formato de tuplas para JSON
function convertTupleToJSON(input) {
    // Passo 1: Remove espaços em branco
    let cleaned = input.replace(/\s/g, '');
    // Passo 2: Substitui parênteses por colchetes
    cleaned = cleaned.replace(/\(/g, '[').replace(/\)/g, ']');
    // Passo 3: Verifica se há vírgulas faltantes entre elementos
    if (!cleaned.includes('],[')) {
        cleaned = cleaned.replace(/\]\[/g, '],[');
    }
    // Converte para objeto JavaScript
    const edges = JSON.parse(cleaned);
    return {
        jsonString: cleaned,
        edges
    };
}
// Função para calcular o caminho máximo em um DAG
function calculateMaxPath(edges) {
    const graph = new Map();
    const inDegree = new Map();
    for (const [u, v] of edges) {
        if (!graph.has(u))
            graph.set(u, []);
        if (!graph.has(v))
            graph.set(v, []);
        if (!inDegree.has(u))
            inDegree.set(u, 0);
        if (!inDegree.has(v))
            inDegree.set(v, 0);
        graph.get(u).push(v);
        inDegree.set(v, inDegree.get(v) + 1);
    }
    const queue = [];
    const distance = new Map();
    const previous = new Map();
    for (const node of graph.keys()) {
        distance.set(node, 0);
        previous.set(node, -1);
        if (inDegree.get(node) === 0) {
            queue.push(node);
        }
    }
    let lastNode = -1;
    while (queue.length > 0) {
        const u = queue.shift();
        lastNode = u;
        for (const v of graph.get(u)) {
            if (distance.get(v) < distance.get(u) + 1) {
                distance.set(v, distance.get(u) + 1);
                previous.set(v, u);
            }
            inDegree.set(v, inDegree.get(v) - 1);
            if (inDegree.get(v) === 0) {
                queue.push(v);
            }
        }
    }
    const maxDistance = Math.max(...Array.from(distance.values()));
    let current = lastNode;
    const path = [];
    while (current !== -1) {
        path.unshift(current);
        current = previous.get(current);
    }
    return { length: maxDistance, path };
}
// Função principal
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const edgesInput = document.getElementById('edges-input');
    const resultOutput = document.getElementById('result-output');
    const calculationSteps = document.getElementById('calculation-steps');
    calculateBtn.addEventListener('click', () => {
        try {
            let edges;
            let conversionMessage = '';
            const inputText = edgesInput.value.trim();
            if (inputText.startsWith('[') && inputText.includes('(')) {
                // Converte formato de tupla para JSON
                const conversionResult = convertTupleToJSON(inputText);
                edges = conversionResult.edges;
                conversionMessage = `Formato convertido para: ${conversionResult.jsonString}`;
            }
            else {
                // Tenta parsear diretamente como JSON
                edges = JSON.parse(inputText);
                conversionMessage = 'Formato JSON válido (nenhuma conversão necessária)';
            }
            // Validação da entrada
            if (!Array.isArray(edges)) {
                throw new Error('Entrada deve ser um array de arrays');
            }
            for (const edge of edges) {
                if (!Array.isArray(edge) || edge.length !== 2) {
                    throw new Error('Cada conexão deve ter exatamente 2 números');
                }
                if (typeof edge[0] !== 'number' || typeof edge[1] !== 'number') {
                    throw new Error('Os elementos da conexão devem ser números');
                }
            }
            // Calcula o caminho máximo
            const { length, path } = calculateMaxPath(edges);
            // Calcula nós únicos
            const allNodes = edges.reduce((acc, [u, v]) => acc.concat(u, v), []);
            const uniqueNodes = new Set(allNodes).size;
            // Exibe os resultados
            resultOutput.textContent = `Comprimento máximo do caminho: ${length}`;
            calculationSteps.innerHTML = `
                <p>Passos do cálculo:</p>
                <ol>
                    <li>${conversionMessage}</li>
                    <li>Grafo construído com ${edges.length} conexões entre ${uniqueNodes} pistas</li>
                    <li>Ordenação topológica aplicada para determinar a sequência de pistas</li>
                    <li>Caminho mais longo encontrado: ${path.length > 0 ? path.join(' → ') : 'Nenhum caminho encontrado'}</li>
                    <li>Total de portais utilizados: ${length}</li>
                </ol>
            `;
        }
        catch (error) {
            resultOutput.textContent = 'Erro';
            calculationSteps.textContent =
                error instanceof Error ? error.message : 'Formato inválido. Use: [(1,2),(3,4)] ou [[1,2],[3,4]]';
        }
    });
    resetBtn.addEventListener('click', () => {
        edgesInput.value = '';
        resultOutput.textContent = '';
        calculationSteps.textContent = '';
    });
});
