try:
    import api.game.settings as settings
except:
    import settings

import itertools

NUMBER = {
    'CARRIER'   : settings.NUM_CARRIER,
    'BATTLESHIP': settings.NUM_BATTLESHIP,
    'CRUISER'   : settings.NUM_CRUISER,
    'SUBMARINE' : settings.NUM_SUBMARINE,
    'DESTROYER' : settings.NUM_DESTROYER,
}
    
SIZE = {
    'CARRIER'   : settings.LEN_CARRIER,
    'BATTLESHIP': settings.LEN_BATTLESHIP,
    'CRUISER'   : settings.LEN_CRUISER,
    'SUBMARINE' : settings.LEN_SUBMARINE,
    'DESTROYER' : settings.LEN_DESTROYER,
}

class Ship():
    new_id = itertools.count()
    def __init__(self, name, position: list=None):
        self.id         = next(Ship.new_id)
        self.name       = name
        self.active     = True
        self.position   = position
        self._set_size()


    def _set_size(self):
        exec(f"self.size = SIZE['{self.name.upper()}']")

    def sink(self):
        self.active     = False

    def __repr__(self):
        return repr(self.__dict__)


if __name__ == '__main__':
    carrier = Ship('carrier', ([0,0], [0,5]))
    battleship = Ship('battleship', ([5,5], [8,8]))
    
    print(repr(carrier))
    print(repr(battleship))
