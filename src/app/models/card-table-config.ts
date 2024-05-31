export interface CardTableConfig {
    dataSource: {
        key: string;
        title: string;
        subTitle: string;
        status?: string;
        props?: string[]
    };
}
