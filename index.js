var loaderUtils = require('loader-utils');
var path = require('path');

module.exports = function() {};
module.exports.pitch = function(source) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.getOptions(this) || {
		lazy: true,
		name: path.resolve(__dirname),
		regExp: null,
	};
	var chunkNameParam;
	if (query.regExp) {
		chunkNameParam = loaderUtils.interpolateName(this, query.name + '-[1]', {
			regExp: query.regExp,
		});
	} else {
		chunkNameParam = loaderUtils.interpolateName(this, query.name + '-[name]');
	}
	var result = [];
	if(query.lazy) {
		result = [
			"// custom-loader: kimi no na e do nan ga i lu ga ?\n",
			"\n",
			"module.exports = function(cb) {\n",
			"	return async function() {\n",
			"		var _import = await import(",
						`/* webpackChunkName: "${chunkNameParam}" */`,
						' /* webpackMode: "lazy" */ ',
						loaderUtils.stringifyRequest(this, "!!" + source),
					");\n",
			"		cb(_import);\n",
			"	};\n",
			"};\n"
		];
	} else {
		result = [
			"// kimi no zen zen zen sei ga ra boku wa, kimi ni sakashi hajime da ro.\n",
			"module.exports = function(cb) {\n",
			"	return function() {\n",
			"		cb(import(\n",
						loaderUtils.stringifyRequest(this, "!!" + source),
					"))\n",
				"};\n",
			"};\n",
		];
	}
	return result.join('');
}