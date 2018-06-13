layui.define(['layer', 'table', 'form','upload'], function(exports){
	var $ = layui.jquery;
	var layer = layui.layer;
	var table = layui.table;
	var form = layui.form;
	var upload = layui.upload;
	//拖拽上传
	upload.render({
		elem: '#import_cards'
		,url: '/admin/productscard/importajax/'
		,auto: false
		,accept: 'file' //普通文件
		,exts: 'txt' //只允许txt文件
		,size: 100 //限制文件大小，单位 KB
		,bindAction: '#startUpload'
		,done: function(res){
			console.log(res)
		}
	});
	//修改
	form.on('submit(import)', function(data){
		data.field.csrf_token = TOKEN;
		var i = layer.load(2,{shade: [0.5,'#fff']});
		$.ajax({
			url: '/admin/productscard/importajax',
			type: 'POST',
			dataType: 'json',
			data: data.field,
		})
		.done(function(res) {
			if (res.code == '1') {
				layer.open({
					title: '提示',
					content: '导入成功',
					btn: ['确定'],
					yes: function(index, layero){
					    location.reload();
					},
					cancel: function(){ 
					    location.reload();
					}
				});
			} else {
				layer.msg(res.msg,{icon:2,time:5000});
			}
		})
		.fail(function() {
			layer.msg('服务器连接失败，请联系管理员',{icon:2,time:5000});
		})
		.always(function() {
			layer.close(i);
		});

		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	});
	//删除
	$(".productscard-table").on("click",".delete",function(event){
		event.preventDefault();
		var cardid = $(this).attr("data-cardid");
		alert(cardid);
		/*$(this).attr({"disabled":"disabled"});
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/admin/productscard/deleteajax",
            data: { "csrf_token": TOKEN,'cardid':cardid},
            success: function(res) {
                if (res.code == 1) {
					layer.open({
						title: '提示',
						content: '删除成功',
						btn: ['确定'],
						yes: function(index, layero){
							location.reload();
						},
						cancel: function(){ 
							location.reload();
						}
					});
                } else {
					layer.msg(data.msg,{icon:2,time:5000});
                }
                return;
            }
        });*/
	});
	
	table.render({
		elem: '#productscard',
		url: '/admin/productscard/ajax',
		page: true,
		cellMinWidth:60,
		cols: [[
			{field: 'id', title: 'ID', width:80},
			{field: 'name', title: '商品名'},
			{field: 'card', title: '卡密'},
			{field: 'addtime', title: '添加时间', width:200, templet: '#addtime',align:'center'},
			{field: 'oid', title: '状态', width:100, templet: '#status',align:'center'},
			{field: 'opt', title: '操作', width:100, templet: '#opt',align:'center'},
		]]
	});


	//修改
	form.on('submit(add)', function(data){
		data.field.csrf_token = TOKEN;
		var i = layer.load(2,{shade: [0.5,'#fff']});
		$.ajax({
			url: '/admin/productscard/addajax',
			type: 'POST',
			dataType: 'json',
			data: data.field,
		})
		.done(function(res) {
			if (res.code == '1') {
				layer.open({
					title: '提示',
					content: '新增成功',
					btn: ['确定'],
					yes: function(index, layero){
					    location.reload();
					},
					cancel: function(){ 
					    location.reload();
					}
				});
			} else {
				layer.msg(res.msg,{icon:2,time:5000});
			}
		})
		.fail(function() {
			layer.msg('服务器连接失败，请联系管理员',{icon:2,time:5000});
		})
		.always(function() {
			layer.close(i);
		});

		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	});
	
	exports('adminproductscard',null)
});