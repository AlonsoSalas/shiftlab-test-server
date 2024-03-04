import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @ApiBody({ type: CreateResultDto })
  @ApiOkResponse({ description: 'Result created successfully' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of all results' })
  findAll() {
    return this.resultsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Result found successfully' })
  findOne(@Param('id') id: string) {
    return this.resultsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Result deleted successfully' })
  remove(@Param('id') id: string) {
    return this.resultsService.remove(+id);
  }
}
