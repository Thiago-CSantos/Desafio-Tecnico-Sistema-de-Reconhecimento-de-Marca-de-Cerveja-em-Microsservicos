# Usa uma imagem base oficial do Python
FROM python:3.11-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instala as dependências listadas no requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Instalar Tesseract OCR e suas dependências
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    libtesseract-dev \
    && apt-get clean

# Instalar as bibliotecas necessárias via pip
RUN pip install --no-cache-dir Flask opencv-python-headless pytesseract Pillow

# Copia o restante dos arquivos da aplicação para o container
COPY . .

# Expõe a porta 5000, que será usada pelo Flask
EXPOSE 5000

# Comando para rodar a aplicação quando o container iniciar
CMD ["python", "app.py"]
