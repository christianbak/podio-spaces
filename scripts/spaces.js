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

    function toggleDisplay(ev) {
        if (!$(ev.target).hasClass('spaces-component')) { return; } //Only accept direct clicks on the togller

        var el = $(this);

        if (el.hasClass('collapsed')) {
            el.removeClass('collapsed');
            $('#search-spaces').focus();
        } else {
            el.addClass('collapsed');
        }
    }

    function search(ev) {
        var searchTerm = this.value,
            searchExp = new RegExp('(' + searchTerm + ')', 'gi'),
            firstResult;
        
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

        firstResult = $(this).closest('.container').find('a:not(.hidden) em').first().parent();
        $(this).closest('.container').find('a').removeClass('active');
        firstResult.addClass('active');

        if (ev.keyCode === 13 && firstResult.length) { //If enter is pressed, then go straight to the first search result
            document.location.href = firstResult.attr('href');
            console.log("13!");
        }
    }

    function moveSelection(ev) {
        if (ev.keyCode === 8 && ev.target.nodeName !== "INPUT") { //Prevent backspace from navigating back
            ev.preventDefault();
        }

        var container = $(this),
            currentFocus,
            allItems,
            focusedIndex;
        
        if (ev.keyCode === 40 || ev.keyCode === 38) {
            ev.preventDefault();
            container = $(this),
            currentFocus = container.find('a:focus'),
            allItems = container.find('a:not(.hidden)'),
            focusedIndex = allItems.index(currentFocus);

            $(this).closest('.container').find('a').removeClass('active');

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
        } else { //If any other key is pressed, continue typing in the search field
            container.find('input').focus();
        }
    }

    return $.fn.spaces = function(data) {
        return this.each(function() {

            var el = $(this),
                container = $('<div class="container collapsed"/>'),
                searcher = $('<div class="search-wrapper"><input type="text" name="search" id="search-spaces"></div>'),
                results = $('<div class="results"/>'),
                resultsFractionSize = 0.8;
            
            el.addClass('spaces-component');
            el.addClass('collapsed');

            container.append(searcher);
            searcher.find('input').on('keyup', search);

            container.on('keydown', moveSelection);

            el.click(toggleDisplay);

            container.append(results);
            $.each(data, function(i, organization) {
                renderOrg(organization).appendTo(results);
            });

            el.append(container);

            //////Hack to ensure that the result size is always at most 80% of the window size
            results.css('max-height', ((window.outerHeight - searcher.outerHeight()) * resultsFractionSize - 100) + 'px');
            $(window).on('resize', function() {
                results.css('max-height', ((window.outerHeight - searcher.outerHeight()) * resultsFractionSize - 100) + 'px');
            });
            //////////////////

        });
    };

});