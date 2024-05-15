# LLM Audio Transcription API

A **LLM Audio Transcription API** é uma API desenvolvida em Node.js que permite a transcrição de vídeos do YouTube. Esta API utiliza FFmpeg para transformar vídeos em arquivos de áudio nos formatos MP3 e WAV, e o Whisper para a transcrição baseada em inteligência artificial.

## Pré-requisitos

Antes de iniciar, certifique-se de ter o seguinte instalado em sua máquina:

- Node.js (v14 ou superior)
- npm (v7 ou superior) ou yarn (v1 ou superior)

## Instalação e build

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/llm_audio_transcription_api.git
```

2. Acesse o diretório do projeto:
```bash
cd llm_audio_transcription_api
```
3. Instale as dependências:
```bash
npm install
```
4. Para iniciar a API em modo de desenvolvimento, execute o seguinte comando:
```bash
npm run serve
```
5. Para construir e servir a API em modo de produção, execute:
```bash
npm run build
npm run serve prod
```

## Dependências
Este projeto utiliza as seguintes dependências:

- @xenova/transformers: Para modelos de transformação de áudio.
- cors: Para permitir requisições de diferentes origens.
- express: Framework web para Node.js.
- ffmpeg-static: Versão estática do FFmpeg para manipulação de áudio e vídeo.
- fluent-ffmpeg: Ferramenta para trabalhar com FFmpeg no Node.js.
- node-fetch: Biblioteca para fazer requisições HTTP.
- wavefile: Para manipulação de arquivos WAV.
- webpack-node-externals: Para excluir dependências de node_modules na construção com Webpack.
- ytdl-core: Para baixar vídeos do YouTube.
Rodando a API

## Endpoints
**POST /audio**
Endpoint para transcrever vídeos do YouTube.

**Parâmetros:**
videoId: ID do vídeo escolhido do YouTube

**Exemplo de requisição:**
```bash
curl -X POST http://localhost:3000/audio -H "Content-Type: application/json" -d '{"video-id": "ID_DO_VIDEO"}'
```

**Resposta:**
```bash
[
  {
    timestamp: [number, number]
    text: string
  },
  {
    timestamp: [number, number]
    text: string
  },
  ...
]
```