import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
export declare class AgentsController {
    private readonly agentsService;
    constructor(agentsService: AgentsService);
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
    findOne(id: string): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateAgentDto): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__AgentClient<{
        format: import("@prisma/client").$Enums.AgentInvoiceFormat | null;
        markupPercent: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
