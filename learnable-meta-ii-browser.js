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

	$code.on("input", function() {
		console.log("re-interpreting")
		interpret();
	})

	var getInterpreter = function() {
		var interpreter = ("(function(module,window) {\n" + $interpreter.val() + "\n})");

		var module = {};

		eval(interpreter)(module,window)

		return module.exports;
	}

	var interpret = function() {
		var interpreter = getInterpreter();

		console.log("Code: %s", $code.val())

		var output = interpreter($code.val(),$compiler.val())
		console.log(output)
		$output.text(output)
	}

	$.when(
			loadCodeToTextarea("test.aexp", $code),
			loadCodeToTextarea("aexp-compiler.vm",$compiler),
			loadCodeToTextarea("meta-II-vm-interpreter.js",$interpreter))
		.done(function() {
			interpret();
	})

})