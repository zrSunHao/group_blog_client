import { DocumentNode, DocumentNodeType } from "./editor.service";


export function GetDocumentData(): DocumentNode[] {
    const nodes: DocumentNode[] = [];

    const h2_1 = new DocumentNode(DocumentNodeType.h2, '中国夏粮实现增产丰收');
    const h2_1_h3_1 = new DocumentNode(DocumentNodeType.h3, '用驴充当斑马？河南一动物园回应');
    const h2_1_h3_2 = new DocumentNode(DocumentNodeType.h3, '阆中起价1.8亿拍卖食堂30年经营权');
    const h2_1_h3_3 = new DocumentNode(DocumentNodeType.h3, '女孩做22页旅游攻略因太热没出酒店');
    const h3_p_1 = new DocumentNode(DocumentNodeType.p, '一是${就业主体人群|color:red;font-weight:bold;}就业${总体稳定|background:green}。25-59岁就业主体人群失业率4月份虽有所升高，但是升幅明显低于总体失业率水平。6月份，25-59岁就业主体人群失业率为4.5%，比上月回落0.6个百分点，接近2021年平均水平。');
    const h3_p_2 = new DocumentNode(DocumentNodeType.p, '二是${农民工群体|color:red}就业形势好转。农民工群体多从事劳动密集型制造业和服务业行业，以个体户和灵活就业的居多，就业稳定性相对较差。受疫情冲击影响，4月份外来农业户籍人口失业率升至6.6%，随着疫情逐步得到控制，助企稳岗措施发力，农民工群体的就业明显改善。5月份外来农业户籍人口失业率降至6.2%，6月份降至5.3%，低于整体失业率水平。');
    const h3_p_3 = new DocumentNode(DocumentNodeType.p, '三是${青年人|color:red}就业压力仍然较大。青年群体初次进入劳动力市场，普遍面临摩擦性失业困境，同时受疫情影响，企业吸纳就业能力下降，年轻人求职渠道在疫情条件下也受到了阻碍。加之今年高校毕业生总量又创历史新高，加剧了青年人就业压力。6月份，16-24岁城镇青年失业率为19.3%，处于今年以来较高水平。');
    const h3_img_1 = new DocumentNode(DocumentNodeType.img, '今日入伏 一年中最热时段来了', 'assets/imgs/bg_4.png', { height: '20rem', position: 'center' });
    //const h3_img_2 = new DocumentNode(DocumentNodeType.img, '', '');
    const h3_table_1 = new DocumentNode(DocumentNodeType.table, '姓名|职位|事项\n唐玄奘|组长|西天取经\n孙悟空|干事|降妖除魔\n猪八戒|斥候|牵马\n沙僧|下手|挑担子', '', { position: 'center' });
    h2_1_h3_1.children.push(h3_p_1);
    h2_1_h3_1.children.push(h3_img_1);
    h2_1_h3_2.children.push(h3_p_2);
    //h2_1_h3_2.children.push(h3_img_2);
    h2_1_h3_3.children.push(h3_p_3);
    h2_1_h3_3.children.push(h3_table_1);
    h2_1.children.push(h2_1_h3_1);
    h2_1.children.push(h2_1_h3_2);
    h2_1.children.push(h2_1_h3_3);

    const h2_2 = new DocumentNode(DocumentNodeType.h2, '上海二季度GDP同比下降13.7%');
    const h2_2_list = new DocumentNode(DocumentNodeType.list, '在 XAML 和 C# 中从 Visual Studio 中的单个共享代码库编写跨平台应用。\n跨平台共享 UI 布局和设计。\n跨平台共享代码、测试和业务逻辑。');
    const h2_2_code = new DocumentNode(DocumentNodeType.code, '[XamlCompilation (XamlCompilationOptions.Compile)]\npublic partial class MyPage : ContentPage\n{\n     ...\n}');
    const h2_2_quote = new DocumentNode(DocumentNodeType.quote, '《百度》|https://www.baidu.com/\n《哔哩哔哩》|https://www.bilibili.com/\n《ttttt》');
    const h2_2_link = new DocumentNode(DocumentNodeType.link, '百度|https://www.baidu.com/\n哔哩哔哩|https://www.bilibili.com/');
    h2_2.children.push(h2_2_list);
    h2_2.children.push(h2_2_code);
    h2_2.children.push(h2_2_quote);
    h2_2.children.push(h2_2_link);

    const h2_3 = new DocumentNode(DocumentNodeType.h2, '活虾从菜场拎到家被“热熟”');
    const h3_file_1 = new DocumentNode(DocumentNodeType.file, 'bg_4.png', 'http://localhost:4200/assets/imgs/bg_4.png');
    //const h3_file_2 = new DocumentNode(DocumentNodeType.file, '', '');
    const h3_audio_1 = new DocumentNode(DocumentNodeType.audio, '为得一人心.mp3', 'assets/files/song.mp3');
    //const h3_audio_2 = new DocumentNode(DocumentNodeType.audio, '', '');
    const h3_video_1 = new DocumentNode(DocumentNodeType.video, 'PrettBoy.mp4', 'assets/files/PrettBoy.mp4');
    //const h3_video_2 = new DocumentNode(DocumentNodeType.video, '', '');
    h2_3.children.push(h3_file_1);
    //h2_3.children.push(h3_file_2);
    h2_3.children.push(h3_audio_1);
    //h2_3.children.push(h3_audio_2);
    h2_3.children.push(h3_video_1);
    //h2_3.children.push(h3_video_2);

    nodes.push(h2_1);
    nodes.push(h2_2);
    nodes.push(h2_3);
    return nodes;
}

export const DOCUMENT_DATA: DocumentNode[] = [
];