if __name__ != '__main__':
    import api.game.settings as settings
    import api.game.ships as ships 

from datetime import datetime
import numpy as np
import random
import uuid

class Game:
    def __init__(self):
        self.id     = str(uuid.uuid1())
        self.size   = settings.GAME_GRID_SIZE
        self.grid   = [[None for i in range(self.size)] for j in range(self.size)]
        self.ships  = []

    def create_ships(self):
        for s in ships.NUMBER:
            for _ in range(ships.NUMBER[s]):
                new_ship = ships.Ship(s)
                self.ships.append(new_ship)
                
    def place_ships(self):
        for ship in self.ships:
            ship.position = self._set_coordinates(ship)
    
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
                        print(f'point_direction : {x}, {y}')
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
            print(f'{coordinates} : {x} : {y}')
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
                        print('set new starting point and direction')
                        continue
            except:
                coordinates = self._set_first_point_and_direction()
                print('except: set new starting point and direction')
                continue
            break
        print(ship.name, coordinates)
        for x, y in coordinates:
            self.grid[x][y] = ship.id
        return coordinates

    def start_game(self):
        pass

    def __repr__(self):
        rows = repr(self.id)
        return repr(self.grid)
    

ACTIVE_GAMES = {}

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def start():
    game = Game()
    game.create_ships()
    game.place_ships()

    ACTIVE_GAMES[game.id] = game
    print(ACTIVE_GAMES)

    return {
                "gameId": str(game.id),
                "gameGrid": game.grid,
                "timestamp": get_timestamp()
            }
    
    
def end(game_id):
    if game_id in ACTIVE_GAMES:
        del ACTIVE_GAMES[game_id]
        status = f'REMOVED gameId: {game_id}'
    else: status = f'DOES NOT EXIST gameId: {game_id}'

    return { "status": f"{status}" }


if __name__ == '__main__':
    import settings
    import ships
    
    game = Game()

    game.create_ships()
    game.place_ships()

    print(repr(game))
