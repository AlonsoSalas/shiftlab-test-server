import { resolve } from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { ResultsModule } from './results/results.module';
import { StudentsModule } from './students/students.module';
import { DatabaseModule } from './database/database.module';
import { MorganMiddleware } from './middlewares/morgan.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, '../.env'),
      isGlobal: true,
    }),
    StudentsModule,
    CoursesModule,
    ResultsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
