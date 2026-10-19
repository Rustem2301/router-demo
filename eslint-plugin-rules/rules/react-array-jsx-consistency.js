const DEPTH_DEFAULT = 10;
const ARRAY_METHOD_NAMES = [
    'map',
    'filter',
    'reduce',
    'forEach',
    'some',
    'every',
    'find',
    'findIndex',
    'reduceRight',
    'flatMap',
];
const isNullUndefinedNode = (node) => {
    if (!node)
        return false;
    return ((node.type === 'Literal' && node.value === null) ||
        (node.type === 'Identifier' && node.name === 'undefined'));
};
const isJSXNode = (node) => {
    return Boolean(node && (node.type === 'JSXElement' || node.type === 'JSXFragment'));
};
const collectReturnNodes = (node, depthLimit) => {
    const depth = 0;
    const nodes = [];
    const exploreNode = (currentNode, currentDepth) => {
        const isType = (types) => {
            return types.some((type) => currentNode.type === type);
        };
        if (!currentNode || currentDepth > depthLimit)
            return;
        const explore = (childNode) => {
            exploreNode(childNode, currentDepth + 1);
        };
        if (isType(['ReturnStatement']) && currentNode.argument) {
            nodes.push(currentNode.argument);
            explore(currentNode.argument);
        }
        if (isType(['BlockStatement']) && Array.isArray(currentNode.body)) {
            currentNode.body.forEach((item) => explore(item));
        }
        if (isType(['IfStatement']) && currentNode.consequent) {
            explore(currentNode.consequent);
        }
        if (isType(['IfStatement']) && currentNode.alternate) {
            explore(currentNode.alternate);
        }
        if (isType(['ConditionalExpression']) && currentNode.consequent) {
            explore(currentNode.consequent);
        }
        if (isType(['ConditionalExpression']) && currentNode.alternate) {
            explore(currentNode.alternate);
        }
        if (isType(['ArrowFunctionExpression', 'FunctionExpression']) && currentNode.body) {
            Array.isArray(currentNode.body)
                ? currentNode.body.forEach((item) => explore(item))
                : explore(currentNode.body);
        }
    };
    exploreNode(node, depth);
    return nodes;
};
/**
 * Если хоть один возвращаемый элемент является JSX, то все возвраты в "map" должны быть элементами JSX
 *
 * @example
 * ✅ Верно:
   const elements = array.map((item) => {
     if (item?.type === "a") {
       return <Fragment key={item.id}>{item.component}</Fragment>;
     }
 
     return <Fragment key={item.id}>{item}</Fragment>;
   });
   ❌ Неверно:
   const elements = array.map((item) => {
     if (item?.type === "a") {
       return <Fragment key={item.id}>{item.component}</Fragment>;
     }
 
     return item;
   });
 */
export const reactArrayJsxConsistency = {
    meta: {
        schema: [
            {
                type: 'object',
                properties: {
                    depth: {
                        type: 'number',
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create: (context) => {
        const depth = context.options[0]?.depth || DEPTH_DEFAULT;
        return {
            CallExpression(node) {
                const callee = node.callee;
                const isArrayMethodCall = callee.type === 'MemberExpression' &&
                    callee.property?.type === 'Identifier' &&
                    ARRAY_METHOD_NAMES.includes(callee.property?.name);
                if (!isArrayMethodCall)
                    return;
                const [callback] = node.arguments;
                if (!callback || !['ArrowFunctionExpression', 'FunctionExpression'].includes(callback.type)) {
                    return;
                }
                const returnNodes = collectReturnNodes(callback, depth);
                if (!returnNodes.some(isJSXNode))
                    return;
                returnNodes.forEach((retNode) => {
                    const isValid = isJSXNode(retNode) || isNullUndefinedNode(retNode);
                    if (!isValid) {
                        context.report({
                            node: retNode,
                            message: 'Если хоть один элемент массива возвращается как JSX, то все остальные так же должны быть JSX',
                        });
                    }
                });
            },
        };
    },
};
//# sourceMappingURL=react-array-jsx-consistency.js.map