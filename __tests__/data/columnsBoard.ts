export enum ColumnsBoard {
    toBeFixed = 'to_be_fixed',
    toReview = 'to_review',
    toPublish = 'to_publish',
    published = 'published',
    draft = 'draft',
}

export const status: Record<ColumnsBoard, string> = {
    [ColumnsBoard.toBeFixed]: 'To Be Fixed',
    [ColumnsBoard.draft]: 'Draft',
    [ColumnsBoard.toPublish]: 'To Publish',
    [ColumnsBoard.toReview]: 'To Review',
    [ColumnsBoard.published]: 'Published',
}
