from flask import Flask, request
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource
import json

import api.game.game as game

flask_app = Flask(__name__)
app = Api(app = flask_app)
CORS(app.app)

namespace = app.namespace('api', description='Main APIs')

#@namespace.route('/game', '/game/end')
class MainClass(Resource):
    @namespace.route('/game')
    class GameStart(Resource):
        def get(self):
            return game.start()

    @namespace.route('/game/end')
    class GameEnd(Resource):
        def post(self):
            data = json.loads(request.data)['params']
            response = game.end(game_id=data['gameId'])
            print(response)
            return response

if __name__ == '__main__':
    flask_app.run(host='0.0.0.0', port=5000, debug=True)
