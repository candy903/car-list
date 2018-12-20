require(['./js/config.js'], function() {
    require(['jquery', 'bscroll'], function($, bscroll) {
        var bscroll = new bscroll('.wrap', {
            probeType: 2,
            click: true
        })
        ajax();

        function ajax() {
            $.ajax({
                url: '/api/list',
                dataType: 'json',
                success: function(res) {
                    // console.log(res)
                    if (res.code === 1) {
                        render(res.data)
                    }
                }
            })
        }

        function render(data) {
            var obj = {};
            data.forEach(function(item) {
                    var first = item.Spelling.substr(0, 1);
                    if (!obj[first]) {
                        obj[first] = {
                            title: first,
                            list: []
                        }
                    }
                    obj[first].list.push(item);

                })
                // console.log(obj)
            var target = [];
            for (var i in obj) {
                target.push(obj[i])
            }

            var str = '';
            var html = '';
            target.forEach(function(item) {
                html += `<li>${item.title}</li>`;

                str += `
                    <li>
                        <h2>${item.title}</h2>
                        <ol>`
                str += renderlist(item.list)
                str += ` </ol>
                    </li>
                    `
            })
            $('.uls').html(str);
            $('.fix').html(html)
        }

        function renderlist(data) {
            return data.map(function(item) {
                return `<li>${item.Name}</li>`
            }).join('')
        }

        $('.fix').on('click', 'li', function() {
            var index = $(this).index();

            bscroll.scrollToElement($('.uls>li').eq(index)[0])

            $('.mark p').html($(this).html())
                // $('.mark').toggleClass('none')
            document.querySelector('.mark').style.display = 'block';
            setTimeout(function() {
                document.querySelector('.mark').style.display = 'none';
            }, 500)

        })

    })
})