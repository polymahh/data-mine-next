export type DataSource = {
    notionId:string,
        name:string,
        categories:string[],
        isDynamic:boolean,
        status:stirng,
        description:string,
        documentationUrl:string,
        apiUrl:string,
        relatedApps:string
}

export type Category = {
    name:string,
    items:DataSource[],
}