const puppeteer = require('puppeteer');

async(placa, renavam) => {
    //Inicial um browser
    const browser = await puppeteer.launch({
        //define visibilidade (true = invisível, false = visível)
        headless: true,
        //Muta o navegador
        ignoreDefaultArgs: ['--mute-audio'],
        //Desativa pop-ups e sandboxes
        args: ['--disable-notifications', '--no-sandbox', '--disable-setuid-sandbox']
    });
    //inicia uma nova aba no navegador
    const page = await browser.newPage();
    //redireciona para o site de consultas do detran
    await page.goto('http://getran.detran.df.gov.br/site/veiculos/consultas/filtroplacarenavam-consultaveiculo.jsp');
    //aguarda o seletor para iniciar as operações
    await page.waitForSelector('input#PLACA');
    //Digita placa e renavam
    await page.type('input#PLACA', placa);
    await page.type('input#RENAVAM', renavam);
    //clica no otão para consultar
    await page.click('a#CONSULTAR', {
        button: "left"
    });
    //espera um segundo para a página carregar
    await page.waitForTimeout(1000);
    //Aguarda o seletor para o "captcha"
    await page.waitForSelector('label#pergunta');
    

}