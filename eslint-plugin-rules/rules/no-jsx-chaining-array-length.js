const isLogicalExpression = (node) => node.expression.type === 'LogicalExpression' && node.expression.operator === '&&';
const isLengthCheck = (node) => (node.type === 'ChainExpression' &&
    node.expression.type === 'MemberExpression' &&
    node.expression.property.name === 'length') ||
    (node.type === 'MemberExpression' && node.property.name === 'length');
const shouldReportLengthUsage = (node) => isLogicalExpression(node) && isLengthCheck(node.expression.left);
/**
 * Запрещено использовать Array.length && или Array?.length в JSX
 *
 * @example
 * // Ошибочные
 * data?.length && data.map(item => <p>{item}</p>);
 * data.length && data.map(item => <p>{item}</p>);
 *
 * // Верные
 * data.length > 0 && data.map(item => <p>{item}</p>);
 * !data.length && <p></p>;
 * data?.length > 0 && data.map(item => <p>{item}</p>);
 */
export const noJsxArrayChainingAccess = {
    meta: { schema: [] },
    create: (context) => {
        return {
            JSXExpressionContainer: (node) => {
                if (shouldReportLengthUsage(node)) {
                    context.report({
                        node: node.expression.left,
                        message: 'Запрещено использовать Array.length && или Array?.length в JSX',
                    });
                }
            },
        };
    },
};
//# sourceMappingURL=no-jsx-chaining-array-length.js.map