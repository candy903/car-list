require(['../js/config.js'], function() {
    require(['jquery', 'bscroll', 'parmas'], function($, bscroll, parmas) {

        var id = decodeURI(parmas.id);
        var type = decodeURI(parmas.type);
        console.log(id, type)
        var obj = {};
        ajax()

        function ajax() {
            $.ajax({
                url: '/api/detail',
                data: {
                    type: type,
                    id: id
                },
                dataType: 'json',
                success: function(res) {
                    console.log(res)
                    if (res.code === 1) {
                        var str = "";
                        console.log(res.data)
                        str += `<dl data-id="${res.data.id}">
                                    <dt>
                                        <img src=".${res.data.url}" alt="">
                                    </dt>
                                    <dd>${res.data.title}${res.data.price}</dd>
                                </dl>
                                    `
                        $('.wrap').html(str)

                        obj = res.data
                        console.log(obj)
                    }
                }
            })
        }

        $('.btn').on('click', function() {
            var history = JSON.parse(localStorage.getItem('history')) || [];

            var mark = history.some(function(item) {
                if (item.id == id) {
                    item.num++;
                }
                return item.id == id
            })
            if (!mark) {
                obj.num = 1;
                history.push(obj)
            }

            localStorage.setItem('history', JSON.stringify(history))
        })
    })
})