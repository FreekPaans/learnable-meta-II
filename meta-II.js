var compiler = require("./compiler")
var fs = require("fs")

var sourceFile = process.argv[2];

console.warn("compiling %s ", sourceFile)

fs.readFile(sourceFile, "utf8", function(err, result) {
	if(err) {
		console.error("Failed reading file " + err)
		process.exit(1)
	}

	var compiled = compiler(result);
	console.log(compiled.result)
});