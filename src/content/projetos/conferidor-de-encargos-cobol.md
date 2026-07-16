---
nome: Conferidor de Encargos em COBOL
descricao: Ferramenta batch em COBOL que ajuda fiscais de contrato do setor público a conferir os encargos (INSS/FGTS) das folhas das terceirizadas — e uma jornada de aprendizado pelo ciclo completo de um legado.
tecnologias:
  - COBOL
  - GnuCOBOL
tags:
  - cobol
  - gestao-publica
  - aprendizado
destaque: true
repositorio: https://github.com/maia-andre/frank_cobol
---

## O problema real

Contratos públicos com mão de obra dedicada exigem **fiscalização
administrativa** (IN 05/2017; Lei 14.133/2021): todo mês o fiscal recebe da
terceirizada a folha, as guias e os comprovantes, e precisa verificar —
funcionário por funcionário — se salários e encargos batem. Hoje esse trabalho
é feito no braço, com planilha e PDF: lento, repetitivo e sujeito a erro
justamente onde erro custa caro.

## Por que COBOL

A forma do problema — ler um lote grande de registros, aplicar regras de
cálculo, comparar com o declarado e relatar divergências com totais de
controle — é literalmente a descrição de um job batch COBOL: o tipo de
problema para o qual a linguagem foi criada em 1959 e pelo qual ela ainda
sustenta bancos, previdência e tributos. E aritmética decimal exata aqui é
requisito, não luxo.

## O princípio de arquitetura

> O fiscalizado nunca fornece as duas pontas da comparação.

A terceirizada entrega *fatos* (salários pagos, valores depositados). A
*régua* (alíquotas, tabelas legais, parametrizadas por competência) mora no
programa, sob controle do fiscal. Conferência feita com a régua do fiscalizado
não é conferência.

## O projeto como jornada

O repositório é também um **projeto de aprendizado guiado** em modo instrutor:
construir um sistema COBOL de verdade, do zero, em formato fixo estrito como
um mainframe exigiria — e depois percorrer o mesmo caminho que o mercado
percorre com legados de 40 anos: **construir → manter → modernizar →
migrar/integrar**, fechando com testes de paridade dual-run, a mesma técnica
das migrações reais de mainframe. Todo o código COBOL é escrito à mão; o
diário pedagógico e o histórico de commits registram a jornada real, erros e
descobertas incluídos.
