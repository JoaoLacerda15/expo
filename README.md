# Clima App

Este é um aplicativo React Native que mostra informações sobre o clima de várias cidades brasileiras. O app consome a API WeatherAPI para buscar dados meteorológicos e exibe o clima atual de cidades como São Paulo, Rio de Janeiro, Salvador, Recife e Curitiba. O usuário pode buscar por cidade e visualizar detalhes sobre o clima, incluindo temperatura, umidade, condição do tempo e velocidade do vento.

## Funcionalidades

- **Exibição das condições climáticas** de várias cidades brasileiras.
- **Busca por cidade** para filtrar os dados mostrados.
- **Detalhes do clima** ao clicar em uma cidade.
- **Atualização de dados** via "Pull-to-refresh".
- **Exibição de erros** caso haja falha ao buscar os dados.

## Tecnologias Usadas

- **React Native**: Framework para construção de aplicativos móveis nativos.
- **API WeatherAPI**: API externa utilizada para obter os dados de clima.

## Estrutura do Projeto

- `App.js`: Arquivo principal onde a lógica do aplicativo é implementada.
  - **Estados**:
    - `lista`: Contém os dados de todas as cidades carregadas.
    - `filtradas`: Contém os dados filtrados com base na busca.
    - `busca`: Estado que armazena o texto de busca inserido pelo usuário.
    - `detalhe`: Detalhes da cidade selecionada.
    - `carregando`: Indica se os dados estão sendo carregados.
    - `refreshing`: Indica se a atualização dos dados está em andamento.
    - `erro`: Mensagem de erro quando ocorre um problema ao buscar os dados.
  - **Funções**:
    - `carregarCidades`: Carrega os dados climáticos de várias cidades.
    - `buscar`: Filtra as cidades com base no texto de busca.
    - `onRefresh`: Atualiza os dados das cidades.
    - `abrirDetalhes`: Exibe os detalhes do clima de uma cidade selecionada.
  - **Componentes**:
    - `FlatList`: Exibe a lista de cidades.
    - `TextInput`: Campo para busca de cidades.
    - `ActivityIndicator`: Exibe um indicador de carregamento enquanto os dados estão sendo obtidos.
    - `TouchableOpacity` e `Pressable`: Componentes interativos para interação com o usuário.
  
## Instruções de Execução

1. **Pré-requisitos**:
   - Instale o [Node.js](https://nodejs.org/).
   - Instale o [React Native CLI](https://reactnative.dev/docs/environment-setup).

2. **Clonando o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/clima-app.git
   cd clima-app
# Dependencias
npm install
npx react-native run-android
npx react-native run-ios
