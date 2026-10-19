const isDestructuring = (node) => {
    const fcTypeName = node?.id?.typeAnnotation?.typeAnnotation?.typeName;
    const isFC = fcTypeName?.name === 'FC';
    const isReactFC = fcTypeName?.right?.name === 'FC';
    const initParams = node?.init?.params;
    const isDestruct = Array.isArray(initParams) && Array.isArray(initParams?.[0]?.properties);
    return (isFC || isReactFC) && isDestruct;
};
/**
 * Запрещает деструктуризацию FC параметров не в теле функции
 *
 * @example
 * // Ошибочный вариант
 * const ComponentName: FC<Props> = ({ id, onClose, onSuccessPlanning }) => { // other code }
 *
 * // Верный вариант
 * const ComponentName: FC<Props> = (props) => {
 * const { id, onClose, onSuccessPlanning } = props;
 *
 * // other code
 * }
 */
export const noDestructuringReactProps = {
    meta: { schema: [] },
    create: (context) => {
        return {
            VariableDeclarator: (node) => {
                if (isDestructuring(node)) {
                    context.report({
                        message: 'Запрещена деструктуризация FC параметров не в теле функции',
                        node,
                    });
                }
            },
        };
    },
};
//# sourceMappingURL=no-destructuring-react-props.js.map