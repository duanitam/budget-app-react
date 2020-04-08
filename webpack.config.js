const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {

    const isProduction = env === 'production';
    //  Creating a new instanse of extract file. instead of bundle all together, will bundle separate css js files
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return{
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname,'public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                // use - Allow to use two loaders.
                // css-loader - allow webpack load in css assets - teach it how to take css and convert it to js representation od it
                // style-loader - take css in js after css loaded it, and inject it to the DOM by injecting <style> tag
                // sass-loader - use "node-sass" to convert the file
                // node-sass - install as well
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },{
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }
            ]
        },
        plugins:[
            CSSExtract
        ],

        // Instead of pointing in the bundle file, show in the exact file where error or even printing occur. - Source Map -
        devtool: isProduction? 'source-map' :'inline-source-map',

        // Allow webpack-dev-server to run a server AND to bundle when needed. NOT bundling into a file! but bundling from memory.
        // Actually will not use or create bundle.js file.
        // Faster and refresh better
        // history api fallback - true tell the dev server we are rendering client side, so return index for all 404 pages
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true
        }
    }
};