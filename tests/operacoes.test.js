const {
    calcularDesconto,
    verificarAprovacao,
    validarCadastro,
    calcularFrete,
    converterCelsiusParaFahrenheit,
    calcularTotal,
    validarSenha,
    verificarEstoque,
    calcularMedia,
} = require("../src/operacoes");

// QUESTÃO 1

describe("calcularDesconto", () => {
    test("aplica 10% de desconto em 100", () => {
        expect(calcularDesconto(100, 10)).toBe(90);
    });
});

// QUESTÃO 2

describe("verificarAprovacao", () => {
    //testes
});

// QUESTÃO 3

describe("validarCadastro", () => {
    //testes
});

// QUESTÃO 4

describe("calcularFrete", () => {
    //testes
});

// QUESTÃO 5

describe("converterCelsiusParaFahrenheit", () => {
    //testes
});

// QUESTÃO 9 (segunda questão 8 do PDF)

describe("calcularMedia", () => {
    //testes complementares
});
