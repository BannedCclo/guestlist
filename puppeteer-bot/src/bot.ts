import puppeteer from "puppeteer";

export default class Bot{
async wppSender(arrayMentions: string[]): Promise<void> {
  // Função para criar um atraso
  function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Lançar o navegador com Puppeteer
  const browser = await puppeteer.launch({ headless: false ,
    userDataDir: "C:/Users/cecel/AppData/Local/Google/Chrome/User Data/",
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
  });
  const page = await browser.newPage();

  // Acessar o WhatsApp Web
  await page.goto("https://web.whatsapp.com");

  // Instrução para aguardar o usuário fazer login
  console.log(
    "Por favor, escaneie o código QR para fazer login no WhatsApp Web."
  );

  // Esperar que o WhatsApp Web seja carregado e que o QR Code desapareça
  await page.waitForSelector('div[contenteditable="true"]', { timeout: 60000 }); // Espera até 60 segundos

  // Encontrar a conversa com a pessoa ou grupo desejado
  //const contactName = "18 do brabo 😈😈"; // Substitua pelo nome do contato ou grupo
  const contactName = "18 do brabo 😈😈";
  await page.click(`span[title='${contactName}']`);

  // Aguardar a abertura da conversa
  await page.waitForSelector('div[contenteditable="true"][tabindex="10"]', {
    timeout: 10000,
  });

  // Simular a digitação de uma mensagem
  const mentions = arrayMentions;
  const [input] = await page.$$('div[contenteditable="true"][tabindex="10"]'); // Encontra o campo de entrada
  if (input) {
    await input.focus();
    await wait(500);
    for (const mention of mentions) {
      const treatedMention = mention.slice(0, 5);
      await page.type(
        'div[contenteditable="true"][tabindex="10"]',
        treatedMention
      );
      await wait(100);
      await page.keyboard.press("Enter");
    }

    await page.keyboard.down("Shift");
    await page.keyboard.press("Enter"); // '2' no teclado
    await page.keyboard.press("Enter"); 
    await page.keyboard.up("Shift");

    await page.type(
      'div[contenteditable="true"][tabindex="10"]',
      "Só lembrando, quem não confirmou, confirma por favor! Tenho até o dia 28/09 pra fechar a lista de convidados!"
    );
    //await page.type('div[contenteditable="true"][tabindex="10"]', message);

    // Aguardar 1 segundo para garantir que a mensagem seja digitada completamente
    await wait(1000);

    // Enviar a mensagem (pressionar Enter)
    //await page.keyboard.press("Enter");

    console.log(`Mensagem enviada para ${contactName}`);
  } else {
    console.error("Não foi possível encontrar o campo de entrada de mensagem.");
  }

  // Aguardar 5 segundos antes de fechar o navegador, para verificar se a mensagem foi enviada
  //await wait(5000);

  // Fechar o navegador após o envio
  //await browser.close();
};

}