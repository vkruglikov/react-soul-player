module.exports = {
    presets: [
        [
            "react-app",
            {
                "absoluteRuntime": false
            }
        ],
        ['@dr.pogodin/babel-preset-svgr', {
            mimicCreateReactApp: {
                pathsRelativeTo: __dirname,
            },
        }],
    ],
    "plugins": [
        ["babel-plugin-replace-imports", {
            "test": /\.svg$/i,
            "replacer": ".js"
        }],
        [
            "css-modules-transform", {
                "extractCss": "./dist/styles.css"
            }
        ]
    ]
};