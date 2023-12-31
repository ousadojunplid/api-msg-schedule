import { SendMessageCustomerRepository_I } from "./Repository";
import { SendMessageCustomerDTO_I } from "./DTO";
import { RunUseCase_I } from "../../../../types/global";
import { storeSessions } from "../../../../sessionsStore";

export class SendMessageCustomerUseCase {
  constructor(private sendMessageCustomer: SendMessageCustomerRepository_I) {}

  async run({
    userId,
    ...dto
  }: SendMessageCustomerDTO_I): Promise<RunUseCase_I> {
    const custInfo = await this.sendMessageCustomer.findCust(Number(dto.id));

    if (!custInfo) {
      throw {
        message: "Cliente não encontrado.",
        statusCode: 400,
        details: {
          body: [{ message: "Cliente não encontrado." }],
        },
        error: "Cliente não encontrado.",
        name: "not found",
      };
    }

    if (custInfo.userId !== userId) {
      throw {
        message: "Só é possível enviar mensagem para o seu cliente.",
        statusCode: 400,
        details: {
          body: [
            { message: "Só é possível enviar mensagem para o seu cliente." },
          ],
        },
        error: "Só é possível enviar mensagem para o seu cliente.",
        name: "unauthorized",
      };
    }

    if (storeSessions[userId] !== undefined) {
      try {
        await storeSessions[userId]?.sendText(
          `${custInfo.whatsapp}@c.us`,
          `${dto.text
            .replace(/\\n/g, "\n")
            .replace(/\{NOME\}/, custInfo.full_name)
            .replace(/\{PRIMEIRO_NOME\}/, custInfo.full_name.split(" ")[0])
            .replace(/\{ZAP\}/, custInfo.whatsapp)
            .replace(/\{LOGIN\}/, custInfo?.login ?? "{LOGIN}")
            .replace(/\{SENHA\}/, custInfo?.password ?? "{SENHA}")
            .replace(/\{PLANO\}/, custInfo?.plan?.name ?? "{PLANO}")
            .replace(
              /\{PRECO_PLANO\}/,
              custInfo?.plan?.price
                ? String(custInfo?.plan?.price)
                : "{VALOR_PLANO}"
            )
            .replace(/\{PRODUTO\}/, custInfo?.product?.name ?? "{PRODUTO}")
            .replace(/\{OBS\}/, custInfo?.comments ?? "{OBS}")
            .replace(
              /\{DATA_VENCI\}/,
              custInfo?.dueDate
                ? new Date(custInfo.dueDate).toLocaleDateString("pt-br")
                : "{DATA_VENCI}"
            )}`
        );
      } catch (error) {
        throw {
          message: "Error, não foi possivel enviar a mensagem!",
          statusCode: 400,
          details: {
            body: [{ message: "Error, não foi possivel enviar a mensagem!" }],
          },
          error: "Error, não foi possivel enviar a mensagem!",
          name: "error",
        };
      }
    } else {
      throw {
        message: "Conecte seu whatsapp para enviar menssagem",
        statusCode: 400,
        details: {
          body: [{ message: "Conecte seu whatsapp para enviar menssagem" }],
        },
        error: "Conecte seu whatsapp para enviar menssagem",
        name: "not found",
      };
    }

    return { message: "OK" };
  }
}
