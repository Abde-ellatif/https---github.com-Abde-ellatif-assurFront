export interface CoreMenuItem {
    id: string;
    title: string;
    type: 'collapsible' | 'item';
    url?: string;
    role?: Array<string>;
    icon?: string;
    children?: CoreMenuItem[];
}

export interface CoreMenu {
    children?: CoreMenuItem[];
}