import { GoogleSpreadsheet } from 'google-spreadsheet';
import { fromBase64 } from '../../utils/base64';

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (req, res) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENT_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY),
    });
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[3];
    const celulas = await sheet.getRows();

    const serializedItems = celulas.map((celula) => ({
      matricula: celula.originalMatricula,
      name: celula.nome,
      dtNascimento: celula.dtNascimento,
    }));

    return res.json(serializedItems);
  } catch (err) {
    res.end(JSON.stringify({
      message: 'Error',
    }));
  }
};
