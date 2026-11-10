# Nome

Missão 171 - O Desafio dos 8 Portais (UC10 - Realizar Testes nas Aplicações Desenvolvidas)

---

# Questão 1

> Função `calcularDesconto` (em `src/operacoes.js`).

## a
> Explique, com suas palavras e de forma detalhada, o que a função faz.

A função recebe dois parâmetros: o `valor` (preço original) e o `percentual` de desconto. Primeiro ela valida os dados: se o valor for menor ou igual a zero, ou se o percentual for menor que 0 ou maior que 100, ela lança um erro com a mensagem "Dados inválidos" e para a execução. Se os dados forem válidos, ela calcula o desconto multiplicando o valor pelo percentual dividido por 100 (por exemplo, 10% de 100 resulta em desconto de 10). Por fim, retorna o valor original menos o desconto, ou seja, o preço final já com o desconto aplicado.

## b
> Identifique pelo menos 3 cenários que deveriam ser testados. Informe o valor de entrada (E) e o resultado esperado (S).

C1 - E: valor 100, percentual 10; S: 90 (desconto comum)
C2 - E: valor 200, percentual 100; S: 0 (desconto máximo permitido)
C3 - E: valor -10, percentual 10; S: erro "Dados inválidos" (valor inválido)

## c
> Escreva testes unitários utilizando Jest com base nos 3 cenários descritos acima.

```js
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
```

---

# Questão 2

> Função `verificarAprovacao` (em `src/operacoes.js`).

## a
> Explique de forma detalhada o funcionamento da função.

A função recebe uma `nota`. Primeiro verifica se a nota é válida: se for menor que 0 ou maior que 10, lança um erro "Nota inválida". Com a nota dentro do intervalo de 0 a 10, ela verifica se a nota é maior ou igual a 7; se for, retorna "Aprovado". Caso contrário (nota de 0 até menos de 7), retorna "Reprovado". Ou seja, a função tem três resultados possíveis: erro, "Aprovado" e "Reprovado".

## b
> Identifique pelo menos 4 cenários que deveriam ser testados. Informe o valor de entrada (E) e o resultado esperado (S).

C1 - E: 9; S: "Aprovado" (nota acima da média)
C2 - E: 7; S: "Aprovado" (valor de fronteira, exatamente a média)
C3 - E: 6.9; S: "Reprovado" (logo abaixo da média)
C4 - E: 11; S: erro "Nota inválida" (nota fora do intervalo)

## c
> Escreva testes unitários utilizando Jest com base nos 4 cenários descritos acima.

```js
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
```

## d
> Explique por que testar apenas uma nota de aprovação não seria suficiente para verificar o comportamento da função.

Porque uma única nota de aprovação só exercita um dos caminhos da função. Ela não prova que a nota 7 (o limite) é aprovada, nem que as notas baixas são reprovadas, nem que notas inválidas geram erro. Uma função com defeito, como `nota > 7` ou `nota >= 5`, ainda passaria no teste de uma nota como 9 e o bug passaria despercebido. Por isso é preciso testar os dois lados da decisão, os valores de fronteira (6.9 e 7) e os casos inválidos.

---

# Questão 3

> Função `validarCadastro` (em `src/operacoes.js`).

## a
> Identifique quais condições precisam ser atendidas para que o cadastro seja considerado válido.

As três condições precisam ser verdadeiras ao mesmo tempo:
- **Nome:** deve ser informado e não pode ser vazio nem conter apenas espaços (a função usa `trim()`).
- **Idade:** deve ser informada (não pode ser vazia, nula ou 0) e estar entre 18 e 100, inclusive.
- **E-mail:** deve ser informado e conter o caractere `@`.

## b
> Implemente os casos de testes unitários abaixo utilizando Jest.

```js
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
```

## c
> Explique qual seria o resultado esperado quando apenas um dos três dados informados for inválido.

O resultado esperado é `false`. A função só retorna `true` se passar pelas três validações. Basta um dado inválido para que ela retorne `false` na verificação correspondente, mesmo que os outros dois estejam corretos.

---

# Questão 4

> Função `calcularFrete` (em `src/operacoes.js`).

| Caso | Valor da compra | Distância | Resultado esperado |
|------|-----------------|-----------|--------------------|
| 1 | 250 | 10 | 0 |
| 2 | 100 | 10 | 20 |
| 3 | 200 | 5 | 0 |
| 4 | 0 | 10 | 20 |
| 5 | -50 | 10 | Erro |
| 6 | 100 | -5 | Erro |

## a
> Implemente os 6 casos de testes unitários da tabela acima utilizando Jest. Use `toBe()` para os resultados numéricos e `toThrow()` para as exceções.

<tests>

## b
> Explique por que o caso 3 deve retornar zero se o valor da compra for maior ou igual a R$ 200,00.

<Insira a resposta aqui>

---

# Questão 5

> Função `converterCelsiusParaFahrenheit` (em `src/operacoes.js`).

| Caso | Entrada | Resultado esperado |
|------|---------|--------------------|
| 1 | 0 | 32 |
| 2 | 100 | 212 |
| 3 | -40 | -40 |
| 4 | 25 | 77 |
| 5 | "25" | Erro |
| 6 | "abc" | Erro |

## a
> Escreva os 6 testes unitários da tabela acima utilizando Jest. Use `toBe()` para os resultados numéricos e `toThrow()` para as exceções.

<tests>

## b
> Explique por que a entrada "25" deve provocar um erro, mesmo representando numericamente o valor 25.

<Insira a resposta aqui>

---

# Questão 6

> Função `calcularTotal` (em `src/operacoes.js`). Testes já feitos:

```js
// Teste A
test("deve calcular o total corretamente", () => {
    expect(calcularTotal(3, 10)).toBe(30);
});

// Teste B
test("deve retornar zero quando a quantidade for zero", () => {
    expect(calcularTotal(0, 10)).toBe(0);
});

// Teste C
test("deve lançar erro quando a quantidade for negativa", () => {
    expect(() => calcularTotal(-2, 10)).toThrow("Valores inválidos");
});

// Teste D
test("deve calcular o total com preço negativo", () => {
    expect(calcularTotal(2, -5)).toBe(-10);
});
```

## a
> O que são testes unitários e por que são importantes no desenvolvimento de sistemas?

<Insira a resposta aqui>

## b
> Para cada teste, informe se ele PASSA ou FALHA. Justifique individualmente.

Teste A - 
Teste B - 
Teste C - 
Teste D - 

## c
> Identifique qual(is) teste(s) apresenta(m) uma expectativa incompatível com o comportamento da função. Justifique.

<Insira a resposta aqui>

---

# Questão 7

> Função `validarSenha` (em `src/operacoes.js`). Testes já feitos:

```js
// Teste A
test("deve aceitar senha com 8 caracteres", () => {
    expect(validarSenha("abc12345")).toBe(true);
});

// Teste B
test("deve rejeitar senha com menos de 8 caracteres", () => {
    expect(validarSenha("abc123")).toBe(false);
});

// Teste C
test("deve rejeitar senha com 10 caracteres", () => {
    expect(validarSenha("abc1234567")).toBe(false);
});

// Teste D
test("deve aceitar senha com 12 caracteres", () => {
    expect(validarSenha("abc123456789")).toBe(true);
});
```

## a
> Identifique quais testes passam e quais falham. Justifique cada resposta considerando a condição implementada na função.

Teste A - 
Teste B - 
Teste C - 
Teste D - 

## b
> Explique qual é o problema que apresenta o teste C.

<Insira a resposta aqui>

## d
> A função verifica se a senha possui letras maiúsculas, números ou caracteres especiais? Justifique. (O PDF pula a letra "c".)

<Insira a resposta aqui>

---

# Questão 8

> Função `verificarEstoque` (em `src/operacoes.js`). Testes já feitos:

```js
// Teste A
test("deve aprovar pedido quando há estoque suficiente", () => {
    expect(verificarEstoque(20, 5)).toBe("Pedido aprovado");
});

// Teste B
test("deve informar estoque insuficiente", () => {
    expect(verificarEstoque(5, 10)).toBe("Estoque insuficiente");
});

// Teste C
test("deve aprovar pedido com quantidade igual ao estoque", () => {
    expect(verificarEstoque(10, 10)).toBe("Pedido aprovado");
});

// Teste D
test("deve retornar estoque insuficiente para quantidade zero", () => {
    expect(verificarEstoque(10, 0)).toBe("Estoque insuficiente");
});

// Teste E
test("deve lançar erro para quantidade negativa", () => {
    expect(() => verificarEstoque(10, -2)).toThrow("Quantidade inválida");
});
```

## a
> Identifique quais testes passam e quais falham. Justifique cada resposta.

Teste A - 
Teste B - 
Teste C - 
Teste D - 
Teste E - 

## b
> Explique por que o teste C deve passar mesmo quando a quantidade solicitada é igual ao estoque disponível.

<Insira a resposta aqui>

## c
> Explique qual é o problema presente no teste D.

<Insira a resposta aqui>

---

# Questão 9 (segunda questão 8 do PDF)

> Função `calcularMedia` (em `src/operacoes.js`). Testes criados pelo desenvolvedor:

```js
test("Teste 1", () => {
    expect(calcularMedia(8, 6)).toBe(7);
});

test("Teste 2", () => {
    expect(calcularMedia(10, 10)).toBe(10);
});

test("Teste 3", () => {
    expect(calcularMedia(0, 8)).toBe(4);
});

test("Teste 4", () => {
    expect(calcularMedia(-1, 8)).toBe(3.5);
});

test("Teste 5", () => {
    expect(calcularMedia(5, 15)).toBe(10);
});
```

## a
> Analise os cinco testes e indique quais passam e quais falham, justificando cada um individualmente.

Teste 1 - 
Teste 2 - 
Teste 3 - 
Teste 4 - 
Teste 5 - 

## b
> Crie mais três testes unitários que complementam os testes apresentados.

<tests>