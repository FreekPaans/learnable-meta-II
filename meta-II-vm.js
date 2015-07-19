var vm = require("./meta-II-vm-compiler")
var fs = require("fs")

var sourceFile = process.argv[2];
var compilerFile = process.argv[3];

console.warn("compiling %s with %s", sourceFile, compilerFile)

fs.readFile(sourceFile, "utf8", function(err, source) {
	if(err) {
		console.error("Failed reading file " + err)
		process.exit(1)
	}

	fs.readFile(compilerFile, "utf8", function(err, compiler) {
		if(err) {
			console.error("Failed reading compiler file " + err)
			process.exit(1)
		}

		console.log(vm(source,compiler))
	});
});