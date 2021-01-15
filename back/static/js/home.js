let ns = {};

ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    //Return API
    return {
        'init': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/game',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },

    }
}());

ns.view = (function() {
    'use strict';

    let $game_id = $('#game_id'),
        $game_grid = $('#game_grid');

    // Return API
    return {
        reset: function() {
            $game_id.val('');
            $game_grid.val('');focus();
        },
    };
}());

// Controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $game_id = $('#game_id'),
        $game_grid = $('#game_grid');

    // Get the data from the model after the controller is done init
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(game_id, game_grid) {
        return game_id !== '' && game_grid !== '';
    }

    // create event handlers
    $('#create').click(function(e) {
        let game_id = $game_id.val(),
            game_grid = $game_grid.val();

        e.preventDefault();

        if (validate(game_id, game_grid)) {
            console.log('jee')
        } else {
            alert('problem');
        }
    });

    $('table > tbody').on('dbclick', 'tr', function(e) {
        let $target = $(e.target),
            game_id,
            game_grid;
        
        game_id = $target
                .parent()
                .find('td.game_id')
                .text();
            
        view.update_editor(game_id, game_grid);
    });

    // Handle the model events
    $event_pump.on('model_init_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });


    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })

}(ns.model, ns.view));