from flask import Flask, jsonify, request
import cv2
import pytesseract
from PIL import Image
import numpy as np

app = Flask(__name__)


def removeCaracteres(texto):
    return texto.replace(":¢"," ").replace("«-*e"," ").replace("?"," ").replace("~"," ").replace("\n"," ").replace("*"," ").replace("/","").replace("\\","").replace("{","").replace("}","").replace(")","").replace("(","").replace("<","").replace(">","").replace('"',"").replace("|","")


@app.route('/api/process-image', methods=['POST'])
def enviar_dados():
    if 'image' not in request.files:
        return jsonify({"erro": "Nenhum arquivo enviado"}), 400
    
    imagem_recebidos = request.files['image']
    image_pil = Image.open(imagem_recebidos)
    
    # Pré-processamento da imagem
    image = cv2.cvtColor(np.array(image_pil), cv2.COLOR_BGR2GRAY)
    _, image = cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    image = cv2.medianBlur(image, 3)
    image = cv2.equalizeHist(image)
    image = cv2.resize(image, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    image = image[10:-10, 10:-10]
    kernel = np.ones((1, 1), np.uint8)
    image = cv2.dilate(image, kernel, iterations=1)
    image = cv2.erode(image, kernel, iterations=1)
    
    # Extração de texto com Tesseract
    custom_config = r'--oem 3 --psm 11'
    texto_extraido = pytesseract.image_to_string(image, config=custom_config)

    texto = removeCaracteres(texto_extraido)

    resposta = {"mensagem": "Dados recebidos com sucesso!", "dados": texto}
    return jsonify(resposta)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
