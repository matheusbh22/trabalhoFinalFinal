
//FUNÇÃO PARA VERIFICAR SE HÁ TEXTO
function textoValido(texto){
	if(texto == null || texto == "" || texto.lenght < 1){
		return false;
	}else{
		return true;
	}
}

//FUNÇÃO PARA MOSTRAR ERRO
function mostrarError(){
	var html = "";
	html += '<div class="alert alert-danger" role="alert">';
	html += 'NÃO É POSSÍVEL CADASTRAR UM LEMBRETE EM BRANCO. POR FAVOR INSIRA ALGUM TEXTO.';
	html += '</div>';
	document.getElementById('error').innerHTML = html;
}

//FUNÇÃO PARA LIMPAR A MENSAGEM DE ERRO
function limparError(){
	document.getElementById("error").innerHTML = "";
}

//FUNÇÃO PARA CRIAR LEMBRETE
function createRecordatorio(){
	var conteudoTextArea = document.getElementById("texto").value;
	if(!textoValido(conteudoTextArea)){
       mostrarError();
       return;
	}
	limparError();

	//pegar a data do computador
	var referencia = new Date ();
	var id = referencia.getTime();
	var data = referencia.toLocaleDateString();
	var texto = conteudoTextArea;

	var recordatorio = {"id": id, "data": data, "texto": texto};

	comprovarRecordatorio(recordatorio);
}
//VALIDAR LEMBRETE
function recordatorioValido(recordatoriosExistentes){
	if(recordatoriosExistentes == null || recordatoriosExistentes == "" || typeof recordatoriosExistentes == "undefined" || recordatoriosExistentes == "undefined"){
		return false;
	}else{
		return true;
	}
}

function comprovarRecordatorio (recordatorio){
	var recordatoriosExistentes = localStorage.getItem("recordatorios");
	if(!recordatorioValido(recordatoriosExistentes)){
		var recordatorios = [];
		recordatorios.push(recordatorio);

		saveRecordatorio(recordatorios);
	}else{
		var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);

		recordatoriosRecuperados.push(recordatorio);
		saveRecordatorio(recordatoriosRecuperados);
	}

	mostrarRecordatorios();
}

function saveRecordatorio(recordatorios){
	var recordatoriosJSON = JSON.stringify(recordatorios);
	localStorage.setItem("recordatorios", recordatoriosJSON);
}

function mostrarRecordatorios(){
	var html = "";
	var recordatoriosExistentes = localStorage.getItem("recordatorios");
	if(!recordatorioValido(recordatoriosExistentes)){
		html = "Não existe nenhum Lembre";
		document.getElementById("recordatorios").innerHTML = html;

	}else{
		var recordatoriosRecuperados = JSON.parse(recordatoriosExistentes);
		for(var i = 0; i < recordatoriosRecuperados.lenght; i++){
			html += formatarRecordatorio(recordatoriosRecuperados[i]);

		}
		document.getElementById("recordatorios").innerHTML = html;

	}
}

function formatarRecordatorio(recordatorio){
	var html = "";
	html += '<div class="recordatorio" id="'+ recordatorio.id +'">';
	html += '<div class="row">';
	html += '<div class="col-6 text-left">';
	html += '<small><i class="fa fa-calendar-alt" aria-hidden="true"></i>' + recordatorio.data + '</small>';
	html += '</div>';
	html += '<div class = "col-6 text-right">';
	html += '<small><i class="fa fa-window-close" aria-hidden="true"></i></small>';
	html += '</div>';
	html += '</div>';
	html += '<br>';
	html += '<div class="row">';
	html += '<div class="col-12">';
	html += recordatorio.texto;
	html += '</div>';
	html += '</div>';
	html += '</div>';
	html += '<br>';

	return html;
}
//comprovar se está tudo ok...
document.addEventListener('DOMContentLoaded', function(){
	console.log("Hey");

	//CHAMAR A FUNÇÃO CREATERECORDATORIO
	document.getElementById("buttomSave").onclick = createRecordatorio;

	mostrarRecordatorios();
});