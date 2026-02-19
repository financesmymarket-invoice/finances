import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class AgentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAgentDto): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateAgentDto): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
