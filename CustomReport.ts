import {Reporter} from "@playwright/test/reporter";
import * as fs from "node:fs";
import * as path from "node:path";
import {fileURLToPath} from 'url';
import {TestCase, TestResult, TestStep} from "playwright/types/testReporter";

// Определение __dirname для ES-модулей
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export interface IReportStep {
    stepName: string,
    usageCount: number,
    avgDuration?: number,
    maxDuration: number,
    totalDuration: number
}

class StepDurationReporter implements Reporter {
    private readonly stepStats: Record<string, IReportStep>

    constructor() {
        this.stepStats = {};
    }

    findLastStep(steps, path = []) {
        return steps
            .filter(step => step.category === 'test.step') // Фильтруем только test.step
            .reduce((last, step) => {
                const newPath = [...path, step.title]; // Формируем путь

                if (step.steps && step.steps.length > 0) {
                    const nestedLastStep = this.findLastStep(step.steps, newPath); // Рекурсивный вызов
                    return nestedLastStep || last; // Если вложенные шаги дали результат, возвращаем его
                }

                return newPath; // Если шаг конечный, обновляем его
            }, null) || path; // Если reduce ничего не вернул, возвращаем текущий путь
    }



    async onTestEnd(test:TestCase, result:TestResult) {
        console.error('Упали на шаге ' + this.findLastStep(result.steps).join('->'))
    }

    async onStepEnd(test: TestCase, _: TestResult, step: TestStep) {
        if (step.category !== 'test.step') return
        // console.log(step.category, step.title)
        const stepDuration = step.duration;
        const stepKey = `${step.title}`;

        if (!this.stepStats[stepKey]) {
            this.stepStats[stepKey] = {
                stepName: step.title,
                usageCount: 0,
                totalDuration: 0,
                maxDuration: 0,
            };
        }

        const stats = this.stepStats[stepKey];
        stats.usageCount++;
        stats.totalDuration += stepDuration;
        stats.maxDuration = Math.max(stats.maxDuration, stepDuration);
    }

    async onEnd() {
        // Вычисляем среднее время выполнения для каждого шага
        const report = Object.values(this.stepStats).map(stats => ({
            stepName: stats.stepName,
            usageCount: stats.usageCount,
            avgDuration: Math.round(stats.totalDuration / stats.usageCount),
            maxDuration: stats.maxDuration,
        }));

        const outputPath = path.resolve(__dirname, 'step-aggregated-report.json');
        fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
        console.log(`Тестирование завершено. Отчет сохранен: ${outputPath}`);
    }
}

export default StepDurationReporter;
