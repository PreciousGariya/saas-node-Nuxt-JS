import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { maildata } from "../utils/EnvData";


class EmailSender {
    private transporter: nodemailer.Transporter;

    constructor() {
        // this.transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'your_email@gmail.com',
        //         pass: 'your_email_password',
        //     },
        // });
        this.transporter = nodemailer.createTransport({
            host: maildata.host,
            port: maildata.port,
            auth: {
              user: maildata.user,
              pass: maildata.pass,
            },
          });

    }

    private async sendHtmlEmail(to: string, subject: string, htmlContent: string): Promise<boolean> {
        try {
            const info = await this.transporter.sendMail({
                from: 'no-reply@serpcrunch.io',
                to,
                subject,
                html: htmlContent,
            });

            console.log('HTML email sent: ', info.messageId);
            return true;
        } catch (error) {
            console.error('Error sending HTML email: ', error);
            return false;
        }
    }

    public async sendMail(
        to: string,
        subject: string,
        data: object,
        template: string): Promise<boolean> {

        try {
            const templatePath = path.join(__dirname, '..', 'emails', `${template}.hbs`);
            const templateContent = fs.readFileSync(templatePath, 'utf-8');
            // Compile the handlebars template
            const compiledTemplate = handlebars.compile(templateContent);
            // Use the compiled template to render dynamic content
            const htmlContent = compiledTemplate(data);
            // Send HTML email with dynamic data
            await this.sendHtmlEmail(to, subject, htmlContent);

            return true;
        } catch (error) {
            console.error('Error sending verification code: ', error);
            return false;
        }
    }
}

export default EmailSender;
