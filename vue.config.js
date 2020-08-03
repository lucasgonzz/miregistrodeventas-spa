let webpack = require('webpack')
module.exports = {
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
	            // other modules
	            introJs: ['intro.js']
	        })
		]
	},
	devServer: {
    	host: 'localhost'
    },
};