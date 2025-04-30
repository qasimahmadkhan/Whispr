import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { Authservice } from "./auth.service";
import { JwtStrategy } from "./jw.strategy";

@Module({
    imports:[
        UsersModule,
        JwtModule.register({
            secret:'jwt_secret',
            signOptions: {expiresIn: '1d'}
        }),
    ],
    providers:[Authservice, JwtStrategy],
    exports:[Authservice]
})
export class AuthModule{}