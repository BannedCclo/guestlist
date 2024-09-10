import express from 'express';
import Bot from './bot';

const routes = express.Router();

routes.post('/bot', async (req, res) => {
    try {
      const { arrayMentions } = req.body;
      if (!Array.isArray(arrayMentions)) {
        return res.status(400).send('Parâmetro arrayMentions deve ser um array de strings.');
      }
      const bot = new Bot();
      await bot.wppSender(arrayMentions);
      res.status(200).send('Mensagem enviada com sucesso.');
    } catch (error) {
      console.error('Erro ao enviar a mensagem:', error);
      res.status(500).send('Erro ao enviar a mensagem.');
    }
  });
  
  export default routes;