from flask import Flask, jsonify, request
import cv2
import pytesseract
from PIL import Image
import io
import base64
import numpy as np

app = Flask(__name__)

@app.route('/api/process-image', methods=['POST'])
def enviar_dados():

    if 'image' not in request.files:
        return jsonify({"erro": "Nenhum arquivo enviado"}), 400
    
    # Captura dados enviados no corpo da requisição
    imagem_recebidos = request.files['image']
    
    image_pil = Image.open(imagem_recebidos)

    texto_extraido = pytesseract.image_to_string(image_pil)

    print(texto_extraido) 

    resposta = {"mensagem": "Dados recebidos com sucesso! 2", "dados": texto_extraido}
    return jsonify(resposta)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
