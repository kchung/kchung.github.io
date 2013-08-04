var Terminal = {

    stats: {
        edited   : false,
        filename : '*scratch*',
        position : 'All',
        line     : 1,
        mode     : 'Scratch Mode'
    },

    /**
     * Initializers
     * ============
     */
    init: function() {
        Terminal.terminal = $('#terminal');
        Terminal.body     = $('#terminal-body');
        Terminal.previous = $('#terminal-previous');
        Terminal.next     = $('#terminal-next');
        Terminal.current  = $('#terminal-current');
        Terminal.info     = $('#terminal-info');

        Terminal.listen();
    },
    listen: function() {
        Terminal.body.on('click', Terminal.selectInput);
        Terminal.body.on('keyup', 'input', Terminal.handleKeyup);
    },

    /**
     * Events
     * ======
     */
    handleKeyup: function(ev) {
        if (ev.which === 13) { // Enter key
            Terminal.addNewLine();
            Terminal.stats.line++;
        }

        if (ev.which === 38) { // Up key
        }

        // Comment
        if (/^;/.test(ev.currentTarget.value)) {
            ev.currentTarget.className = 'comment-face';
        }

        Terminal.stats.edited = true;
        Terminal.updateFooter();
    },
    selectInput: function(ev) {
        Terminal.body.find('input').not('[readonly]').focus();
    },

    /**
     * Actions
     * =======
     */
    addNewLine: function() {
        Terminal.saveCurrentLine();
        Terminal.current.append( Terminal.newLine('all-face') );
        Terminal.selectInput();
    },
    newLine: function(type) {
        return '<div class="input-line">'
            + '<input class="' + type + '" spellcheck="false" />'
            + '</div>';
    },
    saveCurrentLine: function() {
        var target = Terminal.body.children('.input-line');
        target.find('input').attr('readonly', true);
        Terminal.previous.append(target);
    },
    updateFooter: function() {
        var info = '';

        info += '-UUU:';
        info += Terminal.stats.edited ? '**--' : '----';

        info += 'F1      ';
        info += Terminal.stats.filename

        info += '      ';
        info += Terminal.stats.position;

        info += ' L';
        info += Terminal.stats.line;

        //info += '               ';
        //info += '------------------------------------------------';

        Terminal.info.val(info);
    }

};

Terminal.init();