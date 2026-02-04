
import { Injectable } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AgentsService {
    constructor(private prisma: PrismaService) { }

    create(dto: CreateAgentDto) {
        return this.prisma.agent.create({ data: dto });
    }

    findAll() {
        return this.prisma.agent.findMany();
    }

    findOne(id: number) {
        return this.prisma.agent.findUnique({ where: { id } });
    }

    update(id: number, dto: UpdateAgentDto) {
        return this.prisma.agent.update({ where: { id }, data: dto });
    }

    remove(id: number) {
        return this.prisma.agent.delete({ where: { id } });
    }
}
