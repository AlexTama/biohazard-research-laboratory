import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [CoreModule, ApplicationModule, InfrastructureModule, PresentationModule],
})
export class AppModule {}
