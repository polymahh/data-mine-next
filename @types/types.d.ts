export type DataSource = {
        notionId:string,
        name:string,
        categories:string[],
        isDynamic:boolean,
        status:stirng,
        description:string,
        documentationUrl:string,
        apiUrl:string,
        relatedApps:string,
        dataObjectsNames:string,
        dataObjects:[{id:string}],

}

export type Category = {
    name:string,
    items:DataSource[],
}
export type Attribute = {
    attributeName:string,
    attributeDescription:string,
    ObjectsUsingThis:[{id:string}],

}