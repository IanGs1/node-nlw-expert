import { z } from "zod";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "../../lib/prisma";

export async function getPoll(app: FastifyInstance) {
  app.get("/polls/:pollId", async (request: FastifyRequest, reply: FastifyReply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        },
      }
    })

    return reply.status(200).send(poll);
  })
}