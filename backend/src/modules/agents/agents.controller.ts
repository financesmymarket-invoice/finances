import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new agent' })
  create(@Body() dto: CreateAgentDto) {
    return this.agentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all agents' })
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agent by ID' })
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update agent by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateAgentDto) {
    return this.agentsService.update(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete agent by ID' })
  remove(@Param('id') id: string) {
    return this.agentsService.remove(Number(id));
  }
}
