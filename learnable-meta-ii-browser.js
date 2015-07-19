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
	var $vm = $("#vm");
	var $output = $("#output");

	$.each([$code,$compiler,$vm],function(idx,$el) {
		$el.on("input", function() {
			interpret();
		})
	});

	var getVM = function() {
		var vm = ("(function(module,window) {\n" + $vm.val() + "\n})");

		var module = {};
		var errorHandler = {
			alert: function() {
				console.log(arguments)
			}
		}

		eval(vm)(module,errorHandler)

		return module.exports;
	}

	var interpret = function() {
		var vm = getVM();

		var output = vm($code.val(),$compiler.val())

		$output.text(output)
	}

	$.when(
			loadCodeToTextarea("test.aexp", $code),
			loadCodeToTextarea("aexp-compiler.vm",$compiler),
			loadCodeToTextarea("meta-II-vm-interpreter.js",$vm))
		.done(function() {
			interpret();
	})

})