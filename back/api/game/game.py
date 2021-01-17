if __name__ != '__main__':
    import api.game.settings as settings
    import api.game.ships as ships 

from datetime import datetime
import json
import numpy as np
import random
import threading
import uuid

Lock = threading.Lock()

class Game:
    def __init__(self):
        self.id     = str(uuid.uuid1())
        self.size   = settings.GAME_GRID_SIZE

    def create_players(self):
        self.player1 = Player()
        self.player2 = Player(computer=True) 
        self.player1.turn = True

    def create_ships(self):
        for s in ships.NUMBER:
            for _ in range(ships.NUMBER[s]):
                new_ship = ships.Ship(s)
                self.ships.append(new_ship)
                
    def place_ships(self):
        for ship in self.ships:
            ship.position = self._set_coordinates(ship)
    
    def bomb(self, bomber_id, row, column):
        print('bomb', row, column)

        if self.player1.id == bomber_id:
            bomber = self.player1
            rekt = self.player2 
        elif self.player2.id == bomber_id:
            rekt = self.player1
            bomber = self.player2 

        hit = rekt.gets_hit(row, column)
        bomber.bombs(row, column, hit)

        # TODO
        # bomber.turn = False
        # rekt.turn = True

    def ai_bomb(self):
        print('ai_bomb')
        
        while True:
            row = random.randrange(0, self.size)
            column = random.randrange(0, self.size)

            if self.player2.enemygrid[row][column] is None:
                self.bomb(self.player2.id, row, column)
                return
                
    def _set_first_point_and_direction(self):    
        while True:
            x = random.randrange(0, self.size)  # upper limit not included
            y = random.randrange(0, self.size)
            if self.grid[x][y] is not None:
                continue
            
            coordinates = [[x,y]]
            while True:
                x = coordinates[-1][0] + random.randint(-1, 1)
                y = coordinates[-1][1] + random.randint(-1, 1)
                try:
                    if ([x,y] in coordinates 
                        or self.grid[x][y] is not None
                        or x < 0
                        or y < 0
                    ):
                        #print(f'point_direction : {x}, {y}')
                        continue
                except:
                    continue

                coordinates.append([x,y])
                return coordinates
            
    def _set_coordinates(self, ship):
        coordinates = self._set_first_point_and_direction()

        while len(coordinates) < ship.size:
            a, b = np.subtract(coordinates[1], coordinates[0])
            x, y = np.add(coordinates[-1], [a, b])
            #print(f'{coordinates} : {x} : {y}')
            try:
                if (self.grid[x][y] is None
                    and x in range(self.size)
                    and y in range(self.size)
                ):
                    coordinates.append([x,y])
                    continue
                else:
                    x, y = np.subtract(coordinates[0], [a, b])
                    if (self.grid[x][y] is None
                        and [x,y] not in coordinates
                        and x in range(self.size)
                        and y in range(self.size)
                    ):
                        coordinates.insert(0, [x,y])
                        continue
                    else:
                        coordinates = self._set_first_point_and_direction()
                        #print('set new starting point and direction')
                        continue
            except:
                coordinates = self._set_first_point_and_direction()
                #print('except: set new starting point and direction')
                continue
            break
        print(ship.name, coordinates)
        for x, y in coordinates:
            self.grid[x][y] = ship.id
        return coordinates

    def start_game(self):
        pass

    def __repr__(self):
        return json.dumps(
            {
                "players": {
                    self.player1.id: {
                        "gameGrid": self.player1.grid,
                        "enemyGrid": self.player1.enemygrid
                    },
                    self.player2.id: {
                        "gameGrid": self.player2.grid,
                        "enemyGrid": self.player2.enemygrid
                    }
                }
            })
       
        

class Player(Game):
    def __init__(self, computer=False):
        super().__init__()
        self.computer   = computer
        self.grid       = [[None for i in range(self.size)] for j in range(self.size)]
        self.enemygrid  = [[None for i in range(self.size)] for j in range(self.size)]
        self.ships      = []
        self.turn       = True  # TODO

    def init_ships(self):
        self.create_ships()
        self.place_ships()

    def create_ships(self):
        super().create_ships()

    def place_ships(self):
        super().place_ships()

    def bombs(self, row, column, hit: bool):
        result = settings.HIT if hit else settings.MISS
        self.enemygrid[row][column] = result
        print(self.enemygrid)

    def gets_hit(self, row, column) -> bool:
        if x := self.grid[row][column]:
            if x != settings.BOMBED:
                self.grid[row][column] = settings.BOMBED
                print('hit')
                return True
        print('miss')
        self.grid[row][column] = settings.MISS
        return False 


ACTIVE_GAMES = {}


def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))


def start():
    game = Game()
    game.create_players()
    game.player1.init_ships()
    game.player2.init_ships()

    ACTIVE_GAMES[game.id] = game

    return {
                "playerId": game.player1.id,
                "gameId": game.id,
                "myGrid": game.player1.grid,
                "enemyGrid": game.player1.enemygrid,
                "timestamp": get_timestamp()
            }
    
    
def end(game_id):
    if game_id in ACTIVE_GAMES:
        del ACTIVE_GAMES[game_id]
        status = f'REMOVED gameId: {game_id}'
    else: status = f'DOES NOT EXIST gameId: {game_id}'

    return { "status": f"{status}" }


def post_bomb(data):
    game_id, player_id, row, column = data['gameId'], data['playerId'], int(data['row']), int(data['column'])
    
    Lock.acquire()

    game = ACTIVE_GAMES.pop(game_id)

    if not game.player1.turn:
        return { "error": "Wait for your turn." }

    game.bomb(player_id, row, column)
    ACTIVE_GAMES[game.id] = game

    Lock.release()

    return  {
                "enemyGrid": game.player1.enemygrid,
                "timestamp": get_timestamp()
            }


def request_bomb(game_id, player_id):
    Lock.acquire()

    game = ACTIVE_GAMES.pop(game_id)
    game.ai_bomb()
    ACTIVE_GAMES[game_id] = game

    Lock.release()
    return  {
                "gameGrid": game.player1.grid,
                "timestame": get_timestamp()
            }


if __name__ == '__main__':
    import settings
    import ships
    
    game = Game()
    game.create_players()
    game.player1.init_ships()
    game.player2.init_ships()

    print(repr(game.player1))
    #print(repr(game.player2))
    

    #game.create_ships()
    #game.place_ships()

    #print(repr(game))
