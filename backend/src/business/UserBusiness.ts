import { UserInputDTO, LoginInputDTO, UserRole } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { UserRepository } from "./UserRepository";
import { InvalidInputError } from "../error/InvalidInputError";

export class UserBusiness {

    constructor(
        private userDatabase: UserRepository,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator
    ){
    }
    async createUser(user: UserInputDTO) {
        if(!user.email || !user.name || !user.password || !user.role){
            throw new InvalidInputError("Todos os campos devem ser preenchidos")
        }

        if(user.role !== UserRole.ADMIN && user.role !== UserRole.NORMAL){
            throw new InvalidInputError("role deve ser 'ADMIN' ou 'NORMAL'")
        }

        if(!user.email.includes("@")){
            throw new InvalidInputError("Formato de e-mail inválido")
        }

        if(user.password.length < 6){
            throw new InvalidInputError("A senha deve ser igual ou superior a 6 digitos")
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if(userFromDB){
            throw new Error(`Já existe usuário no o email ${user.email}`)
        }

        const id = this.idGenerator.generate();

        const hashPassword = await this.hashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const accessToken = this.authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        if(!user.email || !user.password){
            throw new InvalidInputError("Todos os campos devem ser preenchidos")
        }

        if(!user.email.includes("@")){
            throw new InvalidInputError("Formato de e-mail inválido")
        }

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);

        if(!userFromDB){
            throw new Error(`Usuário não encontrado com o email ${user.email}`)
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }
}