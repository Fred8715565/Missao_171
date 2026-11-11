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

    test("com 100% de desconto o resultado é zero", () => {
        expect(calcularDesconto(200, 100)).toBe(0);
    });

    test("lança erro para valor negativo", () => {
        expect(() => calcularDesconto(-10, 10)).toThrow("Dados inválidos");
    });
});

// QUESTÃO 2

describe("verificarAprovacao", () => {
    test("aprova nota 9", () => {
        expect(verificarAprovacao(9)).toBe("Aprovado");
    });

    test("aprova exatamente no limite (7)", () => {
        expect(verificarAprovacao(7)).toBe("Aprovado");
    });

    test("reprova nota 6.9", () => {
        expect(verificarAprovacao(6.9)).toBe("Reprovado");
    });

    test("lança erro para nota maior que 10", () => {
        expect(() => verificarAprovacao(11)).toThrow("Nota inválida");
    });
});

// QUESTÃO 3

describe("validarCadastro", () => {
    test("todos os dados válidos", () => {
        expect(validarCadastro("Ana", 25, "ana@email.com")).toBe(true);
    });

    test("todos os dados inválidos", () => {
        expect(validarCadastro("", 10, "emailinvalido")).toBe(false);
    });

    test("nome vazio", () => {
        expect(validarCadastro("", 25, "ana@email.com")).toBe(false);
    });

    test("nome com apenas espaços", () => {
        expect(validarCadastro("   ", 25, "ana@email.com")).toBe(false);
    });

    test("idade vazia", () => {
        expect(validarCadastro("Ana", null, "ana@email.com")).toBe(false);
    });

    test("idade abaixo do limite", () => {
        expect(validarCadastro("Ana", 17, "ana@email.com")).toBe(false);
    });

    test("idade acima do limite", () => {
        expect(validarCadastro("Ana", 101, "ana@email.com")).toBe(false);
    });

    test("e-mail vazio", () => {
        expect(validarCadastro("Ana", 25, "")).toBe(false);
    });

    test("e-mail sem @", () => {
        expect(validarCadastro("Ana", 25, "anaemail.com")).toBe(false);
    });
});

// QUESTÃO 4

describe("calcularFrete", () => {
    test("caso 1: compra de 250 tem frete grátis", () => {
        expect(calcularFrete(250, 10)).toBe(0);
    });

    test("caso 2: compra de 100 e distância 10 custa 20", () => {
        expect(calcularFrete(100, 10)).toBe(20);
    });

    test("caso 3: compra de exatamente 200 tem frete grátis", () => {
        expect(calcularFrete(200, 5)).toBe(0);
    });

    test("caso 4: compra de 0 e distância 10 custa 20", () => {
        expect(calcularFrete(0, 10)).toBe(20);
    });

    test("caso 5: valor da compra negativo lança erro", () => {
        expect(() => calcularFrete(-50, 10)).toThrow("Valores inválidos");
    });

    test("caso 6: distância negativa lança erro", () => {
        expect(() => calcularFrete(100, -5)).toThrow("Valores inválidos");
    });
});

// QUESTÃO 5

describe("converterCelsiusParaFahrenheit", () => {
    test("caso 1: 0 °C = 32 °F", () => {
        expect(converterCelsiusParaFahrenheit(0)).toBe(32);
    });

    test("caso 2: 100 °C = 212 °F", () => {
        expect(converterCelsiusParaFahrenheit(100)).toBe(212);
    });

    test("caso 3: -40 °C = -40 °F", () => {
        expect(converterCelsiusParaFahrenheit(-40)).toBe(-40);
    });

    test("caso 4: 25 °C = 77 °F", () => {
        expect(converterCelsiusParaFahrenheit(25)).toBe(77);
    });

    test("caso 5: string numérica '25' lança erro", () => {
        expect(() => converterCelsiusParaFahrenheit("25")).toThrow("A temperatura deve ser numérica");
    });

    test("caso 6: string não numérica 'abc' lança erro", () => {
        expect(() => converterCelsiusParaFahrenheit("abc")).toThrow("A temperatura deve ser numérica");
    });
});

// QUESTÃO 9 (segunda questão 8 do PDF)

describe("calcularMedia", () => {
    test("calcula média com resultado decimal", () => {
        expect(calcularMedia(7, 8)).toBe(7.5);
    });

    test("lança erro quando a nota 1 é negativa", () => {
        expect(() => calcularMedia(-1, 8)).toThrow("Notas inválidas");
    });

    test("lança erro quando a nota 2 é maior que 10", () => {
        expect(() => calcularMedia(5, 15)).toThrow("Notas inválidas");
    });
});