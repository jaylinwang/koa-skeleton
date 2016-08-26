module.exports = {
    "extends": "airbnb",
    "rules": {
        strict: "off",
        "indent": [
            "error",
            4, {
                "SwitchCase": 1
            }
        ],
        "max-len": ["error", 120, 4],
        "func-names": ["error", "never"],
        "import/no-extraneous-dependencies": ["error", {
            "devDependencies": true,
            "optionalDependencies": false,
            "peerDependencies": false
        }]
    }
};
