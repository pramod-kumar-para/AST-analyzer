var babel = require('babel-core');
var fs = require('fs');

function transformAST(ast) {
	ast.program.body.map(function(node) {
		if(node.kind === 'let') {
			node.kind = 'var';
		}

		if(node.type === 'ForStatement') {
			console.info(`Consider replacing for loop at line: ${node.body.loc.start.line} , column: ${node.body.loc.start.column}`);
		}
		return node;
	});
	return ast;
}


babel.transformFile('code.js', {
	ast: true,
	code: true,
	sourceMaps: true
	}, function(error, result) {
	var { ast, code, map } = result;
	fs.writeFile('output.js',  babel.transformFromAst( transformAST(ast), code, {ast: true, code: true}).code, function(error) {
		if(!error) {
			console.info('Modified source file!');	
		}
	});
});


