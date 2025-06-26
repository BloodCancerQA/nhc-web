module.exports = {
    extends: ['@ecomfe/eslint-config', '@ecomfe/eslint-config/typescript', '@ecomfe/eslint-config/react'],
    plugins: ['import'],
    rules: {
        '@babel/object-curly-spacing': 0,
        'react/jsx-no-bind': 0,
        // 行尾必须使用分号结束
        semi: [2, 'always'],
        // 对象的最后一项后面是否写逗号
        'comma-dangle': ['error', 'never'],
        'max-len': [2, { code: 200 }],
        'arrow-parens': 0,
        'brace-style': 0,
        'no-console': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        'import/order': [
            1,
            {
                groups: ['builtin', 'external', ['internal', 'parent', 'sibling', 'index'], 'unknown'],
                pathGroups: [
                    {
                        pattern: '@baidu/**',
                        group: 'external',
                        position: 'after'
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ]
    }
};
