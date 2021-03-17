let webpack = require('webpack')
module.exports = {
	lintOnSave: false,
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
	            // other modules
	            introJs: ['intro.js']
	        })
		]
	},
	devServer: {
    	host: 'miregistrodeventas.local',
    	port: '8081'
    },
};