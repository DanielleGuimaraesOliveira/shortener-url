class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }

    async shortenUrl(req,res) {
        const url = req.body.url;

        console.log('mandando para o service...');

        const shortCode = await this.urlService.createShortUrl(url);

        console.log('retornou do service');
        res.status(201).json({
            shortUrl: `http://localhost:5000/${shortCode}`
        });
    }

    async redirect(req,res){
        const {shortCode} = req.params;
        const url = await this.urlService.redirect(shortCode);

       if (!url) {
            return res.status(404).json({
                message: 'URL não encontrada'
            });
        }

        res.redirect(302, url);

    }
}

module.exports = UrlController;
