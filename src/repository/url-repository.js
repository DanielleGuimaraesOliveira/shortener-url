class UrlRepository { 
    constructor(database) {
        this.database = database;
    }
    
    async exists(shortCode){
        const result = await this.database.query(
            `SELECT *
            FROM urls
            WHERE short_code = $1`, [shortCode]
        )

        return result.rows[0] || null;
    }

    async create(url, shortCode){
        const result = await this.database.query(
            `INSERT INTO urls (original_url, short_code)
             VALUES ($1,$2)
             RETURNING *`, [url, shortCode]
        );

        return result.rows[0];
    }
    
    async findByShortCode(shortCode){
        const result = await this.database.query(
            `SELECT *
            FROM urls
            WHERE short_code = $1`, [shortCode]
        );

        return result.rows[0] || null;
    }

    async incrementHits(shortCode){
        const result = await this.database.query(
            `UPDATE urls
            SET hits = hits + 1
            WHERE short_code = $1`, [shortCode]
        );
        
    }
}

module.exports = UrlRepository;