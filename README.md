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

```js
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
```

## b
> Explique por que o caso 3 deve retornar zero se o valor da compra for maior ou igual a R$ 200,00.

A condição da função é `valorCompra >= 200`, ou seja, o frete é grátis a partir de R$ 200,00, **inclusive** o próprio 200. No caso 3 a compra vale exatamente 200, então a condição é verdadeira, a função retorna 0 e nem chega a calcular `distancia * 2` (que daria 10). Esse caso testa o valor de fronteira, que é onde costuma aparecer o erro de usar `>` no lugar de `>=`.

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

```js
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
```

## b
> Explique por que a entrada "25" deve provocar um erro, mesmo representando numericamente o valor 25.

A entrada `"25"` deve provocar erro porque a função valida o **tipo** do dado com `typeof celsius !== "number"`, e `"25"` é uma string, não um número, mesmo que o conteúdo pareça numérico. A função exige que a temperatura seja do tipo número. Aceitar strings dependeria de uma conversão automática do JavaScript (coerção), que pode esconder erros de quem chama a função (como um valor de formulário que chega como texto e não foi convertido) e levar a resultados incorretos, como `NaN` para entradas do tipo `"abc"`. O teste garante que essa regra de validação seja respeitada.

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

Testes unitários são testes automatizados que verificam a menor parte testável de um sistema (normalmente uma função ou método) de forma isolada, comparando o resultado obtido com o resultado esperado. São importantes porque detectam erros cedo, quando corrigir é mais barato; protegem contra regressões quando o código é alterado (se algo quebrar, o teste avisa); documentam o comportamento esperado da função; e dão segurança para refatorar e para entregar código com qualidade, já que podem rodar automaticamente a cada alteração.

## b
> Para cada teste, informe se ele PASSA ou FALHA. Justifique individualmente.

Teste A - **PASSA**. A função calcula 3 × 10 = 30 e o teste espera 30.
Teste B - **PASSA**. 0 não é negativo, então não cai no erro, e 0 × 10 = 0, que é o esperado.
Teste C - **PASSA**. A quantidade -2 é negativa, então a função lança "Valores inválidos", exatamente o que o teste espera com `toThrow`.
Teste D - **FALHA**. O preço -5 é negativo, então a função lança erro em vez de retornar -10. Como o teste não captura o erro, ele quebra.

## c
> Identifique qual(is) teste(s) apresenta(m) uma expectativa incompatível com o comportamento da função. Justifique.

O **Teste D** tem uma expectativa incompatível com o comportamento da função. Ele espera que `calcularTotal(2, -5)` retorne -10, mas a função proíbe preço negativo (`precoUnitario < 0`) e lança o erro "Valores inválidos" em vez de retornar um valor. O problema está no teste, não na função. O teste correto seria: `expect(() => calcularTotal(2, -5)).toThrow("Valores inválidos");`

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

Teste A - **PASSA**. "abc12345" tem 8 caracteres. A condição `senha.length < 8` é falsa (8 não é menor que 8), então a função retorna `true`, como o teste espera.
Teste B - **PASSA**. "abc123" tem 6 caracteres. 6 < 8 é verdadeiro, então a função retorna `false`, como o teste espera.
Teste C - **FALHA**. "abc1234567" tem 10 caracteres. 10 < 8 é falso, então a função retorna `true`, mas o teste espera `false`.
Teste D - **PASSA**. "abc123456789" tem 12 caracteres. 12 < 8 é falso, então a função retorna `true`, como o teste espera.

## b
> Explique qual é o problema que apresenta o teste C.

O problema do Teste C está na própria **expectativa do teste**. Uma senha de 10 caracteres atende ao requisito de tamanho mínimo (8 ou mais), então a função corretamente a aceita (`true`). O teste afirma que ela deveria ser rejeitada (`false`), o que contradiz a regra implementada. O erro está no teste, não na função. O nome do teste também está errado: não faz sentido rejeitar uma senha só por ter 10 caracteres.

## d
> A função verifica se a senha possui letras maiúsculas, números ou caracteres especiais? Justifique. (O PDF pula a letra "c".)

**Não.** A função só verifica o comprimento da senha (`senha.length < 8`). Ela não checa se há letras maiúsculas, números ou caracteres especiais. Por isso uma senha como "aaaaaaaa" (8 letras minúsculas iguais) seria considerada válida.

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

Teste A - **PASSA**. Quantidade 5 e estoque 20: 5 não é menor ou igual a 0 e 5 > 20 é falso, então retorna "Pedido aprovado".
Teste B - **PASSA**. Quantidade 10 e estoque 5: 10 > 5 é verdadeiro, então retorna "Estoque insuficiente".
Teste C - **PASSA**. Quantidade 10 e estoque 10: 10 > 10 é falso, então retorna "Pedido aprovado".
Teste D - **FALHA**. Quantidade 0 cai em `quantidadeSolicitada <= 0`, então a função lança o erro "Quantidade inválida" em vez de retornar "Estoque insuficiente".
Teste E - **PASSA**. Quantidade -2 é menor ou igual a 0, então a função lança "Quantidade inválida", exatamente o que o teste espera com `toThrow`.

## b
> Explique por que o teste C deve passar mesmo quando a quantidade solicitada é igual ao estoque disponível.

Porque a função só considera o estoque insuficiente quando a quantidade solicitada é **estritamente maior** que o estoque (`quantidadeSolicitada > estoque`). Se o cliente pede 10 e existem 10 unidades, o estoque atende o pedido por completo, então o resultado correto é "Pedido aprovado". O teste C verifica justamente esse valor de fronteira e garante que o código usa `>` e não `>=`.

## c
> Explique qual é o problema presente no teste D.

O Teste D espera que a quantidade 0 retorne "Estoque insuficiente", mas a função trata 0 como quantidade **inválida** (`quantidadeSolicitada <= 0`) e lança o erro "Quantidade inválida". Pedir zero unidades não é falta de estoque, é um dado inválido. O teste está com a expectativa errada. O correto seria: `expect(() => verificarEstoque(10, 0)).toThrow("Quantidade inválida");`

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

Teste 1 - **PASSA**. As notas 8 e 6 são válidas e (8 + 6) / 2 = 7, que é o valor esperado.
Teste 2 - **PASSA**. A nota 10 é válida (a função só rejeita notas maiores que 10) e (10 + 10) / 2 = 10, que é o valor esperado.
Teste 3 - **PASSA**. A nota 0 é válida (a função só rejeita notas menores que 0) e (0 + 8) / 2 = 4, que é o valor esperado.
Teste 4 - **FALHA**. A nota -1 é menor que 0, então a função lança "Notas inválidas" em vez de retornar 3.5. O teste deveria usar `toThrow`.
Teste 5 - **FALHA**. A nota 15 é maior que 10, então a função lança "Notas inválidas" em vez de retornar 10. O teste deveria usar `toThrow`.

Os testes 4 e 5 esperam um valor numérico de entradas que a função rejeita com erro. A correção é: `expect(() => calcularMedia(-1, 8)).toThrow("Notas inválidas");` e `expect(() => calcularMedia(5, 15)).toThrow("Notas inválidas");`.

## b
> Crie mais três testes unitários que complementam os testes apresentados.

```js
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
```