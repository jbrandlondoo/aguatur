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