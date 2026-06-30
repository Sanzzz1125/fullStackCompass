import React from 'react';
import CodeBlock from '../components/CodeBlock.jsx';
import ResourceCard from '../components/ResourceCard.jsx';

const COLOR = '#e0234e';
const RESOURCES = [
    { type:'docs',     title:'NestJS Official Docs',       description:'Comprehensive NestJS documentation. CLI, modules, guards, interceptors all covered.', url:'https://docs.nestjs.com/' },
    { type:'tutorial', title:'NestJS Crash Course (YouTube)', description:'Traversy Media NestJS course — fastest way to get a complete picture.', url:'https://www.youtube.com/watch?v=wqhNoDE9BS8' },
    { type:'docs',     title:'TypeORM Docs',               description:'TypeORM is the standard ORM used with NestJS for SQL + MongoDB.', url:'https://typeorm.io/' },
];

export default function NestJS() {
    return (
        <>
            <section className="hero">
                <div className="hero-eyebrow"><span style={{color:COLOR}}>NestJS</span> — Enterprise Backend</div>
                <h1><span className="accent" style={{color:COLOR}}>NestJS</span><br/><em>TypeScript backend framework</em></h1>
                <p className="hero-desc">NestJS is a progressive Node.js framework built with TypeScript. It brings Angular-like architecture to the backend — modules, decorators, dependency injection. Used at enterprise scale.</p>
                <div className="hero-stack">{['Modules','Controllers','Services','Guards','Pipes','TypeORM','Swagger'].map(t=><span key={t} className="stack-chip">{t}</span>)}</div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>01</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Setup</div>
                        <h2>Project Setup & Architecture</h2>
                        <p className="chapter-intro">NestJS has a very opinionated structure. Everything is a Module → Controller → Service. This makes large codebases maintainable.</p>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`npm install -g @nestjs/cli
nest new my-project   # scaffolds full project

# Project structure:
src/
 ├── app.module.ts        # root module
 ├── app.controller.ts    # root controller
 ├── app.service.ts       # root service
 └── main.ts              # bootstrap

# Generate resources
nest generate module  users
nest generate controller users
nest generate service  users
# OR shorthand:
nest g resource users   # generates ALL at once with CRUD`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>02</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Core Concepts</div>
                        <h2>Controllers, Services & Modules</h2>
                    </div>
                </div>
                <div className="topic">
                    <h3>Controller — handles HTTP requests</h3>
                    <CodeBlock lang="javascript" code={`// users/users.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')   // → /users
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()                          // GET /users
    findAll() { return this.usersService.findAll(); }

    @Get(':id')                     // GET /users/:id
    findOne(@Param('id') id: string) { return this.usersService.findOne(id); }

    @Post()                         // POST /users
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)        // Protected route
    @Put(':id')                     // PUT /users/:id
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto);
    }

    @Delete(':id')                  // DELETE /users/:id
    remove(@Param('id') id: string) { return this.usersService.remove(id); }
}`} />
                    <h3>Service — business logic</h3>
                    <CodeBlock lang="javascript" code={`// users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    findAll()  { return this.userRepo.find(); }

    async findOne(id: string) {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) throw new NotFoundException(\`User \${id} not found\`);
        return user;
    }

    create(dto: CreateUserDto) { return this.userRepo.save(this.userRepo.create(dto)); }
    update(id: string, dto: UpdateUserDto) { return this.userRepo.update(id, dto); }
    remove(id: string) { return this.userRepo.delete(id); }
}`} />
                    <h3>Module — ties everything together</h3>
                    <CodeBlock lang="javascript" code={`// users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService }    from './users.service';
import { User }            from './entities/user.entity';

@Module({
    imports:     [TypeOrmModule.forFeature([User])],  // register User entity
    controllers: [UsersController],
    providers:   [UsersService],
    exports:     [UsersService],   // other modules can inject UsersService
})
export class UsersModule {}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>03</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Validation</div>
                        <h2>DTOs, Pipes & Validation</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`npm install class-validator class-transformer`} />
                    <CodeBlock lang="javascript" code={`// users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    role?: string;
}

// main.ts — enable global validation
import { ValidationPipe } from '@nestjs/common';
app.useGlobalPipes(new ValidationPipe({
    whitelist:       true,    // strips unknown properties
    forbidNonWhitelisted: true,
    transform:       true,    // auto-convert types (string → number)
}));`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>04</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Auth</div>
                        <h2>JWT Authentication in NestJS</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="bash" code={`npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt`} />
                    <CodeBlock lang="javascript" code={`// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './jwt.strategy';
import { UsersModule }    from '../users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret:      process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' },
        }),
    ],
    providers:   [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}

// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:    process.env.JWT_SECRET,
        });
    }
    async validate(payload: any) { return { id: payload.sub, email: payload.email }; }
}

// auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header">
                    <div className="chapter-num" style={{borderColor:COLOR,color:COLOR}}>05</div>
                    <div className="chapter-meta">
                        <div className="chapter-track" style={{color:COLOR}}>Express vs NestJS</div>
                        <h2>When to Use NestJS vs Express</h2>
                    </div>
                </div>
                <div className="topic">
                    <CodeBlock lang="javascript" code={`// Express: Freedom, minimal structure
// Best for: APIs, microservices, beginners, custom architecture
// Team size: 1–5 developers

// NestJS: Structure, conventions, enterprise patterns
// Best for: Large team codebases, long-lived products, mono-repos
// Team size: 5+ developers

// NestJS uses Express (or Fastify) under the hood.
// You can still use Express middleware in NestJS:
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));`} />
                </div>
            </section>

            <section className="chapter">
                <div className="chapter-header"><div><h2 style={{fontFamily:"'Fraunces',serif"}}>Resources</h2></div></div>
                <div className="resource-grid">{RESOURCES.map((r,i)=><ResourceCard key={i} {...r}/>)}</div>
            </section>
            <footer className="footer"><p>NestJS · FullStack Compass</p></footer>
        </>
    );
}
