$(function () {
    "use strict";
    var g_data_ss = {};
    /*
     *******************************Interfaces*******************************
     */
    //获取SS配置信息
    function get_ss_config(choice) {
        var request_data = {
            'act': 'config',
            'ss_server_choice': choice ? choice : ''
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            g_data_ss['config'] = data;
            if(! $.isEmptyObject(g_data_ss['config'])){
                var i;
                // 填充各项表单
                $('#ss_server_nodes').empty();
                for(i in data['ss_servers']){
                    $('#ss_server_nodes').append('<option value="'+i+'">'+data['ss_servers'][i]+'</option>');
                }
                $('#ss_server_nodes').val(data['ss_server_choice']);
                if('ss_server_name' in data){
                    $('#ss_server_name').val(data['ss_server_name']);
                }else{
                    $('#ss_server_name').val('未命名节点');
                }
                $('#ss_server_ipad').val(data['ss_server_ipad']);
                $('#ss_server_port').val(data['ss_server_port']);
                $('#ss_server_pass').val(data['ss_server_pass']);
                $('#ss_server_meth').val(data['ss_server_meth']);
                $('#ss_runnin_mode').val(data['ss_runnin_mode']);
                $('#ss_remote_dnss').val(data['ss_remote_dnss'] ? data['ss_remote_dnss'] : '8.8.4.4');
                $('#ss_local_port').val(data['ss_local_port'] ? data['ss_local_port'] : '61717');
                if (data['ss_server_fsop'] == "true") {
                    $('#ss_server_fsop').siblings("input").val("true");
                    $('#ss_server_fsop').removeClass("off").addClass("on");
                }else{
                    $('#ss_server_fsop').siblings("input").val("false");
                    $('#ss_server_fsop').removeClass("on").addClass("off");
                }
                HiWiFi.changeSelectToDiv();
                //SS服务器列表点击事件
                $('#ss_server_nodes').next('div.J_diySelectDiv').find('ul li a').on('click', function(){
                    get_ss_config($(this).parent('li').data('value'));
                });
            }
            get_ss_status(true);
        }, 'json');
    }

    //获取SS运行信息
    function get_ss_status(formdata_refresh) {
        $.post('easucks/ss_ajax', {'act': 'status'}, function(data){
            g_data_ss['status'] = data;
            //暂存表单内容，供稍后对比是否有改动时参考
            if (formdata_refresh)
                g_data_ss['formdata'] = $("#ss_setup_node form").serialize();

            if(data.ss_enabled == 'true'){
                $('#ss_auto_start').removeClass('off').addClass('on');
            }else{
                $('#ss_auto_start').removeClass('on').addClass('off');
            }

            if(data.fifa19_region_lock == 'HK'){
                $('#fifa19_region_lock').removeClass('off').addClass('on');
            }else{
                $('#fifa19_region_lock').removeClass('on').addClass('off');
            }

            //SS运行状态
            if(data.ss_state == 'running'){
                $("#ss_status").children(':first').removeClass("icon-x").addClass("icon-j");
                $("#ss_status").children(':last').text(HiWiFi.i18n.prop("g_connected"));
                $('#ss_start').hide();
                $('#ss_restart').show();
                $('.btn_ss_restart').show();
                $('#ss_stop').show();
                $('#ss_status_info').text(HiWiFi.i18n.prop("g_connected"));
                if(typeof(g_data_ss['config']) == 'object' && 'ss_runnin_mode' in g_data_ss['config'])
                    $("#ss_status").children(':last').text($('#ss_status').children(':last').text() + '(' + $("#ss_runnin_mode option[value='"+g_data_ss['config']['ss_runnin_mode']+"']").text().replace(/\(.*\)/, "") + ')');
            }else{
                $("#ss_status").children(':first').removeClass("icon-j").addClass("icon-x");
                $("#ss_status").children(':last').text(HiWiFi.i18n.prop("g_not_connected"));
                $('#ss_start').show();
                $('#ss_restart').hide();
                $('.btn_ss_restart').hide();
                $('#ss_stop').hide();
                $('#ss_status_info').text(HiWiFi.i18n.prop("g_not_connected"));
            }

            //DNS运行状态
            if(data.dns_53_state == 'running' && data.dns_54_state == 'running'){
                $('#dns_status_info').text('运行正常');
            }else{
                var dns_status_info_text = '';
                dns_status_info_text += data.dns_53_state == 'running' ? '端口53运行中' : '<strong class="error">端口53未运行</strong>';
                dns_status_info_text += '，';
                dns_status_info_text += data.dns_54_state == 'running' ? '端口54运行中' : '<strong class="error">端口54未运行</strong>';
                $('#dns_status_info').html(dns_status_info_text);
            }

            $("#current_way").text(g_data_ss['config']['ss_servers'][data['ss_choice']]);

            //显示样式,去除loding
            $('#ss_stauts_area').children(':eq(0)').hide();
            $('#ss_stauts_area').children(':gt(0)').show();
        }, 'json');
    }

    //获取SS版本信息
    function get_ss_version() {
        $.post('easucks/ss_ajax', {'act': 'version'}, function(data){
            g_data_ss['version'] = data;
            if(parseInt(data['local_version']) < parseInt(data['remote_version'])){
                $('#ss_update_bt').text('有新版本');
            }
        }, 'json');
    }

    //获取强制走代理域名列表
    function get_domain_force() {
        $.post('easucks/ss_ajax', {'act': 'domain_force'}, function(data){
            $('#domain_force_value').val(data).prop("disabled", false);
        });
    }

    //获取强制不走代理域名列表
    function get_domain_ignore() {
        $.post('easucks/ss_ajax', {'act': 'domain_ignore'}, function(data){
            $('#domain_ignore_value').val(data).prop("disabled", false);
        });
    }

    //获取强制走代理的局域网源IP列表
    function get_ipsrc_force() {
        $.post('easucks/ss_ajax', {'act': 'ipsrc_force'}, function(data){
            $('#ipsrc_force_value').val(data).prop("disabled", false);
        });
    }

    //获取强制走代理的互联网目的IP列表
    function get_ipdst_force() {
        $.post('easucks/ss_ajax', {'act': 'ipdst_force'}, function(data){
            $('#ipdst_force_value').val(data).prop("disabled", false);
        });
    }

    //获取强制不走代理的局域网源IP列表
    function get_ipsrc_ignore() {
        $.post('easucks/ss_ajax', {'act': 'ipsrc_ignore'}, function(data){
            $('#ipsrc_ignore_value').val(data).prop("disabled", false);
        });
    }

    //获取强制不走代理的互联网目的IP列表
    function get_ipdst_ignore() {
        $.post('easucks/ss_ajax', {'act': 'ipdst_ignore'}, function(data){
            $('#ipdst_ignore_value').val(data).prop("disabled", false);
        });
    }

    //获取过滤设备列表
    function get_mac_ignore() {
        $.post('easucks/ss_ajax', {'act': 'mac_ignore'}, function(data){
            $('#mac_ignore_value').val(data).prop("disabled", false);
        });
    }

    function initializationDatas() {
        var request_configs = {
            version: "v1",
            alias: "initializationDatas"
        };
        //获取 读取数据类型 接口callback的公共的默认处理对象
        var muti_call_callbacks = HiWiFi.constructReadCallback(null, function () {
            //初始化失败，需要重试
            HiWiFi.retry(initializationDatas);
        });
        Openapi.cancelRequest(request_configs.alias);

        get_ss_version();
        get_ss_config();
        get_mac_ignore();
        get_ipsrc_force();
        get_ipdst_force();
        get_ipsrc_ignore();
        get_ipdst_ignore();
        get_domain_force();
        get_domain_ignore();
    }

    /*
     *******************************Controller-Views*******************************
     * 页面展现逻辑
     * 缓存数据模型，展现页面内容
     */
    var controller_view = (function () {
        //拥有id为以下dom元素,只能显示一个(它们为每个子页面div的id)
        var views_id = ['main_view', 'ss_setup_node', 'ss_setup_domain', 'ss_setup_mac', 'ss_setup_ip'];
        var controller_view = {
            setViewShow: function (id) {
                if (!id) {
                    return;
                }
                var show_id = HiWiFi.showElementById(id, views_id);
                if (show_id === "main_view") {
                    $(".J_system_restart").show();
                } else {
                    $(".J_system_restart").hide();
                }
                HiWiFi.initViewHeight();
                //初始化滚动条位置
                $(document).scrollTop(0);
                $(document).scrollLeft(0);
            },
            getViewIDByBtId: function (id) {
                var view_id = "";
                for (var i in views_id) {
                    if (views_id[i] + "_bt" === id) {
                        view_id = views_id[i];
                        return view_id;
                    }
                }
                return view_id;
            },
            initView: function () {
                var _self = this;
                //默认显示mode
                var current_hash = HiWiFi.getUrlHash("model") || "main_view";
                //显示样式,去除loding
                $("#loading_view").hide();
                $("#middle_part").show();
                controller_view.setViewShow(current_hash);
                HiWiFi.initViewHeight();
                $("#main_view").children("div").css("visibility", "visible");
            },
            //折叠/展开 高级设置页面
            showAdvancedView: function (view_element, bt_element, is_show) {
                if (!view_element || !bt_element) {
                    return;
                }
                if ($(view_element).css('display') === "none" || is_show) {
                    $(view_element).slideDown("fast", function () {
                        HiWiFi.initViewHeight();
                    });
                    $(bt_element).children('span').removeClass("icon16").addClass("icon17");
                } else {
                    $(view_element).slideUp("fast", function () {
                        HiWiFi.initViewHeight();
                    });
                    $(bt_element).children('span').removeClass("icon17").addClass("icon16");
                }
            },
        };

        return controller_view;
    })();
    /*
     *******************************Actions*******************************
     */
    //初始化页面
    controller_view.initView();

    //初始化数据
    initializationDatas();

    //点击设备在线列表的右上角的返回按钮
    $(".go_back").on("click", function () {
        window.location.hash = "model=main_view";
        controller_view.initView();
        //初始化滚动条位置
        $(document).scrollTop(0);
        $(document).scrollLeft(0);
    });

    //高级设置
    $("#main_view").on("click", function (e) {
        var id = $(e.target).attr('id');
        if (!id) {
            return;
        }
        id = controller_view.getViewIDByBtId(id);
        window.location.hash = "model=" + id;
        // controller_view.doActionByViewId(id);
        controller_view.setViewShow(id);
    });

    //SS设置页页[高级设置]按钮
    $("#ss_advanced_setup_bt").on("click", function () {
        controller_view.showAdvancedView($("#ss_advanced_table"), $(this));
    });
 
    //强制走代理域名列表 提交表单
    $("#submit_domain_force").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'domain_force_save',
            'list': $('#domain_force_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: '域名列表保存成功，但未生效，需重启插件',
                content: ""
            }).time(2500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //不强制走代理域名列表 提交表单
    $("#submit_domain_ignore").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'domain_ignore_save',
            'list': $('#domain_ignore_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: '域名列表保存成功，但未生效，需重启插件',
                content: ""
            }).time(2500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //强制走代理的局域网源IP列表 提交表单
    $("#submit_ipsrc_force").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'ipsrc_force_save',
            'list': $('#ipsrc_force_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: 'IP列表保存成功，并且已生效，无需重启',
                content: ""
            }).time(2500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //强制走代理的互联网目的IP列表 提交表单
    $("#submit_ipdst_force").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'ipdst_force_save',
            'list': $('#ipdst_force_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: 'IP列表保存成功，并且已生效，无需重启',
                content: ""
            }).time(2500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //强制不走代理的局域网源IP列表 提交表单
    $("#submit_ipsrc_ignore").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'ipsrc_ignore_save',
            'list': $('#ipsrc_ignore_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: 'IP列表保存成功，并且已生效，无需重启',
                content: ""
            }).time(2500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //强制不走代理的互联网目的IP列表 提交表单
    $("#submit_ipdst_ignore").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'ipdst_ignore_save',
            'list': $('#ipdst_ignore_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: 'IP列表保存成功，并且已生效，无需重启',
                content: ""
            }).time(2500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //设备MAC过滤 提交表单
    $("#submit_mac_ignore").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = {
            'act':  'mac_ignore_save',
            'list': $('#mac_ignore_value').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: 'MAC列表保存成功，重启SS后生效',
                content: ""
            }).time(1500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //SS 保存按钮
    $("#submit_ss").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        var $form = $("#ss_setup_node form");
        HiWiFi.formElementTrim($form, ["password", ""]);
        if (!$form.valid()) {
            $bt.removeClass("disable");
            return;
        }
        $bt.text(HiWiFi.i18n.prop("g_retaining"));
        var request_data = $form.serializeArray();
        request_data = HiWiFi.simplifyJSON(request_data);
        request_data['act'] = 'save';
        $.post('easucks/ss_ajax', request_data, function(data){
            HiWiFi.popDialog({
                type: "G-text",
                title: [HiWiFi.i18n.prop("g_set_success")],
                content: ""
            }).time(1500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_save"));
        }, 'json');
    });

    //SS 重启按钮
    $("#ss_restart, .btn_ss_restart").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        var $form = $("#ss_setup_node form");
        if (!$form.valid()) {
            $bt.removeClass("disable");
            return;
        }
        $bt.addClass("disable");
        var ss_restart = function(){
            $bt.text('重启中...');
            var request_data = {'act': 'restart', 'ss_server_choice': $('#ss_server_nodes').val()};
            $.post('easucks/ss_ajax', request_data, function(data){
                get_ss_status(true);
                HiWiFi.popDialog({
                    type: "G-text",
                    title: data['state'] ? '重启成功' : '出错了!',
                    content: ""
                }).time(1500);
                $bt.removeClass("disable").text('重启');
            }, 'json');
        };
        //save first if form data has modified
        if ($form.serialize() != g_data_ss['formdata']) {
            $bt.text(HiWiFi.i18n.prop("g_retaining"));
            var request_data = $form.serializeArray();
            request_data = HiWiFi.simplifyJSON(request_data);
            request_data['act'] = 'save';
            $.post('easucks/ss_ajax', request_data, function(data){
                ss_restart();
            });
        }else{
            ss_restart();
        }
    });

    //SS 启动按钮
    $("#ss_start").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        var $form = $("#ss_setup_node form");
        if (!$form.valid()) {
            $bt.removeClass("disable");
            return;
        }
        $bt.addClass("disable");
        var ss_start = function(){
            $bt.text(HiWiFi.i18n.prop("g_startting"));
            var request_data = {'act': 'start', 'ss_server_choice': $('#ss_server_nodes').val()};
            $.post('easucks/ss_ajax', request_data, function(data){
                get_ss_status(true);
                HiWiFi.popDialog({
                    type: "G-text",
                    title: data['state'] ? '启动成功' : '出错了!',
                    content: ""
                }).time(1500);
                $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_start"));
            }, 'json');
        };
        //save first if form data has modified
        if ($form.serialize() != g_data_ss['formdata']) {
            $bt.text(HiWiFi.i18n.prop("g_retaining"));
            var request_data = $form.serializeArray();
            request_data = HiWiFi.simplifyJSON(request_data);
            request_data['act'] = 'save';
            $.post('easucks/ss_ajax', request_data, function(data){
                ss_start();
            });
        }else{
            ss_start();
        }
    });

    //SS 停止按钮
    $("#ss_stop").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_processing"));
        var request_data = {'act': 'stop'};
        $.post('easucks/ss_ajax', request_data, function(data){
            get_ss_status(false);
            HiWiFi.popDialog({
                type: "G-text",
                title: data['state'] ? '停止成功' : '出错了!',
                content: ""
            }).time(1500);
            $bt.removeClass("disable").text(HiWiFi.i18n.prop("g_stop"));
        }, 'json');
    });

    //SS,DNS运行状态后面的刷新按钮
    $("#ss_refresh, #dns_refresh").click(function (e) {
        var $bt = $(this);
        if ($bt.hasClass('disable')) {
            return;
        }
        $bt.addClass("disable");
        $bt.text(HiWiFi.i18n.prop("g_processing"));
        get_ss_config($('#ss_server_nodes').val());
        setTimeout(function(){$bt.removeClass("disable").text(HiWiFi.i18n.prop("g_refresh"));}, 3000);
    });

    //一次性验证和fastopen选项的按钮
    $("#ss_server_fsop").click(function (e) {
        var $bt = $(this);
        var $input = $bt.siblings('input');
        if ($bt.hasClass("on")) {
            $bt.removeClass("on").addClass("off");
            $input.val('false');
        } else {
            $bt.removeClass("off").addClass("on");
            $input.val('true');
        }
    });

    //FASTOPEN开关的提示
    $("#ss_server_fsop").next('span.J_Tip').hover(function () {
        var $tipPop = $('.J_ss_fsop_tip_text');
        var $this = $(this),
            l = $this.offset().left - 15,
            t = $this.offset().top + 20;
        $tipPop.css({
            'left': l + 'px',
            'top': t + 'px'
        }).show();
    }, function () {
        $('.J_ss_fsop_tip_text').hide();
    });

    //SS是否开机启动
    $("#ss_auto_start").on("click", function () {
        var $bt = $(this);
        if(! $bt.prop('disabled')){
            var request_data = {'act': 'service'};
            if ($bt.hasClass("on"))
                request_data['service'] = 'disable';
            else
                request_data['service'] = 'enable';

            $bt.prop('disabled', true);

            $.post('easucks/ss_ajax', request_data, function(data){
                if (data['ss_enabled'] == 'false') {
                    $bt.removeClass("on").addClass("off");
                }else{
                    $bt.removeClass("off").addClass("on");
                }
                $bt.prop('disabled', false);
            }, 'json');
        }
    });

    //FIFA19强制锁定中亚服功能
    $("#fifa19_region_lock").on("click", function () {
        var $bt = $(this);
        if(! $bt.prop('disabled')){
            var request_data = {'act': 'fifa19_region_lock'};
            if ($bt.hasClass("on"))
                request_data['region'] = 'disable';
            else
                request_data['region'] = 'HK';

            $bt.prop('disabled', true);

            $.post('easucks/ss_ajax', request_data, function(data){
                if (data['fifa19_region_lock'] != 'HK') {
                    $bt.removeClass("on").addClass("off");
                }else{
                    $bt.removeClass("off").addClass("on");
                }
                $bt.prop('disabled', false);
            }, 'json');
        }
    });

    //SS服务器别名的特殊判断
    jQuery.validator.addMethod("noSpecialChars", function (value, element) {
        "use strict";
        if(/[\[\]\(\)\{\}\<\>\=\;]/.test(value)){
            return this.optional(element) || false;
        }else{
            return this.optional(element) || true;
        }
    }, "别名不能包含[](){}<>=;等特殊字符");

    //SS服务器地址的特殊判断
    jQuery.validator.addMethod("ipAndDomainCheck", function (value, element) {
        "use strict";
        if(/:/.test(value)){
            return this.optional(element) || /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(value);
        }else if(/[a-z]/i.test(value)){
            return this.optional(element) || /^([a-z0-9-]+\.)*[a-z0-9-]+\.[a-z]{2,7}$/i.test(value);
        }else{
            return this.optional(element) || /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/.test(value);
        }
    }, "请输入正确的域名或IP地址");

    //自定义SS表单验证
    $("#ss_setup_node form").validate({
        errorElement: 'p',
        errorClass: 'error',
        ignore: "",
        showInputElementError: false,
        rules: {
            ss_server_choice: {required: true},
            ss_server_name: {required: true, headAndTailNotSapce: true, noSpecialChars: true, nameMaxLength: 30},
            ss_server_ipad: {required: true, ipAndDomainCheck: true, maxlength: 48},
            ss_server_port: {required: true, positiveInteger: true},
            ss_server_pass: {required: true, headAndTailNotSapce: true},
            ss_server_meth: {required: true},
            ss_runnin_mode: {required: true},
            ss_remote_dnss: {required: true}
        },
        messages: {
            ss_server_choice: {required: '请选择服务器'},
            ss_server_name: {required: '请填写服务器别名', nameMaxLength: '别名最长30个字节或10个中文字'},
            ss_server_ipad: {required: '请填写服务器地址', maxlength: 'IP地址最长15个字符，域名最长48个字符'},
            ss_server_port: {required: '请填写服务器端口'},
            ss_server_pass: {required: '请填写SS通讯密码'},
            ss_server_meth: {required: '请选择SS加密算法'},
            ss_runnin_mode: {required: '请选择SS运行模式'},
            ss_remote_dnss: {required: '请选择远程DNS服务器'}
        },
        errorPlacement: function (place, $element) {
            $element.parent().append(place);
        }
    });

    //SS服务器别名修改时，修改结果实时反馈到服务器选择列表中
    $('#ss_server_name').on('keyup', function(){
        var _this = this;
        $("#ss_setup_node form").valid();
        $('#ss_server_nodes option:selected').text($(_this).val());
        HiWiFi.changeSelectToDiv();
        //SS服务器列表点击事件
        $('#ss_server_nodes').next('div.J_diySelectDiv').find('ul li a').on('click', function(){
            get_ss_config($(this).parent('li').data('value'));
        });
    });

    //创建SS服务器配置
    $('#ss_create').on('click', function(){
        var random_number = Math.round(Math.random()*10000);
        var random_node = 'server'+random_number;
        var random_name = '服务器'+Math.round(Math.random()*10000);
        $('#ss_server_nodes').append('<option value="'+random_node+'">'+random_name+'</option>').val(random_node);
        $('#ss_server_name').val(random_name).select();
        $('#ss_server_ipad').val('xxx.xxx.xxx.xxx');
        $('#ss_server_port').val('1717');
        $('#ss_server_pass').val('easucks');
        $('#ss_server_meth').val('rc4-md5');
        $('#ss_runnin_mode').val('gfwlist');
        $('#ss_server_fsop').val('false');
        $('#ss_remote_dnss').val('8.8.4.4');
        $('#ss_local_port').val('61717');
        HiWiFi.changeSelectToDiv();
        //SS服务器列表点击事件
        $('#ss_server_nodes').next('div.J_diySelectDiv').find('ul li a').on('click', function(){
            get_ss_config($(this).parent('li').data('value'));
        });
    });

    //删除SS服务器配置
    $('#ss_delete').on('click', function(){
        var request_data = {
            'act': 'delete',
            'ss_server_choice': $('#ss_server_nodes').val()
        };
        $.post('easucks/ss_ajax', request_data, function(data){
            get_ss_config();
            HiWiFi.popDialog({
                type: "G-text",
                title: data['state'] ? '删除成功' : '出错了!',
                content: ""
            }).time(1500);
        }, 'json');
    });
    
    //网络测试(Add by wybb)
    $('#network_test').on('click', function(){
    	var network_test_result = $('#network_test_result');
    	var network_test_bt = $(this);
    	if(network_test_bt.data('isStarted'))
    		return;
    	network_test_bt.data('isStarted', true);
    	network_test_bt.css('color', '#909090');
    	network_test_result.css('color', 'red');
    	network_test_result.text('测试中...');
    	$.post('easucks/ss_ajax', {'act': 'network_test'}, function(data){
				if(data['code'] != "200" && data['code'] != "302"){
        	network_test_result.text('测试失败');
        }
        else{
        		network_test_result.text(data['time'] * 1000 + '毫秒');
        }
        network_test_bt.css('color', '');  
        network_test_result.css('color', '');
        network_test_bt.removeData('isStarted');
      }, 'json');
    });
});
