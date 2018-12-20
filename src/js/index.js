require(['./js/config.js'], function() {
    require(['jquery', 'bscroll'], function($, bscroll) {
        var type = "女装";
        ajax();
        var bscroll = new bscroll('.right', {
            click: true
        })

        function ajax() {
            $.ajax({
                url: '/api/type',
                dataType: "json",
                success: function(res) {
                    console.log(res)
                }
            })


            $.ajax({
                url: '/api/list',
                data: {
                    type: type
                },
                dataType: 'json',
                success: function(res) {
                    // console.log(res)
                    if (res.code === 1) {
                        console.log(res.data)
                        render(res.data[0].list)
                    }
                }
            })
        }

        function render(data) {
            var str = "";
            data.forEach(function(item) {
                str += ` <dl data-id="${item.id}">
                            <dt>
                            <img src="${item.url}" alt="">
                        </dt>
                            <dd>${item.title}</dd>
                        </dl>`
            })
            $('.content').html(str)
        }

        $('.content').on('click', 'dl', function() {
            var id = $(this).attr('data-id');
            location.href = '../page/detail.html?id=' + id + '&type=' + type;
        })

    })
})