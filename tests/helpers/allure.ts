import {test} from "@playwright/test";

const Step =
    (test: any) =>
        (stepNameTemplate: string) =>
            <Fn, Args extends never[]>(
                target: (this: Fn, ...args: Args) => Promise<Fn>,
                // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
                context: any,
            ) => {
                async function replacementMethod(this: Fn, ...args: Args): Promise<Fn> {
                    const stringArgs = args.map(arg => {
                        if (typeof arg === 'object') return JSON.stringify(arg);

                        return arg;
                    });
                    const fullNameStep = getFullNameStep(stepNameTemplate, stringArgs);

                    return test.step(fullNameStep, async () => target.call(this, ...args), {box: true});
                }

                return replacementMethod;
            };

const getFullNameStep = (stepNameTemplate: string, args: string[]) => {
    const countInsertArgumentsInStep = stepNameTemplate.match(/(\$\d+)|(\$)/g);
    if (countInsertArgumentsInStep) {
        return countInsertArgumentsInStep.reduce((acc, el) => {
            if (el === '$') return acc.replace('$', args[0]);
            const numArgs = Number(el.replace('$', ''));
            acc = acc.replace(el, args[numArgs]);

            return acc;
        }, stepNameTemplate);
    }

    return stepNameTemplate;
};

export const step = Step(test);
