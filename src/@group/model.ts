import { RoleType } from "src/@shared/models/paging.model";

export class UserFilter {
    userName: string = '';
    role: RoleType | null = null;
    limited: boolean | null = null;
    startAt: Date | null = null;
    endAt: Date | null = null;
}

export class UserElet {
    id: string = '';
    userName: string = '';
    role: RoleType = RoleType.other;
    limited: boolean | null = null;
    lastLoginAt: Date = new Date();
    remark: string = '';
}

export const USER_DATA: UserElet[] = [
    { id: '1', userName: 'zhangsan', role: RoleType.odinary, limited: false, remark: '', lastLoginAt: new Date() },
    { id: '2', userName: 'lisi', role: RoleType.odinary, limited: false, remark: '', lastLoginAt: new Date() },
    { id: '3', userName: 'wangwu', role: RoleType.manager, limited: true, remark: '', lastLoginAt: new Date() },
    { id: '4', userName: 'zhaoliu', role: RoleType.odinary, limited: false, remark: '', lastLoginAt: new Date() },
    { id: '5', userName: 'sunwukong', role: RoleType.manager, limited: false, remark: '', lastLoginAt: new Date() },
]
