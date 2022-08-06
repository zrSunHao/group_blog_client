import { OptionItem } from "src/@shared/models/paging.model";

export class DomainElet {
    id: string | null = null;
    name: string = '';
    order: number = 1024;
    topics: TopicElet[] = [];
}

export class TopicElet {
    id: string | null = null;
    name: string = '';
    logo: string = '';
    domainId: string = '';
    order: number = 1024;
}

export class ColumnElet {
    id: string | null = null;
    name: string = '';
    logo: string = '';
    intro: string = '';
    topicId: string = '';
    order: number = 1024;
}

export class SequnceM {
    dropGroupId: string = '';
    dragObjectId: string = '';
    dropTargets: OptionItem[] = [];
}