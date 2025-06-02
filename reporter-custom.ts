import { Reporter, TestCase, TestResult, FullResult, FullConfig, Suite } from "@playwright/test/reporter";

export default class MyReporter implements Reporter {
    private introMessage = "";
    private failsMessage = "";
    private passed = 0;
    private failed = 0;
    private skipped = 0;

    onBegin(config: FullConfig, suite: Suite) {
        this.introMessage = `- Общее количество тестов: ${suite.allTests().length}`;
    }

    onTestEnd(test: TestCase, result: TestResult) {
        switch (result.status) {
            case "failed":
            case "timedOut":
                this.addFailMessage(`❌ ${test.title} failed\n> ${result.error?.message || "Unknown error"}`);
                this.failed++;
                break;
            case "skipped":
                this.addFailMessage(`⚠️ ${test.title} skipped`);
                this.skipped++;
                break;
            case "passed":
                this.passed++;
                break;
        }
    }

    async onEnd(result: FullResult) {
        const message = this.buildMessage();
        console.log(message);
        // метод отправки в телеграмм/слак/матермост
    }

    private addFailMessage(message: string) {
        this.failsMessage += `\n${message}`;
    }

    private buildMessage(): string {
        const summary = `
        📦 **Результаты прогона тестов**:
        - ✅ Успешно пройдено: ${this.passed}
        - ❌ Провалено: ${this.failed}
        - ⏩ Пропущено: ${this.skipped}
    `.trim();

        const failureDetails = this.failsMessage
            ? `\n### ❌ Проваленные тесты\n${this.failsMessage}`
            : "\n👍 Все тесты успешно пройдены!";

        return `
            ---
            ${this.introMessage}
            ---
            ${summary}
    `.trim().replace(/ {4}/g, '');
    }

}

