var count = 0;

function validate(id){
	id.className = "inputFormFail inputForm";
	if (id.checkValidity()) {
		id.className = "inputForm";
	}
	
}

function validatePass(id){
	id.className = "inputFormFail inputForm";
	if (id.value == document.getElementById("regPass").value) {
		id.className = "inputForm";
		$('#makeRegister').removeAttr('disabled');
	}
}


function validateDateOut(){
	let dateIn;
	let out;
	dateIn = new Date(document.getElementById('dateUp').value);
	out = new Date(document.getElementById('dateOut').value);
	if (dateIn < out) {
		document.getElementById("btnReserveData").disabled = false;
		document.getElementById('dateOut').className = "";
	}else{
		document.getElementById('dateOut').className = "error";
		document.getElementById("btnReserveData").disabled = true;
	}
}