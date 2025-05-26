
### ✅ **Referência de Clareza e Responsabilidade no Código (NestJS + DDD)**

> Padrão de referência para avaliar e escrever código com **clareza de responsabilidade**, mantendo **qualidade sênior** no uso de NestJS com DDD.

---

#### 🧠 Princípios Fundamentais

* **Padrão idiomático NestJS**

  * Uso natural dos conceitos da framework: módulos, providers, decorators, lifecycle hooks.
* **DDD aplicado com intenção**

  * Separação clara de camadas: *domain*, *application*, *infrastructure*.
  * Sem "DDD de fachada" — responsabilidade está onde deve estar.
* **Encapsulamento preciso**

  * Cada classe expõe apenas o necessário.
  * Internals protegidos por design (ex.: serviços que não expõem lógica de persistência).
* **Tipagem madura e explícita**

  * Tipos definidos com `type` (nunca `any`).
  * Validações refletidas nas tipagens.
  * Respostas sempre previsíveis e seguras.
* **Comentários cirúrgicos (quando necessários)**

  * Apenas se o código não for autoexplicativo.
  * Zero verbosidade. Direto ao ponto.
* **Nominalização precisa**

  * Nome de método e variável diz o que faz, como faz e o que representa.
  * Sem ambiguidade ou abstrações inúteis.
* **Código preparado para extensão sem retrabalho**

  * Aberto para novas regras, fechado para modificações destrutivas.
  * Componentes coesos e isolados — facilmente testáveis e evolutivos.
