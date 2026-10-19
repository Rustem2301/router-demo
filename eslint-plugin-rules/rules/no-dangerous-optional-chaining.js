const isExpressionTree = (expression) => {
    const isObjectTree = expression?.object &&
        expression?.object?.type !== 'Identifier' &&
        expression?.object?.type !== 'TSAsExpression';
    const isCalleeTree = expression?.callee &&
        expression?.callee?.type !== 'Identifier' &&
        expression?.callee?.type !== 'TSAsExpression';
    return Boolean(isObjectTree || isCalleeTree);
};
const isNotOptionals = (expression) => {
    const isTree = isExpressionTree(expression);
    const isOptionalNegative = expression?.optional === false;
    if (isOptionalNegative && isTree) {
        return isNotOptionals(expression?.object || expression?.callee);
    }
    if (!isOptionalNegative && !isTree) {
        return false;
    }
    return isOptionalNegative && !isTree;
};
const isSafeOptionals = (expression, expected = true) => {
    const isTree = isExpressionTree(expression);
    const isOptional = Boolean(expression?.callee) || expression?.optional === expected;
    const expr = expression?.object || expression?.callee;
    if (isOptional && isTree) {
        return isSafeOptionals(expr, expected);
    }
    if (!isOptional && isTree) {
        return isNotOptionals(expr);
    }
    return true;
};
/**
 * Запрещает к использованию опасные конструкции с OptionalChaining
 *
 * @example
 * // Ошибочные
 * data?.recursions.recursions;
 * data?.recursions.recursionsCallback();
 * data?.recursions.recursionsCallback?.();
 *
 * // Верные
 * data?.recursions?.recursions;
 * data?.recursions?.recursionsCallback?.();
 */
export const noDangerousOptionalChaining = {
    meta: { schema: [] },
    create: (context) => {
        return {
            ChainExpression: (node) => {
                if (!isSafeOptionals(node?.expression)) {
                    context.report({
                        message: 'Запрещено использовать опасные (не полные) optionals chaining',
                        node,
                    });
                }
            },
        };
    },
};
//# sourceMappingURL=no-dangerous-optional-chaining.js.map