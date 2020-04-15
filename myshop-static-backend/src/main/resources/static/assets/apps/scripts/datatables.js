var Datatables = function () {

    /**
     * 初始化 DataTables
     */
    let handlerInitDataTables = function (url, columns) {
        let _dataTable = new Datatable();
        _dataTable.init({
            src: $("#dataTable"),
            resetGroupActionInputOnSuccess: false,
            loadingMessage: '加载中...',
            dataTable: {
                "dom": "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

                "searching": false,
                "sort": false,
                "lengthChange": false,
                "buttons": [],

                "pageLength": 10,
                "language": { // language settings
                    "processing": "处理中...",
                    "metronicAjaxRequestGeneralError": "无法完成请求，请检查你的网络",
                    "aria": {
                        "sortAscending": ": 以升序排列此列",
                        "sortDescending": ": 以降序排列此列"
                    },
                    "emptyTable": "表中数据为空",
                    "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                    "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
                    "infoFiltered": "(从 _MAX_ 结果中过滤出)",
                    "lengthMenu": "_MENU_ 项结果",
                    "search": "搜索:",
                    "zeroRecords": "没有匹配结果",
                    "paginate": {
                        "page": "页码",
                        "pageOf": "/"
                    }
                },

                "orderCellsTop": false,
                "pagingType": "bootstrap_extended", // pagination type(bootstrap, bootstrap_full_number or bootstrap_extended)
                "autoWidth": false, // disable fixed width and enable fluid table
                "processing": true, // enable/disable display message box on record load
                "serverSide": true, // enable/disable server side ajax loading
                "ajax": function (data, callback, settings) {
                    //封装请求参数
                    var param = {};
                    param.size = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                    param.current = (data.start / data.length) + 1;//当前页码
                    let username = $("#username").val();
                    let phone = $("#phone").val();
                    let email = $("#email").val();

                    if ($.trim(username) !== "") param.username = username;
                    if ($.trim(phone) !== "") param.phoneNumber= phone;
                    if ($.trim(email) !== "") param.email = email;
                    //console.log(param);
                    //ajax请求数据
                    $.ajax({
                        type: "GET",
                        url: url,
                        cache: false, //禁用缓存
                        data: param, //传入组装的参数
                        dataType: "json",
                        success: function (result) {
                            var returnData = {};
                            returnData.recordsTotal = result.data.total;//返回数据全部记录
                            returnData.recordsFiltered = result.data.total;//后台不实现过滤功能，每次查询均视作全部结果
                            returnData.data = result.data.records;//返回的数据列表
                            //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                            callback(returnData);
                        }
                    });
                },
                "columns": columns,
            }
        });

        return _dataTable;
    };

    return {
        initDataTables: function (url, columns) {
            return handlerInitDataTables(url, columns);
        }
    };

}();

jQuery(document).ready(function () {

});
