import pgPromise, {IDatabase, IMain} from "pg-promise";

export interface IPostgresSQLStore {
    db: IDatabase<any>;
    pgp: IMain;
}

export const createPGStore = (
    user: string,
    password: string,
    host: string,
    port: string,
    dbName: string,
    defaultSchema: string = 'urlshortener',
): IPostgresSQLStore => {
    const connString = 
    `postgres://${user}:` +
    `${password}@` +
    `${host}:` +
    `${port}/` +
    `${dbName}`;

    const options = {
        schema: defaultSchema,
    }
    const pgp: IMain = pgPromise(options);
    const db: IDatabase<any> = pgp(connString); 

    return {db, pgp};
};