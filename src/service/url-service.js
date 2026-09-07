class UrlService { 
    constructor(urlRepository) { this.urlRepository = urlRepository;}

    async createShortUrl(url){
        let code;

        do{
            code = this.generateCode();
        } while (await this.urlRepository.exists(code));

        await this.urlRepository.create(url, code);

        return code;
    }

    async redirect(shortCode){
        const url = await this.urlRepository.findByShortCode(shortCode);

        if(!url){
            return null;
        }
        
        await this.urlRepository.incrementHits(shortCode);

        return url.original_url;
    }

    async getHits(shortCode) {
        const url = await this.urlRepository.getHits(shortCode);

        if (!url) {
            return null;
        }

        return {
            shortCode: url.short_code,
            originalUrl: url.original_url,
            hits: url.hits,
            createdAt: url.created_at
        };
    }

    generateCode(){
       const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let code = '';

        for (let i = 0; i < 6; i++) {
            const index = Math.floor(Math.random() * characters.length);
            code += characters[index];
        }

        return code;
    }
}

module.exports = UrlService;