from flask import Flask, jsonify, request

app = Flask(__name__)

# Rota de exemplo para a API
@app.route('/api/exemplo', methods=['GET'])
def exemplo():
    # Retorna um JSON como resposta
    data = {"mensagem": "Olá, esta é uma API em Flask!"}
    return jsonify(data)

# Outra rota de exemplo para POST
@app.route('/api/enviar', methods=['POST'])
def enviar_dados():
    # Captura dados enviados no corpo da requisição
    dados_recebidos = request.get_json()
    resposta = {"mensagem": "Dados recebidos com sucesso!", "dados": dados_recebidos}
    return jsonify(resposta)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
