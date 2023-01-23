import { Controller, Post, Get, Delete } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {}

  @Post()
  createWorkspace() {}

  @Get(':url/members')
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  inviteMembersToWorspace() {}

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {}

  @Get(':url/members/:id')
  getMemberInfoWorkspace() {}
}
