import { IPostgresSQLStore } from "../config/dbConfig";
import { IDatabase, IMain } from "pg-promise";
import { URLObj } from "../interfaces/urlInterface";


export default class Url {
    store: IDatabase<any>;
    pgp: IMain;
    context: any;

    constructor(store: IPostgresSQLStore) {
        this.store = store.db;
        this.pgp = store.pgp;
    }

    initialize(config: any){
        this.context = config;
    }

    async findUrl(longUrl: string): Promise<string> {
        return this.store.one(
            `
            SELECT short_url FROM url_store
            WHERE long_url = $1
            `,
            [longUrl]
        )
    }

    async findByCode(code: string): Promise<string> {
        return this.store.one(
            `
            SELECT long_url FROM url_store
            WHERE url_code = $1
            `,
            [code]
        )
    }

    async saveUrl(urlObj: URLObj) {
        const { longUrl, shortUrl, urlCode, date } = urlObj;
        const urlFound = await this.store.any(
            `
            INSERT INTO url_store(long_url, short_url, url_code, date)
            VALUES ($1, $2, $3, $4)
            `,
            [longUrl, shortUrl, urlCode, date]
        )
    }
    
}

