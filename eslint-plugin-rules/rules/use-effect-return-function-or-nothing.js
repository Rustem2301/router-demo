const isInvalidEffect = (node) => {
    const isUseEffect = node?.expression?.callee?.name === 'useEffect';
    const contents = node?.expression?.arguments?.[0]?.body?.body || [];
    if (!Array.isArray(contents)) {
        return false;
    }
    const returnContent = contents.find((item) => item.type === 'ReturnStatement');
    if (!isUseEffect) {
        return false;
    }
    if (isUseEffect && !returnContent) {
        return false;
    }
    return !(isUseEffect && returnContent?.argument?.type === 'ArrowFunctionExpression');
};
/**
 * Возвращаемый вызов обратной функции в "useEffect" должен быть явным
 *
 * @example
 *
 * // Верный вариант
 * useEffect(() => {
 *   const connection = createConnection(serverUrl, roomId);
 *   connection.connect();
 *
 *   return () => connection.disconnect();
 * }, [serverUrl, roomId]);
 *
 *
 *
 * // Ошибочный вариант
 * useEffect(() => {
 *   const connection = createConnection(serverUrl, roomId);
 *   connection.connect();
 *
 *   return connection.disconnect
 * }, [serverUrl, roomId]);
 */
export const useEffectReturnFunctionOrNothing = {
    meta: { schema: [] },
    create: (context) => {
        return {
            ExpressionStatement: (node) => {
                if (isInvalidEffect(node)) {
                    context.report({
                        message: `Возвращаемый вызов обратной функции в "useEffect" должен быть явным:
            ✅ Верно: return () => fn();
            ❌ Не верно: return fn;
            `,
                        node,
                    });
                }
            },
        };
    },
};
//# sourceMappingURL=use-effect-return-function-or-nothing.js.map