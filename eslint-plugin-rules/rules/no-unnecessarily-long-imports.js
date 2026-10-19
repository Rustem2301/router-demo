import isRegExp from 'lodash/isRegExp.js';
const isInvalidPath = (observedPaths, path) => {
    if (!path) {
        return false;
    }
    const cleanPath = path.replace(/^'|'$/gm, '');
    const strList = [];
    const regList = [];
    observedPaths.allowedVariants.forEach((value) => isRegExp(value) ? regList.push(value) : strList.push(value));
    const isFound = cleanPath.includes(observedPaths.pathContains);
    const isContains = strList.includes(cleanPath);
    const isMatch = regList.some((reg) => reg.test(cleanPath));
    const isMatches = isMatch || isContains;
    if (!isFound) {
        return false;
    }
    if (isFound && !isMatches) {
        return true;
    }
    return !(isFound && isMatches);
};
/**
 * Запрещается прямой импорт UI компонентов. Импорт должен соответствовать одному из допустимых вариантов.
 *
 * @example
 * // Ошибочный вариант
 * import { UiCard } from '@vkph/ui/components/card/UiCard';
 * import { useSpace } from '@vkph/ui/hooks/useSpace
 *
 * // Верный вариант
 * import { UiCard, useSpace } from '@vkph/ui';
 *
 * // Пример использования правила
 * '@vkph/rules/no-unnecessarily-long-imports': ['error', {
 *   observedPaths: [
 *     {
 *       pathContains: '@vkph/modules',
 *       allowedVariants: ['@vkph/modules', '@vkph/modules/types', '@vkph/modules/store'],
 *     },
 *     {
 *       pathContains: '@vkph/ui',
 *       allowedVariants: ['@vkph/ui', '@vkph/ui/hooks', '@vkph/ui/utils', /@vkph\/ui\/svg\/(.*)\.svg/],
 *     },
 *   ],
 * }];
 *
 * pathContains — строка, содержащая путь, по которому будет проверяться импорт
 * allowedVariants — список допустимых вариантов импорта, поддерживаются регулярные выражения
 */
export const noUnnecessarilyLongImports = {
    meta: {
        schema: [
            {
                type: 'object',
                properties: {
                    observedPaths: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                pathContains: {
                                    type: 'string',
                                },
                                allowedVariants: {
                                    type: 'array',
                                },
                            },
                            required: ['pathContains', 'allowedVariants'],
                        },
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create: (context) => {
        const { observedPaths } = context.options[0];
        return {
            ImportDeclaration: (node) => {
                let validPaths = [];
                const isFound = observedPaths.some((observedPath) => {
                    const isInvalid = isInvalidPath(observedPath, node.source.raw);
                    if (isInvalid) {
                        validPaths = observedPath.allowedVariants;
                    }
                    return isInvalid;
                });
                if (isFound) {
                    context.report({
                        message: `Данный путь запрещён, используйте один из допустимых: ${validPaths.join(', ')}`,
                        node,
                    });
                }
            },
        };
    },
};
//# sourceMappingURL=no-unnecessarily-long-imports.js.map