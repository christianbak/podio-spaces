define(['jquery', 'less!style/spaces-component'], function($) {
    
    function renderOrg(organization) {
        var targetEl = $('<div class="org"/>')
                .css('background-image', 'url(' + organization.image.thumbnail_link + ')'),

            anchor = $('<a class="org"></a>')
                .text(organization.name)
                .attr('href', organization.url)
                .appendTo(targetEl);

        $.each(organization.spaces, function(i, space) {
            renderSpace(space).appendTo(targetEl);
        });

        return targetEl;
    }

    function renderSpace(space) {
        var targetEl = $('<div class="space"/>'),
            anchor = $('<a class="space"></a>')
                .text(space.name)
                .attr('href', space.url)
                .attr('id', 'space-' + space.id)
                .appendTo(targetEl);

        return targetEl;
    }

    function toggleDisplay() {
        var el = $(this);

        if (el.hasClass('collapsed')) {
            $('#search-spaces').focus();
            el.removeClass('collapsed');
            $('.container').removeClass('collapsed');
        } else {
            el.addClass('collapsed');
            $('.container').addClass('collapsed');
        }
    }

    function search(ev) {
        var searchTerm = this.value,
            searchExp = new RegExp('(' + searchTerm + ')', 'gi');
        $(this).closest('.container').find('div.org a').each(function() {
            var item = $(this);

            if (searchExp.exec(item.text())) {
                item.html(item.text().replace(searchExp, '<em>$1</em>'));
                item.removeClass('hidden');
                item.closest('div.org').find('a.org').removeClass('hidden');
            } else {
                this.innerHTML = item.text();
                item.addClass('hidden');
            }
        });
    }

    function moveSelection(ev) {
        if (ev.keyCode === 8 && ev.target.nodeName !== "INPUT") { //Prevent backspace from navigating back
            ev.preventDefault();
        }
        
        if (ev.keyCode === 40 || ev.keyCode === 38) {
            ev.preventDefault();
            var container = $(this),
                currentFocus = container.find('a:focus'),
                allItems = container.find('a:not(.hidden)'),
                focusedIndex = allItems.index(currentFocus);

            if (ev.keyCode === 40) { //Down
                $(allItems.get(focusedIndex + 1)).focus();
            }

            if (ev.keyCode === 38) { //Up
                if (focusedIndex > 0) {
                    $(allItems.get(focusedIndex - 1)).focus();
                } else if (focusedIndex === 0) { //If we're at the top, select the search box
                    container.find('input').select();
                }
            }
        }
    }

    return $.fn.spaces = function(data) {
        return this.each(function() {
            var el = $(this),
                container = $('<div class="container collapsed"/>')
                    .appendTo($('body')),
                results = $('<div class="results"/>');
            
            results.css('max-height', window.outerHeight * 0.4 + 'px');
            $(window).on('resize', function() {
                results.css('max-height', window.outerHeight * 0.4 + 'px');
            });

            container.css('left', el.offset().left + 'px');
            container.css('top', (el.offset().top + el.outerHeight()) + 'px');

            el.addClass('spaces-component');
            el.addClass('collapsed');

            container.append('<div class="search-wrapper"><input type="text" name="search" id="search-spaces"></div>')
                .find('input').on('keyup', search);

            container.on('keydown', moveSelection);

            el.click(toggleDisplay);

            console.log(data);
            container.append(results);
            $.each(data, function(i, organization) {
                renderOrg(organization).appendTo(results);
            });

        });
    };

});