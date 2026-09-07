class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }

    async shortenUrl(req,res) {
        const url = req.body.url;


        const shortCode = await this.urlService.createShortUrl(url);
         console.log(`http://localhost:5000/${shortCode}`); 
     
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

    async getHits(req, res) {
        const { shortCode } = req.params;

        const result = await this.urlService.getHits(shortCode);

        if (!result) {
            return res.status(404).json({
                error: 'URL não encontrada'
            });
        }

        res.json(result);
    }
}

module.exports = UrlController;
