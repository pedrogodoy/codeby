import { Request, Response } from "express";
import * as nodemailer from 'nodemailer'
import axios from 'axios'
import * as fastq from "fastq";
import type { queueAsPromised } from "fastq";

class SendEmailController {
  async create(req: Request, res: Response) {
    const emails = req.body;

    const q: queueAsPromised = fastq.promise(asyncWorker, 1)

    emails.forEach(i => q.push(i).catch((err) => console.error(err)))

    async function asyncWorker(arg): Promise<void> {
      let itemsCount = 0;
      try {
        const response = await axios.get(
          'https://vtexstore.codeby.com.br//api/catalog_system/pub/products/search',
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        )

        itemsCount = response.data.length;
      } catch (error) {
        console.error(error);
      }


      const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "069df5688778ee",
          pass: "30af18ccaf464c"
        },
      });

      const mailOptions = {
        from: '"Example Team" <from@example.com>',
        to: `${arg}`,
        subject: 'Itens restantes na loja',
        text: `Olá, existem ${itemsCount} produtos na loja!`,
        html: `<b>Olá, </b><br> existem ${itemsCount} produtos na loja!`
      };

      transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
    }

    return res.status(200).json({ msg: 'Emails adicionados na fila de envio!' });
  }

}

export { SendEmailController }