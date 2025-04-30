import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user/user";

@Injectable()
export class Authservice{
    constructor(private jwtService: JwtService){}

    async generateToken(user:User){
        const payload = {sub: user.id,email: user.email};
        return{
            access_token: this.jwtService.sign(payload),
        };
    }

}