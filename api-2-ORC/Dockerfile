# Usa uma imagem base oficial do Python
FROM python:3.11-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instala as dependências listadas no requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante dos arquivos da aplicação para o container
COPY . .

# Expõe a porta 5000, que será usada pelo Flask
EXPOSE 5000

# Comando para rodar a aplicação quando o container iniciar
CMD ["python", "app.py"]
