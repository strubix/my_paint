(function ($) {
    $.fn.paint = function (options) {

        // Default Parameters
        var defaultParameters =
            {
                width: '100%',
                height: '500px',
                border: '1px solid #000'
            },
            parameters = $.extend(defaultParameters, options),
            self = this;

        // Checking if current element is canvas
        if (this.is('canvas') == false) {
            alert('my_paint error : please use my_paint on canvas element !');
        }

        // Adding style to canvas
        this.css({
            width: parameters.width,
            height: parameters.height,
            border: parameters.border
        });

        // SVG icons
        var icons = {
            pen: '%3Csvg%20height%3D%2224px%22%20version%3D%221.1%22%20' +
            'viewBox%3D%220%200%2024%2024%22%20width%3D%2224px%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Asketch%3D%22' +
            'http%3A//www.bohemiancoding.com/sketch/ns%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Ctitle/%3E%3Cdesc/' +
            '%3E%3Cdefs/%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%20id%3D%22miu%22%20stroke%3D%22none%22%20stroke-' +
            'width%3D%221%22%3E%3Cg%20id%3D%22Artboard-1%22%20transform%3D%22translate%28-899.000000%2C%20-227.000000%29%22%3E%3Cg%20id%3D%22' +
            'slice%22%20transform%3D%22translate%28215.000000%2C%20119.000000%29%22/%3E%3Cpath%20d%3D%22M914.000027%2C248.002414%20L914.' +
            '000464%2C232.002414%20L914.000464%2C232.002414%20L907.001354%2C232.002414%20L907.000079%2C248.002414%20L914.000027%2C248.002414%20Z%20M913.' +
            '998311%2C249.002414%20L910.501672%2C254%20L907.00169%2C249.002414%20L913.998311%2C249.002414%20Z%20M914.000492%2C231.' +
            '002414%20L914.000574%2C228.002414%20C914.000574%2C227%20912.99816%2C227%20912.99816%2C227%20L908.004086%2C227%20C908.' +
            '004086%2C227%20907.001672%2C227%20907.001672%2C228.002414%20L907.001433%2C231.002414%20L914.000492%2C231.002414%20L914.' +
            '000492%2C231.002414%20Z%22%20fill%3D%22%23000000%22%20id%3D%22editor-pencil-pen-edit-write-glyph%22%20transform%3D%22' +
            'translate%28910.500326%2C%20240.500000%29%20rotate%2845.000000%29%20translate%28-910.500326%2C%20-240.500000%29%20%22/' +
            '%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
            line: '%3Csvg%20xmlns%3Adc%3D%22http%3A//purl.org/dc/elements/1.1/%22%20xmlns%3Acc%3D%22http%3A//creativecommons.org/' +
            'ns%23%22%20xmlns%3Ardf%3D%22http%3A//www.w3.org/1999/02/22-rdf-syntax-ns%23%22%20xmlns%3Asvg%3D%22http%3A//www.w3.org/2000/' +
            'svg%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Asodipodi%3D%22http%3A//sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' +
            '%22%20xmlns%3Ainkscape%3D%22http%3A//www.inkscape.org/namespaces/inkscape%22%20version%3D%221.1%22%20id%3D%22Layer_1%22%20x%3D%' +
            '220px%22%20y%3D%220px%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%200%2024%2024%22%20enable-background%3D%22' +
            'new%200%200%2024%2024%22%20xml%3Aspace%3D%22preserve%22%20inkscape%3Aversion%3D%220.48.4%20r9939%22%20sodipodi%3Adocname%3D' +
            '%22plainicon.com-42207-svg.svg%22%3E%3Cmetadata%20id%3D%22metadata3047%22%3E%3Crdf%3ARDF%3E%3Ccc%3AWork%0A%20%20%20%20%20%20%20%20rdf%3' +
            'Aabout%3D%22%22%3E%3Cdc%3Aformat%3Eimage/svg+xml%3C/dc%3Aformat%3E%3Cdc%3Atype%20rdf%3Aresource%3D%22http%3A//purl.org/dc/dcmitype/StillImage' +
            '%22%20/%3E%3C/cc%3AWork%3E%3C/rdf%3ARDF%3E%3C/metadata%3E%3Cdefs%20id%3D%22defs3045%22%20/%3E%3Csodipodi' +
            '%3Anamedvie%20pagecolor%3D%22%23ffffff%22%20bordercolor%3D%22%23666666%22%20borderopacity%3D%221%22%20objecttolerance' +
            '%3D%2210%22%20gridtolerance%3D%2210%22%20guidetolerance%3D%2210%22%20inkscape%3Apageopacity%3D%220%22%20inkscape%3Apageshadow' +
            '%3D%222%22%20inkscape%3Awindow-width%3D%221855%22%20inkscape%3Awindow-height%3D%221056%22%20id%3D%22namedview3043%22%20showgrid' +
            '%3D%22false%22%20inkscape%3Azoom%3D%2237.875%22%20inkscape%3Acx%3D%2212%22%20inkscape%3Acy%3D%2212%22%20inkscape%3Awindow' +
            '-x%3D%2265%22%20inkscape%3Awindow-y%3D%2224%22%20inkscape%3Awindow-maximized%3D%221%22%20inkscape%3Acurrent-layer%3D%22Layer_1%22%20' +
            '/%3E%3Cg%0A%20%20%20%20%20id%3D%22g3037%22%20transform%3D%22matrix%280%2C1%2C-1%2C0%2C23.998813%2C-6.8728938e-4%29%22%3E%3Cg%20id%3D%22' +
            'g3039%22%3E%3Cpath%20d%3D%22M%2023.749%2C22.536%201.464%2C0.25%20C%201.129%2C-0.084%200.585%2C-0.084%200.249%2C0.251' +
            '%20c%20-0.332%2C0.334%20-0.332%2C0.877%200%2C1.213%20l%2022.284%2C22.284%20c%200.336%2C0.335%200.88%2C0.333%201.216%2C0' +
            '%200.334%2C-0.334%200.334%2C-0.877%200%2C-1.212%20z%22%20id%3D%22path3041%22%20inkscape%3Aconnector-curvature%3D%220' +
            '%22%20style%3D%22fill%3A%23000000%22%20/%3E%3C/g%3E%3C/g%3E%3C/svg%3E',
            square: '%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmln' +
            's%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%20%' +
            '20%20%20%3Cpath%20d%3D%22M6%206h12v12H6z%22/%3E%0A%3C/svg%3E',
            polygon: '%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//' +
            'www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M3.5%2018.49l6-6.01%204%204L22%206.92l-1.41-1.41-7.09%207.97-4-4L2%2016.99z%22/' +
            '%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
            circle: '%3Csvg%20fill%3D%22%23000000%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//' +
            'www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0%200h24v24H0z%22%20fill%3D%22none%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12%2' +
            '02C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202z%22/%3E%0A%3C/svg%3E'
        };

        // Toolbar
        this.before('<nav id="my_paint-navbar">' +
            '<div class="nav-wrapper blue">' +
            '<ul>' +
                /* Pen tool */
            '<li class="active" id="pen" title="Pen tool"><a><i><svg height="24px" version="1.1" viewBox="0 0 24 24" width="24px" ' +
            'xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/>' +
            '<g fill="none" fill-rule="evenodd" id="miu" stroke="none" stroke-width="1"><g id="Artboard-1" transform="translate(-899.000000, -227.000000)">' +
            '<g id="slice" transform="translate(215.000000, 119.000000)"/>' +
            '<path d="M914.000027,248.002414 L914.000464,232.002414 L914.000464,232.002414 L907.001354,232.002414 L907.000079,248.002414 L914.000027,248.002414' +
            ' Z M913.998311,249.002414 L910.501672,254 L907.00169,249.002414 L913.998311,249.002414 Z M914.000492,231.002414' +
            ' L914.000574,228.002414 C914.000574,227 912.99816,227 912.99816,227 L908.004086,227 C908.004086,227 907.001672,227 907.001672,228.002414 ' +
            'L907.001433,231.002414 L914.000492,231.002414 L914.000492,231.002414 Z" fill="#FFFFFF" id="editor-pencil-pen-edit-write-glyph"' +
            ' transform="translate(910.500326, 240.500000) rotate(45.000000) translate(-910.500326, -240.500000) "/>' +
            '</g></g></svg></i></a>' +
            '</li>' +
                /* Line tool */
            '<li id="line" title="Line tool">' +
            '<a><i>' +
            '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
            ' xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"' +
            ' xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.1" id="Layer_1" x="0px" y="0px" width="24px" height="24px"' +
            ' viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" inkscape:version="0.48.4 r9939" ' +
            'sodipodi:docname="plainicon.com-42207-svg.svg"><metadata id="metadata3047"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format>' +
            '<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /></cc:Work></rdf:RDF></metadata><defs id="defs3045" />' +
            '<sodipodi:namedvie pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10"' +
            ' inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1855" inkscape:window-height="1056" id="namedview3043" showgrid="false"' +
            ' inkscape:zoom="37.875" inkscape:cx="12" inkscape:cy="12" inkscape:window-x="65" inkscape:window-y="24" inkscape:window-maximized="1"' +
            ' inkscape:current-layer="Layer_1" /><g id="g3037" transform="matrix(0,1,-1,0,23.998813,-6.8728938e-4)"><g id="g3039">' +
            '<path d="M 23.749,22.536 1.464,0.25 C 1.129,-0.084 0.585,-0.084 0.249,0.251 c -0.332,0.334 -0.332,0.877 0,1.213 l 22.284,22.284 ' +
            'c 0.336,0.335 0.88,0.333 1.216,0 0.334,-0.334 0.334,-0.877 0,-1.212 z" id="path3041" inkscape:connector-curvature="0" style="fill:#FFFFFF" /></g></g></svg>' +
            '</i></a>' +
            '</li>' +
                /* Square tool */
            '<li id="square" title="Square tool">' +
            '<a><i><svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/>' +
            '<path d="M6 6h12v12H6z"/></svg></i></a>' +
            '</li>' +
                /* Polygon tool */
            '<li id="polygon" title="Polygon tool">' +
            '<a><i>' +
            '<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>' +
            '<path d="M0 0h24v24H0z" fill="none"/></svg>' +
            '</i></a>' +
            '</li>' +
                /* Circle tool */
            '<li id="circle" title="Circle tool">' +
            '<a><i>' +
            '<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M0 0h24v24H0z" fill="none"/>' +
            '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>' +
            '</svg>' +
            '</i></a>' +
            '</li>' +
                /* Weight tool */
            '<li id="weight" title="Weight tool"><a><i>' +
            '<svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' +
            '<defs><path d="M0 0h24v24H0z" id="a"/></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"/></clipPath>' +
            '<path clip-path="url(#b)" d="M3 17h18v-2H3v2zm0 3h18v-1H3v1zm0-7h18v-3H3v3zm0-9v4h18V4H3z"/></svg>' +
            '</i></a></li>' +
            '</ul>' +
            '</div>' +
            '</nav>');

        // Toolbar functions
        var $toolbarItems = $('#my_paint-navbar ul li'),
            selectedTool = 'pen',
            weight = 2;

        $toolbarItems.on('click', function () {
            if($(this).attr('id') !== 'weight'){
                $toolbarItems.each(function () {
                    $(this).removeClass('active');
                });
                $(this).addClass('active');

                selectedTool = $(this).attr('id');
            }
        });

        // Weight tool
        $('#my_paint-navbar').after('<p class="range-field" id="my_paint-weight"><input type="range" id="weightRange" value="2" min="1" max="50" /></p>');

        // Weight tool style
        $('#my_paint-weight').css({position: 'absolute', left: $('#weight').offset().left, width: ($('#weight').width()) * 2, display: 'none'});

        $('#weight').on('click', function(){
            var bar = $('#my_paint-weight');

            if (bar.is(":visible")){
                bar.hide();
            } else {
                bar.show();
            }
        });

        // Defines selected weight
        $('#weightRange').on('change', function(){
            weight = $('#weightRange').val();
        });

        // Cursor style
        this.hover(function () {
            $(this).css({
                cursor: 'url(data:image/svg+xml,' + icons[selectedTool] + ') 2 20, auto'
            })
        });

        // Defines canvas resolution
        var canvas = this.get(0);
        var ctx = canvas.getContext("2d");

        canvas.width = $(this).width();
        canvas.height = $(this).height();

        // Tools arrays
        var line = [],
            square = [],
            circle = [];

        this.mousedown(function (event) {
            var width = $(this).width(),
                height = $(this).height(),
                mouseDown = true;

            var pos = {
                x: (event.pageX - $(this).offset().left) * (canvas.width / width),
                y: (event.pageY - $(this).offset().top) * (canvas.height / height)
            };

            ctx.beginPath();

            switch (selectedTool) {
                case 'pen':
                    ctx.fillRect(pos.x, pos.y, weight, weight);
                    line = [];
                    break;
                case 'line':
                    ctx.lineJoin = "round";
                    ctx.lineCap = "round";
                    line.push({x: pos.x, y: pos.y});
                    if (line.length == 2) {
                        ctx.moveTo(line[0].x, line[0].y);
                        ctx.lineTo(line[1].x, line[1].y);
                        ctx.lineWidth = weight;
                        ctx.stroke();
                        line = [];
                    }
                    break;
                case 'square':
                    ctx.lineCap = "square";
                    square.push({x: pos.x, y: pos.y});
                    if (square.length == 2) {
                        ctx.moveTo(square[0].x, square[0].y);
                        ctx.lineTo(square[1].x, square[0].y);
                        ctx.lineTo(square[1].x, square[1].y);
                        ctx.lineTo(square[0].x, square[1].y);
                        ctx.lineTo(square[0].x, square[0].y);
                        ctx.lineWidth = weight;
                        ctx.stroke();
                        ctx.closePath();
                        square = [];
                    }
                    break;
                case 'polygon':
                    ctx.lineJoin = "round";
                    ctx.lineCap = "round";
                    line.push({x: pos.x, y: pos.y});
                    if (line.length == 2) {
                        ctx.moveTo(line[0].x, line[0].y);
                        ctx.lineTo(line[1].x, line[1].y);
                        ctx.lineWidth = weight;
                        ctx.stroke();
                        line = [{x: pos.x, y: pos.y}];
                    }
                    break;
                case 'circle':
                    var rayonX, rayonY, rayon;
                    circle.push({x: pos.x, y: pos.y});
                    if (circle.length == 2) {
                        rayonX = Math.abs(circle[0].x - circle[1].x);
                        rayonY = Math.abs(circle[0].y - circle[1].y);
                        if (rayonX > rayonY) {
                            rayon = rayonX;
                        } else {
                            rayon = rayonY;
                        }
                        ctx.lineWidth = weight;
                        ctx.arc(circle[0].x, circle[0].y, rayon, 0, Math.PI * 2, false);
                        ctx.stroke();
                        circle = [];
                    }
                    break;
            }

            $(this).mousemove(function (event) {
                if (mouseDown == true) {

                    var newPos = {
                        x: (event.pageX - $(this).offset().left) * (canvas.width / width),
                        y: (event.pageY - $(this).offset().top) * (canvas.height / height)
                    };
                    switch (selectedTool) {
                        case 'pen':
                            ctx.lineJoin = "round";
                            ctx.lineCap = "round";
                            ctx.lineTo(newPos.x, newPos.y);
                            ctx.strokeStyle = '#000';
                            ctx.lineWidth = weight;
                            ctx.stroke();
                            break;
                    }
                }
            });

            $(this).mouseup(function () {
                mouseDown = false;

                switch (selectedTool) {
                    case 'pen':
                        ctx.closePath();
                        break;
                }
            })
        });
    }
})(jQuery);