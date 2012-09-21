$(document).ready(function() {

	switch(window.location.pathname) {
		case "/money_manager/":
			{
				CargarPresupuestos();
			};
			break;

		case "/money_manager/editar_presupuesto.html":
			{
				var id = GetQueryString("wallet");
				CargarDetalleWallet(id);
			};
			break;
	}
	
	function CargarPresupuestos() {
		$.post("http://localhost:8080/codeigniter/index.php/Moneymanager/CargarWallets", function(data) {
	
			$.each(data, function(i, data) {
				$("#presupuestos").append("<div class='wallets' title='" + data.Id + "'><a>" + data.Nombre + " </a></div>");
			});
			$("#presupuestos").append("<div class='wallets' id='crearPresupuesto'><a href='crear_presupuesto.html'>Crear nuevo presupuesto</a></div>");
	
		}, "json");
	}
	
	$(".wallets").live("click", function(){
		window.location = 'editar_presupuesto.html?wallet=' + $(this).attr("title");
	});
	
	$("#crearPresupuesto").click(function(){
		alert($(this).attr("title"));
	});

	$("#btnRegistrarPresupuesto").click(function() {

		var _Nombre = $("#txtNombre").val();
		var _Descripcion = $("#txtDescripcion").val();

		$.post("http://localhost:8080/codeigniter/index.php/Moneymanager/CrearWallet", {
			"nombre" : _Nombre,
			"descripcion" : _Descripcion
		}, function(data) {

			window.location = 'editar_presupuesto.html?wallet=' + data;

		});

	});

	function GetQueryString(search_key) {
		var query = window.location.search.substring(1);
		var parms = query.split('&');
		var qsParm;
		for(var i = 0; i < parms.length; i++) {

			var key = parms[i].split('=')[0];
			if(search_key === key)
			{
				return parms[i].split('=')[1];
			}

		}
		return "";
	}
	
	function CargarDetalleWallet(id)
	{
		$.post("http://localhost:8080/codeigniter/index.php/Moneymanager/SeleccionarWallet", {
			"id" : id
		}, function(data) {

			var _Valores = "";
			$.each(data, function(i, data) {
				_Valores = _Valores + "<div title='" + data.Id + "'>"
				_Valores = _Valores + "<h2>" + data.Nombre + " </h2>";
				_Valores = _Valores + "<p>" + data.Descripcion + " </p>";
				_Valores = _Valores + "</div>"
			});
			$("#content").html(_Valores);

		}, "json");
	}

});
