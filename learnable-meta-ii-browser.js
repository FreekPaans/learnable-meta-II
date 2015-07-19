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
	var $language = $("#language");

	var $metaII = $("#metaII");

	var $vm = $("#vm");

	var $output = $("#output");

	$.each([$code,$compiler,$vm],function(idx,$el) {
		$el.on("input", function() {
			console.log('input')
			console.log($el)
			interpret();
		})
	});

	$.each([$metaII, $language], function(idx, $el) {
		$el.on("input", function() {
			var vm = getVM();

			var out = vm($language.val(), $metaII.val());

			$compiler.val(out);

			interpret();
		});
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
		vm = getVM();

		var output = vm($code.val(),$compiler.val())

		$output.text(output)
	}

	$.when(
			loadCodeToTextarea("test.aexp", $code),
			loadCodeToTextarea("aexp-compiler.vm",$compiler),
			loadCodeToTextarea("meta-II-vm-interpreter.js",$vm),
			loadCodeToTextarea("aexp-to-vm.metaII",$language),
			loadCodeToTextarea("metaII.vm",$metaII)
			)
		.done(function() {
			interpret();
	})

})