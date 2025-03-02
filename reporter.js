import fs from 'node:fs/promises';
import path from 'node:path';
import axios from 'axios';

const BASE_URL = `https://gitlab.com/api/v4`;
const GITLAB_TOKEN = 'glpat-UNntV1eU2Nao8JLcsMui';
const projectId = '64269762';
const mergeRequestId = '2';

if (!BASE_URL || !GITLAB_TOKEN || !projectId || !mergeRequestId) {
    console.log(BASE_URL, GITLAB_TOKEN, projectId, mergeRequestId);
    console.error('Переменные окружения для GitLab не установлены.');
    process.exit(1);
}


const postCommentToMergeRequest = async (message) => {
    const url = `${BASE_URL}/projects/${projectId}/merge_requests/${mergeRequestId}/notes`;
    try {
        const response = await axios.post(
            url,
            { body: message },
            { headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN } }
        );
        if (response.status === 201) {
            console.log('Комментарий успешно добавлен.');
        }
    } catch (error) {
        console.error('Ошибка при отправке комментария:', error.response?.data || error.message);
    }
};

const parseJsonFile = async (filePath='results.json') => {
    try {
        const absolutePath = path.resolve(filePath);
        const fileContent = await fs.readFile(absolutePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Ошибка при чтении файла JSON:', error.message);
        throw error;
    }
};

const generateTestReport = (data, stand="local") => {
    const stats = data.stats || {};

    const passedTests = stats.expected || 0;
    const totalTests = passedTests + (stats.unexpected || 0) + (stats.flaky || 0) + (stats.skipped || 0);
    const failedTests = stats.unexpected || 0;
    const flakyTests = stats.flaky || 0;
    const skippedTests = stats.skipped || 0;

    return `\`\`\`
  ${failedTests ? `Тесты упали на стенде ${stand} 😐` : `Тесты прошли успешно на стенде ${stand} 😊`}
  Всего тестов: ${totalTests}
  ✅ ${passedTests} успешно
  ❌ ${failedTests} провалено
  🚦 ${flakyTests} флаки
  ⏸ ${skippedTests} отключено
  \`\`\``;
};

const sendReport = async () => {
    try {
        const data = await parseJsonFile('results.json');
        const report = generateTestReport(data);
        console.log(report);
        await postCommentToMergeRequest(report);
    } catch (error) {
        console.error('Не удалось отправить отчёт:', error.message);
    }
};

(async () => {
    await sendReport();
})();
