(() => {
    function readFile(evt) {
        var files = evt.target.files;

        if (files) {
            for (var i=0, f; f=files[i]; i++) {
                var r = new FileReader();
                r.onload = (function(f) {
                    return function(e) {
                        var contents = e.target.result;

                        var lines = contents.split("\n"),
                        outputHead = [],
                        outputBody = [],
                            t, h;

                        for (h = 0; h < (lines.length) - 12; h++)
                            outputHead.push("<tr><th class='head'>"
                                + lines[h].slice(0, -1).split(";").join("</th><th class='head'>")
                                + "</th></tr>");
                            outputHead = outputHead.join("");

                        for (t = 1; t < lines.length; t++)

                            outputBody.push("<tr><td>"
                                + lines[t].slice(0,-1).split(";").join("</td><td>")
                                + "</td></tr>");

                        outputBody.sort(function(a, b) {
                            return b[1] - a[1];
                        });

                        outputBody = outputBody.join("");

                        var thead = document.getElementById('thead');
                        var tbody = document.getElementById('tbody');

                        thead.innerHTML = outputHead;
                        tbody.innerHTML = outputBody;

                        var head = document.getElementsByClassName('head');
                        for(c = 0; c < head.length; c++){
                            head[c].setAttribute("id", "head-" + c);
                        }

                        var head0 = document.getElementById('head-0'),
                            head1 = document.getElementById('head-1'),
                            head2 = document.getElementById('head-2'),
                            head3 = document.getElementById('head-3');

                        head0.addEventListener('click', function(e) {
                            SortTable(0, 'T');
                        });

                        head1.addEventListener('click', function(e) {
                            SortTable(1, 'T');
                        });

                        head2.addEventListener('click', function(e) {
                            SortTable(2, 'N');
                        });

                        head3.addEventListener('click', function(e) {
                            SortTable(3, 'D' , 'mdy');
                        });

                        SortTable(1, 'T');

                    };
                })(f);

                r.readAsText(f);
            }
        } else {
            alert("Failed to load files");
        }
    }

    document.getElementById('fileinput').addEventListener('change',readFile, false);

})();