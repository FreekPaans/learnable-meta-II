$(function() {
	var loadCodeToTextarea = function(filename, $textarea) {
		return $.ajax({
			method: "get",
			dataType: "text",
			url: filename
		})
		.done(function(content){
			$textarea.text(content)
		})
	}

	var $code = $("#code");
	var $compiler = $("#compiler");
	var $interpreter = $("#interpreter");
	var $output = $("#output");

	var interpret = function() {
		var interpreter = ("(function(module,window) {\n" + $interpreter.text() + "\n})");

		var module = {};

		eval(interpreter)(module,{})
		
		$output.text(module.exports($code.text(),$compiler.text()))
	}

	$.when(
			loadCodeToTextarea("test.aexp", $code),
			loadCodeToTextarea("aexp-compiler.vm",$compiler),
			loadCodeToTextarea("meta-II-vm-interpreter.js",$interpreter))
		.done(function() {
			interpret();
	})

})