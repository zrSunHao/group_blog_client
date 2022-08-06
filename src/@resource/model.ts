import { OptionItem } from "src/@shared/models/paging.model";

export enum FileCategory {
    note_profile = 1,
    note_img = 2,
    note_file = 3,
    note_audio = 4,
    note_vedio = 5
}

export class ResourceFilter {
    fileName: string = '';
    type: string = '';
    category: FileCategory | undefined;
    startAt: Date | undefined;
    endAt: Date | undefined;
}

export class ResourceElet {
    code: string = '';
    name: string = '';
    fileName: string = '';
    type: string = '';
    category: FileCategory | undefined;
    size: number = 0;
    createdAt: Date = new Date();
}

export const RESOURCE_DATA: ResourceElet[] = [
    { code: '1', fileName: '1.bmp', name: '新建位图图像.bmp', type: 'BMP 文件', category: FileCategory.note_profile, size: 100000000, createdAt: new Date() },
    { code: '2', fileName: '2.vsdx', name: '总体布局 (大通).vsdx', type: 'Microsoft Visio Drawing', category: FileCategory.note_file, size: 1000000, createdAt: new Date() },
    { code: '3', fileName: '3.jpeg', name: '123.jpeg', type: 'JPEG 文件', category: FileCategory.note_img, size: 10000000000, createdAt: new Date() },
    { code: '4', fileName: '4.mp3', name: '愿得一人心 钢琴版.mp3', type: 'MP3 - Audio File', category: FileCategory.note_audio, size: 1000000, createdAt: new Date() },
    { code: '5', fileName: '5.mp4', name: '6min 每日快速拉伸.mp4', type: 'MP4 - MPEG-4 ', category: FileCategory.note_vedio, size: 1000000, createdAt: new Date() },
];

export const CategoryOps: OptionItem[] = [
    { key: FileCategory.note_profile, value: '笔记封面' },
    { key: FileCategory.note_img, value: '笔记元素-图片' },
    { key: FileCategory.note_file, value: '笔记元素-文件' },
    { key: FileCategory.note_audio, value: '笔记元素-音频' },
    { key: FileCategory.note_vedio, value: '笔记元素-视频' },
];