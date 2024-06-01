import {BasePage} from "../base/base.page";
import {expect, Page} from "@playwright/test";
import {urls} from "../../data/urls";
import {Filter} from "./components/Filters";
import {NoticeMessagesComponent} from "../../components/noticeMessages.component";
import {ColumnsBoard} from "../../data/columnsBoard";
import {Cards} from "./components/Cards";

export class BoardPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }
    url = urls.tasks.board;
    filter = new Filter(this.page);
    messages = new NoticeMessagesComponent(this.page);
    listCard = this.page.locator('[data-rfd-draggable-context-id]');
    columnStatus = {
        [ColumnsBoard.toBeFixed]: this.page.locator('[data-rfd-droppable-id="to_be_fixed"]'),
        [ColumnsBoard.toReview]:  this.page.locator('[data-rfd-droppable-id="to_review"]'),
        [ColumnsBoard.toPublish]: this.page.locator('[data-rfd-droppable-id="to_publish"]'),
        [ColumnsBoard.published]: this.page.locator('[data-rfd-droppable-id="published"]'),
        [ColumnsBoard.draft]: this.page.locator('[data-rfd-droppable-id="draft"]')
    }

    async assertCardByTitles(titles: string[]) {
        await expect(this.listCard).toHaveCount(titles.length);
        for (const title of titles) {
            await expect(this.listCard.filter({hasText: title})).toBeVisible();
        }
    }

    async dragAndDrop(titleTask: string, targetStatus: ColumnsBoard){
        const card = Cards.getCardByTitle(titleTask, this.page);
        // Получаем положение элементов
        const sourceBoundingBox = await card.getLocator().boundingBox();
        const targetBoundingBox = await this.columnStatus[targetStatus].boundingBox();

        // Вычисляем  координаты
        const targetX = targetBoundingBox.x - targetBoundingBox.width;
        const targetY = targetBoundingBox.y;

        await this.page.mouse.move(sourceBoundingBox.x+sourceBoundingBox.width/4, sourceBoundingBox.y+sourceBoundingBox.height/4);
        await this.page.mouse.down();
        await this.page.mouse.move(1, 1);
        await this.page.mouse.move(targetX, targetY);
        await this.page.mouse.up();
    }

}
