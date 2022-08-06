export class ResponseResult<T>{
    data: T | null = null;
    statusCode: number | null = null;
    messages: Array<string> = [];
    success: boolean = false;
    allMessages: string = '';
}

export class ResponsePagingResult<T> {
    data: Array<T> = [];
    statusCode: number | null = null;
    messages: Array<string> = [];
    success: boolean = false;
    allMessages: string = '';
    rowsCount: number = 0;
}

export class PagingParameter<T>{
    pageIndex: number = 0;
    pageSize: number = 10;
    filter: T | null = null;
    sort: 'desc' | 'asc' = 'desc';
    sortColumn: string = 'default'
}

export class ResetDto{
    userName:string = '';
    newPsd:string = '';
    oldPsd:string = '';
}

export interface OptionItem {
    key: string | number;
    value: string;
}

export enum RoleType {
    odinary = 1,
    manager = 10,
    superManager = 100,
    other = -1
}
