# < Conecta Inn >
<fig>
<img src="https://github.com/jardelima/conecta-inn/blob/main/src/assets/images/image-github.png?raw=true" alt="Banner do projeto">
<figcaption>Banner do Projeto</figcaption>
</fig>

## Inicialização
Para executar o projeto, utilize as ferramentas descritas na sessão *Ferramentas*.

*OBS: A API do projeto é confidêncial, caso queira executar o projeto em sua máquina, algumas funcionalidades não funcionarão.*

## Ferramentas
* [VS Code](https://code.visualstudio.com/) (Ou algum Editor de código de sua preferência)
* [NPM](https://www.npmjs.com/) - (Versão: >= v6.14)
* [Node js](https://nodejs.org/en) - (Versão >= v12.22)
* [JDK](https://www.oracle.com/br/java/technologies/javase/javase8-archive-downloads.html) - (Versão 8)
* [Android Studio](https://developer.android.com/studio)
* [Node js](https://nodejs.org/en) - (Versão >= v12.22)

# < Conecta Inn >

## Introdução

Esse projeto foi desenvolvido para facilitar a rede de hóteis junto com os hóspedes. O objetivo dele é tornar procedimentos "trabalhosos" em algo mais rápido de se resolver, por exemplo: Check-In; Check-Out; Documentação; Compras dentro do hotel e pagamento das compras. O aplicativo também disponibilizará todas as informações que o hóspede precisa saber, por exemplo: Horários do café da manhã, almoço; Senha do Wi-fi; Horário da Piscina.

## Análise técnica

### Descrição do ambiente técnico

O sistema é composto por um banco de dados e uma interface mobile. Funcionalidades principais:

* **F1** - Check In.
* **F2** - Check Out.
* **F3** - Compra e Pagamento.
* **F4** - Ver extrato.
* **F5** - Ver informações sobre o hotel.

A ferramenta utilizada para o desenvolvimento front-end foi **React Native**.

### Levantamento de requisitos  
* **Processo de Reserva**
- Pesquisa de Quarto
- Dados Pessoais
- Dados Financeiros
- Confirmação da Reserva

* **Processo de Check In**
- Aceitar Termos de Uso
- Recebimento do e-mail de confirmação
- Envio de Documentos e Dados pessoais
- Check In

* **Processo de Check Out**
- Pagamento
- Check Out

### Requisitos Funcionais
Respeitando a proposta, o sistema deverá atender os seguintes requisitos:

* **RF1** - O usuário deve poder fazer o check in.
* **RF2** - O usuário deve poder fazer o check out.
* **RF3** - O usuário deve poder comprar tudo o que o hotel disponibilizará no aplicativo.
* **RF4** - O usuário deve poder fazer o pagamento de tudo que ele comprou pelo aplicativo.
* **RF5** - O usuário deve poder verificar informações sobre o hotel.
* **RF6** - O usuário deve poder adicionar e remover produtos do carrinho.
* **RF7** - O usuário deve poder ver o seu extrato.

## Regras de Negócio

_Solicitação_  

**RGN1** -  O cliente só fará o check in, check out e compras se estiver cadastrado e logado.

## Casos de Uso

**UC1** - *Login no sistema*
- Ao entrar no sistema pela primeira vez o usuário deve cadastrar suas informações.

**UC2** - *Validação do Hotel*
- Para validar o hotel que você fez a reserva, você receberá um e-mail com um token e esse token deve ser utilizado para validar o hotel específico no seu usuário.

### Mensagens internas

Rotas utilizadas pelo para executar metodos de **POST** e **GET** no banco de dados.

##### USUÁRIO
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /user/information|Informa todos dados do usuário.|
|```POST``` /auth/register|Registra o usuário no aplicativo.|
|```POST``` /auth/login|Realizado o login do usuário.|

#### HOTEL
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /hotel/{```ID DO HOTEL```}/informative|Retorna blocos informativos do hotel.|
|```GET``` /hotel/{```ID DO HOTEL```}/products|Informa quais produtos o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/products/fridge|Informa quais produtos do frigobar o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/products/pool|Informa quais produtos da piscina o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/services|Informa quais serviços o hotel disponibiliza para compra.|
|```GET``` /hotel/{```ID DO HOTEL```}/tours|Informa quais passeios o hotel disponibiliza para compra.|

#### RESERVA
| Nome | Funcionalidade|
|------|--------------|
|```GET``` /reservation/reservations|Informa as reservas ativadas pelo usuário.|
|```GET``` /reservation/{```ID DO HOTEL```}/show|Informa todas as informações do hotel específico.|
|```GET``` /reservation/{```ID DO HOTEL```}/items|Informa quais produtos foram adicionados ao carrinho no hotel específico.|
|```POST```/reservation/active|Ativa a reserva do hotel com token.|
|```POST``` /reservation/{```ID DO HOTEL```}/check-in|Faz o check in do hóspede no hotel específico.|
|```POST``` /reservation/{```ID DO HOTEL```}/update-payment-method|Atualiza o método de pagamento do hotel específico.|
|```POST``` /reservation/{```ID DO HOTEL```}/check-out|Faz o check out do hóspede no hotel específico.|
|```POST``` /reservation/{```ID DO HOTEL```}/check-in|Faz o check in do hóspede.|
|```POST``` /reservation/{```ID DO HOTEL```}/add-items|Adicionar itens no carrinho do hotel específico.|

## Autor :grin:
<b>Jardel Lima Batista</b> 

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jardel-lima-040b30164/)](https://www.linkedin.com/in/jardel-lima-040b30164/) 
[![Email Badge](https://img.shields.io/badge/-Email-red?style=flat-square&logo=Gmail&logoColor=white&link=https://www.gmail.com)](mailto:dev.jardelima@gmail.com)
