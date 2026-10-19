import { noDangerousOptionalChaining } from './rules/no-dangerous-optional-chaining.js';
import { noDestructuringReactProps } from './rules/no-destructuring-react-props.js';
import { noJsxArrayChainingAccess } from './rules/no-jsx-chaining-array-length.js';
import { noUnnecessarilyLongImports } from './rules/no-unnecessarily-long-imports.js';
import { reactArrayJsxConsistency } from './rules/react-array-jsx-consistency.js';
import { useEffectReturnFunctionOrNothing } from './rules/use-effect-return-function-or-nothing.js';
const plugin = {
    meta: {},
    configs: {},
    rules: {
        'no-dangerous-optional-chaining': noDangerousOptionalChaining,
        'no-destructuring-react-props': noDestructuringReactProps,
        'no-unnecessarily-long-imports': noUnnecessarilyLongImports,
        'no-jsx-chaining-array-length': noJsxArrayChainingAccess,
        'use-effect-return-function-or-nothing': useEffectReturnFunctionOrNothing,
        'react-array-jsx-consistency': reactArrayJsxConsistency,
    },
};
export default plugin;
//# sourceMappingURL=index.js.map