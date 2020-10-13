import { CreateImovelDto, ImovelDto } from './imovel.dto';
import { ImovelService } from './imovel.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @UseGuards(AuthGuard(['default_user','master']))
  @ApiBearerAuth()
  @Get('/:id')
  async get(@Param('id') id: string) {
      return await this.imovelService.get(id);
  }  

  @UseGuards(AuthGuard(['default_user','master']))
  @ApiBearerAuth()
  @Get()
  async all() {
      return await this.imovelService.all();
  }  

  @UseGuards(AuthGuard('master'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() create: CreateImovelDto) {
      return await this.imovelService.create(create);
  }
  
  @UseGuards(AuthGuard('master'))
  @ApiBearerAuth()
  @Put('/:id')
  async update(@Param('id') id: string, @Body() update: ImovelDto) {
      return await this.imovelService.update(id, update);
  }

  @UseGuards(AuthGuard('master'))
  @ApiBearerAuth()
  @Delete('/:id')
  async delete(@Param('id') id: string) {
      return await this.imovelService.delete(id);
  }

}
